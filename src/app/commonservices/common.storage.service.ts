import { Injectable, Inject } from "@angular/core";
import {WebStorageService } from 'angular-webstorage-service';


@Injectable()
export class LocalStorageService extends WebStorageService{

    constructor(){
        super(localStorage);
    }

    setItem(key,value)
    {
     this.set(key,value);
    }

    getItem(key)
    {
    return this.get(key);
    }

    removeAllItem()
    {
       localStorage.clear();
    }

    removeOneFromItem(key)
    {
        this.remove(key);
    }

}