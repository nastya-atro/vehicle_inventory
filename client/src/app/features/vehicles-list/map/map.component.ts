import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartMeta, Element, TooltipModel } from 'chart.js';
import * as ChartGeo from 'chartjs-chart-geo';
// @ts-ignore
import world from '../../../../assets/data/world-atlas.json';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ChartTooltipDirective } from '../../../shared/components/tooltip/chart-tooltip.directive';
import { TooltipContent } from './map.interface';
import Utils from '../../../core/utils/utils';
import { loadTooltip } from '../../../core/utils/show-tooltip';
import MapPointUsage from '../../../core/models/chart.model';
import 'chart.js/auto';
import { CarsList } from '../../../core/models/vehicle.model';

let countries = (ChartGeo.topojson.feature(world as any, world.objects.countries as any) as any).features;

@UntilDestroy()
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('map') chart!: ElementRef;
  @ViewChild(ChartTooltipDirective, { static: true }) tooltipContainer!: ChartTooltipDirective;
  @Input() cars: CarsList[] = [];
  chartMap!: any;
  initialSpotsLocations = [] as MapPointUsage[];
  mainPointImage = new Image();
  mergedPointsRadius: number = 20;

  spotPoints = [] as MapPointUsage[];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    Chart.register(ChartGeo.BubbleMapController, ChartGeo.GeoFeature, ChartGeo.SizeScale, ChartGeo.ProjectionScale);
  }

  prepareLocations() {
    this.initialSpotsLocations = this.cars.map(spot => MapPointUsage.deserialize(spot));
  }

  ngOnInit(): void {
    this.prepareLocations();
    setTimeout(() => this.setSpotPoints(), 500);
  }

  setSpotPoints() {
    this.prepareLocations();
    this.spotPoints = [...this.initialSpotsLocations];

    this.chartMap && this.chartMap.destroy();
    this.generateMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cars'] && this.chart) {
      this.setSpotPoints();
    }
  }

  generateMap() {
    countries = countries.filter((country: any) => country.properties.name !== 'Antarctica');
    const radiuses = this.spotPoints.map((point: MapPointUsage) => point.value);

    this.chartMap = new Chart(<HTMLCanvasElement>this.chart.nativeElement.getContext('2d'), {
      type: 'bubbleMap',
      data: {
        datasets: [
          {
            data: this.spotPoints.map((point: MapPointUsage) => ({
              value: point.value,
              longitude: point.longitude,
              latitude: point.latitude,
              name: point.name,
            })),
            radius: radiuses,
            hoverRadius: radiuses,
            outline: countries,
            showOutline: true,
            showLine: true,
            backgroundColor: 'rgba(0,0,0,0)',
            hoverBackgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            outlineBackgroundColor: '#DDDFE5',
            outlineBorderColor: '#fff',
          },
        ],
      },
      options: {
        showOutline: false,
        showGraticule: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            external: (args: { chart: Chart; tooltip: TooltipModel<any> }) => {
              const itemData = args.tooltip?.dataPoints?.[0];

              if (itemData?.dataset ?? itemData?.dataIndex) {
                const itemIndex = itemData.dataIndex;
                if (this.spotPoints[itemIndex].hidden) args.tooltip.opacity = 0;

                const content: TooltipContent[] = [this.getTooltipContent(this.spotPoints[itemIndex])];
                const padding = itemData.dataset.radius[itemIndex] + 5 || 0;

                if (this.spotPoints[itemIndex].mergedPoints.length) {
                  this.spotPoints[itemIndex].mergedPoints.forEach((point: MapPointUsage) => {
                    content.push(this.getTooltipContent(point));
                  });
                }

                if (content[0]?.title) loadTooltip(this.tooltipContainer, args, content, padding);
              }
            },
          },
        },
        scales: {
          xy: {
            display: true,
            projection: 'naturalEarth1',
          },
          r: {
            display: false,
            mode: 'area',
          },
        },
      },
      plugins: [
        {
          id: 'connect-points',
          afterDatasetDraw: this.afterDrawCallback(),
        },
      ],
    });
  }

  afterDrawCallback(): (chart: Chart, args: { index: number; meta: ChartMeta }) => void {
    return (chart: Chart, args: { index: number; meta: ChartMeta }) => {
      if (args?.meta?.data?.length) {
        const startX = args.meta.data[0].x;
        const startY = args.meta.data[0].y;

        this.setPointsProperties(args.meta.data);
        //  this.addConnections(chart.ctx, this.spotPoints, startX, startY);
        this.drawMainPoint(chart.ctx, startX, startY);
      }
    };
  }

  getTooltipContent(point: MapPointUsage): TooltipContent {
    const color = point.color || '';
    const title = point.name;
    return { title, description: point.typeName, color };
  }

  setPointsProperties(canvasPoints: Element[]): void {
    const mergedPoints = new Set<number>();

    this.spotPoints.forEach((point: MapPointUsage, i: number) => {
      if (!i || mergedPoints.has(i)) return;

      ({ x: point.x, y: point.y } = canvasPoints[i]);
      point.mergedPoints = [];

      canvasPoints.forEach((canvasPoint: Element, k: number) => {
        if (!k || i === k || mergedPoints.has(k)) return;

        if (
          point.x !== null &&
          point.y !== null &&
          this.isClosePoints(point.x, point.y, canvasPoint.x, canvasPoint.y)
        ) {
          point.mergedPoints.push(this.spotPoints[k]);
          this.spotPoints[k].hidden = true;
          mergedPoints.add(k);
        } else {
          this.spotPoints[k].hidden = false;
        }
      });
    });
    this.changeDetectorRef.detectChanges();
  }

  isClosePoints(x: number, y: number, x0: number, y0: number): boolean {
    return (x - x0) ** 2 + (y - y0) ** 2 <= this.mergedPointsRadius ** 2;
  }

  addConnections(ctx: CanvasRenderingContext2D, points: MapPointUsage[], startX: number, startY: number): void {
    points.forEach((point: MapPointUsage, i: number) => {
      if (i === 0) return;

      if (!point.hidden) {
        this.drawConnectionLine(ctx, point.x, point.y, startX, startY, point.color);

        if (point.mergedPoints.length) {
          point.mergedPoints.forEach((mergedPoint: MapPointUsage, i: number) => {
            this.drawConnectionLine(ctx, point.x, point.y, startX, startY, mergedPoint.color, i + 1);
          });
        }
      } else point.x = point.y = null;
    });
  }

  drawConnectionLine(
    ctx: CanvasRenderingContext2D,
    pointX: number | null,
    pointY: number | null,
    startX: number,
    startY: number,
    color: string,
    curvature: number = 0
  ): void {
    if (pointX !== null && pointY !== null) {
      const length = (((pointX + startX) ^ 2) + ((pointY + startY) ^ 2)) ^ 0.5;
      const curveRadius = length * (0.06 + curvature / 70);
      const curvePointY = (pointY + startY) / 2 - curveRadius;
      const curvePointX = (pointX + startX) / 2 - ((pointY + startY) * curveRadius) / length;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(curvePointX, curvePointY, pointX, pointY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = Utils.hexToRGBA(color, 0.5);
      ctx.stroke();
    }
  }

  drawMainPoint(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.spotPoints?.[0]?.value) {
      const radius = this.spotPoints[0].value;
      const color = this.spotPoints[0].color;

      ctx.beginPath();
      ctx.arc(x, y, radius * 1.2, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 0;
      ctx.stroke();

      ctx.drawImage(this.mainPointImage, x - radius, y - radius, 2 * radius, 2 * radius);
    }
  }

  transformColor(color: string, opacity: number): string {
    return Utils.hexToRGBA(color, opacity);
  }
}
