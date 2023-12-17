import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptionDescryptionService } from 'src/app/crm/services/encryption-descryption.service';
import { LoginService } from 'src/app/crm/services/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFormEncrypt!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  loginbutton = false;

  constructor(
              private _formBuilder: FormBuilder,
              private loginService: LoginService,
              private encryptObj: EncryptionDescryptionService,
              private router: Router,
              private toastr: ToastrService
      ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('empId');

    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern]],
      password: ['', [Validators.required, Validators.pattern]]
    });
  }

  onSubmit(element:any, text:any) {

    element.textContent = text;
    element.disabled = true;
    this.loginbutton = true;

    this.loginFormEncrypt = this._formBuilder.group({
      username: this.encryptObj.encryptData(this.loginForm.get('username')!.value),
      password: this.encryptObj.encryptData(this.loginForm.get('password')!.value)
    });
    console.log(this.loginFormEncrypt.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.loginService.authenticate(this.loginFormEncrypt.value)
      .subscribe(
        data => {
          this.loginService.getMenuData()
          .subscribe( dataAccessMenu => {
            this.toastr.success( 'Yeay loggedin!');
            this.router.navigate(['/']);
          });
        },
        error => {
          element.textContent = 'Login';
          element.disabled = false;
          this.loginbutton = false;
          this.errorMessage = error.error.message;
          this.toastr.error(error.error.message, 'Error!');
        });
  }
  
}
