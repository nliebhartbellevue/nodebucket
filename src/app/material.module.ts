/**
 * Title: material.module.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { NgModule } from '@angular/core';

// Material
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
