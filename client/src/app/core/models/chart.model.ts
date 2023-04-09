import { MAP_POINTS_COLORS } from '../constants/charts.constant';
import { CarsList } from './vehicle.model';
import { CAR_TYPES } from '../enums/vehicle.enum';

export default class MapPointUsage {
  id = 0;
  name = '';
  typeName = '';
  longitude = 0;
  latitude = 0;
  // radius for mapPoint
  value = 4;
  x: number | null = null;
  y: number | null = null;
  mergedPoints: MapPointUsage[] = [];
  hidden = false;
  color = '';

  constructor(partial: Partial<CarsList> = {}) {
    switch (partial.typeName) {
      case CAR_TYPES.SUV:
        this.color = MAP_POINTS_COLORS['violet'];
        break;
      case CAR_TYPES.Truck:
        this.color = MAP_POINTS_COLORS['yellow'];
        break;
      case CAR_TYPES.Hybrid:
        this.color = MAP_POINTS_COLORS['green'];
        break;
      default:
        this.color = MAP_POINTS_COLORS['blue'];
        break;
    }

    Object.assign(this, partial);
  }

  static deserialize(partial: Partial<CarsList>) {
    return new MapPointUsage(partial);
  }
}
