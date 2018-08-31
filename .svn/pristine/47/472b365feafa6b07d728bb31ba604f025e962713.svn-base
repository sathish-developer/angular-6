
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, filter, catchError, mergeMap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { token } from './dummytoken';





@Injectable()
export class AuthGuardService implements HttpInterceptor{



    //  constructor(private loginAuthenticationService:LoginAuthenticationService,
    //     private router:Router,
    //     private errorService:ErrorService
    // )
    //  {
    //      //console.log("auth guard service injected");
    //  }

    constructor(){

    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //      //console.log("interceptor works"+JSON.stringify(request.urlWithParams));
    //      //if(request.headers.has('x-access-token'))
    //      //{
    //         // request=request.clone({setHeaders:{
    //         //     'x-access-token':localStorage.getItem("TOKEN")
    //         // }});

    //         if(!(request.urlWithParams==URLCONSTANT.USER_CREDENTIAL))
    //         {
    //             request=request.clone({setHeaders:{
    //                      'x-access-token':localStorage.getItem("TOKEN")
    //                  }});
    //         }
            
    //     // }       
    //     return next.handle(request).do((event=>{
            
    //     }),(error)=>{

    //        if(error instanceof HttpErrorResponse)
    //        {
    //            if(error.status==401)
    //            {
    //                this.errorService.setError(error.error.message);
    //                this.router.navigateByUrl("/expired");
    //               // console.log("http error response logged"+JSON.stringify(error.error.message));
    //                //localStorage.clear();
    //            }
            
    //        }

    //     });

    // }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("interceptor working");

        request=request.clone({setHeaders:{
        'authorization':'Bearer '+token
        }});
       
        return next.handle(request);
    }

}