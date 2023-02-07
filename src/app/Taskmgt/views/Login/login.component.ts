import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { EncryptionDescryptionService } from '../../Services/encryption-descryption.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dummyObj;
  loading = false;
  submitted = false;
  errorMessage ='';

  constructor(
                private _formBuilder: FormBuilder,
                private loginService: LoginService,
                private encryptObj: EncryptionDescryptionService,
                private router: Router,
      ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern]],
      password: ['', [Validators.required, Validators.pattern]]
  });
  }
  get username()
  {
    return this.loginForm.get('username');
  }
  get password()
  {
    return this.loginForm.get('password');
  }
  onSubmit()
  {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.dummyObj = {
      username: this.encryptObj.encryptData(this.username.value),
      password: this.encryptObj.encryptData(this.password.value)
    };

    // console.log(this.encryptObj.encryptData(this.username.value));
    // console.log(this.encryptObj.encryptData(this.password.value));

    console.log(this.dummyObj);

    this.loginService.authenticate(this.dummyObj)
        .subscribe( data => {
        // console.log(data);
        this.router.navigate(['/']);
         },
        error => {
            this.errorMessage = error.error.message;
        });
  }

}
