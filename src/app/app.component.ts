import { LocalStorageService } from './commonservices/common.storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(storage:LocalStorageService){
   console.log("app component loaded");
    //storage.removeAllItem();
  }

}
