import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TableComponent],
})
export class TableModule {}
