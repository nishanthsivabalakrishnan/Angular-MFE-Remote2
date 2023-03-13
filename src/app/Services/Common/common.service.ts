import { Injectable } from '@angular/core';
import { enc, AES, mode, pad } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  private EncryptKey = "1203199320052021";
  private EncryptIV = "1203199320052021"
  private key = enc.Utf8.parse(this.EncryptKey);
  private iv = enc.Utf8.parse(this.EncryptIV);

  encryptData(text:any,isGet:boolean): any {
   if (isGet) {
      const dataToEncryptGet = this.EncryptFieldData(JSON.stringify(text));
      return dataToEncryptGet;
    }
    else {
      const dataToEncrypt = {
        ObjInputString: this.EncryptFieldData(JSON.stringify(text))
      };
      return dataToEncrypt;
    }
  }

  private EncryptFieldData(data:string){
      var encrypted = AES.encrypt(enc.Utf8.parse(data), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return encrypted.toString();
  }

  decryptData(decString:any) {
        var decrypted = AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: mode.CBC,
            padding: pad.Pkcs7
        });
        return decrypted.toString(enc.Utf8);
    }
}
