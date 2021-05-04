import { Injectable, Directive } from '@angular/core';
@Injectable()
export class GlobalService {
    private user:any = {};
  
    constructor() { }

    setUser(val:any) {
        this.user = val;
    }

    getUser() {
        return this.user;
    }
}