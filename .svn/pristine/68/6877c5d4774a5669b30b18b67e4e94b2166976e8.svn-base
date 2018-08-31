import { PipeTransform, Pipe } from '@angular/core';

/**
 * 
 * @author sathish kumar
 * 
 * **/

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}