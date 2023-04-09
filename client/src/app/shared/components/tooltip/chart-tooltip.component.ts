import { Component, Input, OnInit } from '@angular/core';
import { TooltipContent } from '../../../features/vehicles-list/map/map.interface';

export interface TooltipData {
  content: TooltipContent[];
  left: number;
  top: number;
}

@Component({
  selector: 'app-tooltip',
  templateUrl: './chart-tooltip.component.html',
  styleUrls: ['./chart-tooltip.component.scss'],
})
export class ChartTooltipComponent implements OnInit {
  @Input() data!: TooltipData;
  constructor() {}

  ngOnInit(): void {}
}
