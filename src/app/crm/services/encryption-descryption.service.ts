import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as sha256 from 'sha256';
import {Buffer} from 'buffer';
// import * as Rijndael from 'rijndael-js'


@Injectable({
  providedIn: 'root'
})
export class EncryptionDescryptionService {

  // private strKey="HALTech^%$#@!Trn";
  // private byteArray = sha256(this.strKey, { asBytes: true });
  // private hexString = new Buffer(this.byteArray).toString('hex').slice(0,32);

  // private key = CryptoJS.enc.Utf8.parse(this.hexString);
  // private iv = CryptoJS.enc.Utf8.parse(this.strKey);

  private strKey ='';
  private byteArray:any;
  private hexString:any;

  private key:any;
  private iv:any;


  constructor() {}

  ngOnInit(): void {}

private getKey()
{
  if (localStorage.getItem('token') == null)
  {
    this.strKey = 'HALTech^%$#@!Trn';
  }
  else  {
    let temp = (localStorage.getItem('token') ?? '') + (localStorage.getItem('username') ?? '');
    this.strKey = temp.slice(-32);
  }

  this.byteArray = sha256(this.strKey, { asBytes: true });
  this.hexString = new Buffer(this.byteArray).toString('hex').slice(0, 32);

  this.key = CryptoJS.enc.Utf8.parse(this.hexString);
  this.iv = CryptoJS.enc.Utf8.parse(this.strKey);

}

  // method is used to encrypt and decrypt the text
  public encryptData(data:any) {
    try {
      this.getKey();
      // tslint:disable-next-line:prefer-const
      // let encyData = data.replace('/', '%');
      let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), this.key,
      {
        keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    } catch (e) {
      console.log(e);
      return '';
    }
  }
  public decryptData(data:any) {
    try {
      // tslint:disable-next-line:prefer-const
     // let decyData = data.replace('%', '/');
      this.getKey();
      const decrypted = CryptoJS.AES.decrypt(data, this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log(e);
      return '';
    }
  }
}
