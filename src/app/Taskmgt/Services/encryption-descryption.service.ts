import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import sha256 from 'sha256';
import {Buffer} from 'buffer';
// import * as Rijndael from 'rijndael-js'


@Injectable({
  providedIn: 'root'
})
export class EncryptionDescryptionService {



  private strKey = '';
  private byteArray;
  private hexString;

  private key;
  private iv;


  constructor() {}

  // ngOnInit(): void {}

private getKey()
{
  if (localStorage.getItem('token') == null)
  {
    this.strKey = 'FINTech^%$#@!Trn';
  }
  else
  {
    const temp = localStorage.getItem('token') + localStorage.getItem('username');
    this.strKey = temp.slice(temp.length - 32, temp.length);
  }

  this.byteArray = sha256(this.strKey, { asBytes: true });
  this.hexString = new Buffer(this.byteArray).toString('hex').slice(0, 32);

  this.key = CryptoJS.enc.Utf8.parse(this.hexString);
  this.iv = CryptoJS.enc.Utf8.parse(this.strKey);

  // console.log(this.strKey);
}

  // method is used to encrypt and decrypt the text
  public encryptData(data) {
    try {
      this.getKey();
      const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), this.key,
      {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    } catch (e) {
      console.log(e);
    }
    console.log(this.strKey);
  }
  public decryptData(data) {
    try {
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
    }
  }
}
