import { PipeTransform, Pipe } from '@angular/core';

/**
 * 
 * @author sathish kumar
 * 
 * **/

@Pipe({name: 'filterUnique'})
export class FilterPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let uniqueArray = value.filter(function (el, index, array) { 
        return array.indexOf (el) == index;
      });
      return uniqueArray;
    }
}