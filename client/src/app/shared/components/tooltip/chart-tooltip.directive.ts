import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTooltipContainer]',
})
export class ChartTooltipDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
