import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidateErrorPipe } from '../core/pipes/validation.pipe';
import { NotifyModule } from './modules/notifications/notify.module';
import { LoaderComponent } from './directives/loader/loader.component';
import { LoaderDirective } from './directives/loader/loader.directive';
import { SelectComponent } from './components/select/select.component';
import { MultiSelectFilterPipe } from '../core/pipes/multi-select-filter.pipe';
import { MultiselectComponent } from './components/multiselect/multiselect.component';
import { ChartTooltipComponent } from "./components/tooltip/chart-tooltip.component";
import { ChartTooltipDirective } from "./components/tooltip/chart-tooltip.directive";

const COMPONENTS = [
  PageNotFoundComponent,
  ValidateErrorPipe,
  MultiSelectFilterPipe,
  LoaderComponent,
  SelectComponent,
  MultiselectComponent,
  ChartTooltipComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NotifyModule],
  declarations: [...COMPONENTS, LoaderDirective, ChartTooltipDirective],
  exports: [...COMPONENTS, LoaderDirective, ChartTooltipDirective],
})
export class SharedModule {}
