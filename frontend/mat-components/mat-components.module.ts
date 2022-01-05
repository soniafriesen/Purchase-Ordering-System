import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// added imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select/';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

const MaterialComponents = [
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialComponents],
  exports: [...MaterialComponents],
})
export class MatComponentsModule {}
