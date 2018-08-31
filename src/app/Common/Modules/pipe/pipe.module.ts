import { FilterPipe } from './../../../commonservices/list.unique.filter.service';
import { KeysPipe } from '../../../commonservices/keys.filter.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 
 * @author sathish kumar
 * 
 * **/
@NgModule({
    declarations:[KeysPipe,FilterPipe],
    imports:[CommonModule],
    exports:[KeysPipe,FilterPipe]
})
export class pipeModule { }