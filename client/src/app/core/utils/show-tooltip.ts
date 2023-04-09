import { ChangeDetectorRef } from '@angular/core';
import { Chart, TooltipModel } from 'chart.js';
import { ChartTooltipDirective } from '../../shared/components/tooltip/chart-tooltip.directive';
import { ChartTooltipComponent } from '../../shared/components/tooltip/chart-tooltip.component';

export interface TooltipContent {
  title: string | number;
  description?: string;
  color: string;
}

export const loadTooltip = (
  container: ChartTooltipDirective,
  args: { chart: Chart; tooltip: TooltipModel<any> },
  content: TooltipContent[],
  padding: number = 0
) => {
  const { tooltip: tooltipModel } = args;
  const viewContainerRef = container.viewContainerRef;
  viewContainerRef.clear();
  viewContainerRef.injector.get(ChangeDetectorRef).detectChanges();
  if (tooltipModel.opacity === 0) return;

  const left = tooltipModel.caretX;
  const top = tooltipModel.caretY - padding;

  const componentRef = viewContainerRef.createComponent(ChartTooltipComponent);
  componentRef.instance.data = { content, top, left };
  componentRef.injector.get(ChangeDetectorRef).detectChanges();
};
