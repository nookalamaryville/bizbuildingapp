import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptDecrypt {
    sEncryptionKey:string = "01234567890123456789";
    key:any = CryptoJS.enc.Hex.parse('36ebe205bcdfc499a25e6923f4450fa8');
    iv:any  = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');
    constructor() {        
    }
    DESEncrypt(data:string):string {
      return CryptoJS.AES.encrypt(
        data,
        this.key,
        {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      ).toString();
      // return CryptoJS.AES.encrypt(data, this.sEncryptionKey).toString();
    }
    DESDecrypt(data:string):string {
      let decrypted = CryptoJS.AES.decrypt(
        data,
        this.key,
        {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      return decrypted.toString(CryptoJS.enc.Utf8);
      //let decrypted = CryptoJS.AES.descrypt(data, this.sEncryptionKey);
      //return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
}
