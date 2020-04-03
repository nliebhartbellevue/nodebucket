import { NgModule } from '@angular/core';
// Kendo UI Modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartModule } from '@progress/kendo-angular-charts';

// Third Party Modules
import { DndModule } from 'ng2-dnd';
import { ToastModule } from 'ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { MomentModule } from 'angular2-moment';

export class CustomOption extends ToastOptions {
  positionClass: 'toast-bottom-right';
  animate: 'flyRight';
  newestOnTop = false;
  showCloseButton = true;
}

@NgModule({
  imports: [
    ButtonsModule,
    DialogModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    DndModule.forRoot(),
    ChartModule,
    ToastModule.forRoot(),
    MomentModule
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomOption }
  ]
})
export class KendoModule { }
