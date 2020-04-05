import { NgModule } from '@angular/core';


// Third Party Modules
import { DndModule } from 'ng2-dnd';
import { MomentModule } from 'angular2-moment';



@NgModule({
  imports: [
    DndModule.forRoot(),
    MomentModule
  ]
})
export class SharedModule { }
