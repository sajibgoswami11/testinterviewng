import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { EncryptionDescryptionService } from '../../Services/encryption-descryption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private encryptObj:EncryptionDescryptionService
    ) {}

  ngOnInit(): void {
  }

  onClick()
  {
    console.log(this.encryptObj.encryptData("Noyon892"));
    // this.loginService.authenticate(this.dummyObj)
    this.loginService.Get()
        .subscribe(                                                        
                  data => {
                    // localStorage.setItem('token',data.token);
                    console.log(data);                                 
                    },
                  error => {
                      console.log(error.error.message);
                  });
  }

}
