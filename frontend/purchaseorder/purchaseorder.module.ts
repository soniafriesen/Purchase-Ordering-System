import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { PurchaseorderGeneratorComponent } from './purchaseorder-generator/purchaseorder-generator.component';
import { PurchaseorderViewerComponent } from './purchaseorder-viewer/purchaseorder-viewer.component';

@NgModule({
  declarations: [
    PurchaseorderGeneratorComponent,
    PurchaseorderViewerComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MatComponentsModule],
})
export class PurchaseorderModule {}
