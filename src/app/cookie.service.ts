import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  getCookie(w: string) {
    let cName = '';
    let pCOOKIES = new Array();
    pCOOKIES = document.cookie.split('; ');
    for (let bb = 0; bb < pCOOKIES.length; bb++) {
      let NmeVal  = new Array();
      NmeVal  = pCOOKIES[bb].split('=');
      if (NmeVal[0] === w) {
        cName = unescape(NmeVal[1]);
      }
    }
    
    return cName;
  }
}
