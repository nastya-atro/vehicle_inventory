import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VehiclesService } from './vehicles.service';
import * as qs from 'qs';
import debounce from 'lodash.debounce';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { Order } from '../../core/enums/filters.enum';
import { FilterOptions, QueryParams } from '../../core/interfaces/query-params.interfaces';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import {
  CAR_TYPES_FILTER,
  CARS_COLUMNS,
  SORT_BY_CARS_LIST,
  VEHICLE_DEFAULT_FILTERS,
} from '../../core/constants/vehicle.constants';
import { CarsList } from '../../core/models/vehicle.model';

@UntilDestroy()
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class VehiclesComponent {
  rootPath = 'vehicles';
  queryParams!: QueryParams;
  cars!: null | CarsList[];
  displayedColumns: string[] = [...CARS_COLUMNS];

  filtersOptions = {
    types: [...CAR_TYPES_FILTER],
    sortBy: { ...SORT_BY_CARS_LIST },
  };
  defaultFilters = { ...VEHICLE_DEFAULT_FILTERS };
  selectedTypes = [] as FilterOptions[];

  state = {
    order: {
      sortBy: 'id',
      sortOrder: Order.ASC,
    },
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
    filters: {
      types: [],
      q: '',
    } as any,
  };

  loading = false;

  constructor(
    private notifyService: NotifyService,
    private carsService: VehiclesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.handleSearch = debounce(this.handleSearch, 700);

    const { pagination, order, filters } = this.state;
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = qs.parse(qs.stringify(params)) as QueryParams;

      if (!Object.keys(params).length) {
        const { page, limit } = pagination;
        const { sortBy, sortOrder } = order;
        this.router.navigateByUrl(`${this.rootPath}?${qs.stringify({ page, limit, sortBy, sortOrder, ...filters })}`);
      } else {
        const { page, limit, q, privacy, types } = this.queryParams;
        pagination.page = +page;
        pagination.limit = +limit;
        filters.q = q || '';
        filters.types = types || [];

        this.selectedTypes = this.filtersOptions.types.filter(el => types?.join(', ').includes(el.id)) || [];

        this.loadCars(this.queryParams);
      }
    });
  }

  loadCars(params: QueryParams) {
    this.loading = true;

    this.carsService
      .getCars(params)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: data => {
          this.cars = data.results;
          this.state.pagination.page = data.page;
          this.state.pagination.total = data.total;
          this.state.pagination.totalPages = data.totalPages;
        },
        error: () => {},
      });
  }

  removeCar(id: number) {
    this.carsService
      .removeCar(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.notifyService.notifier.success('Vehicle deleted successfully');
          this.loadCars(this.queryParams);
        },
        error: () => {},
      });
  }

  navigate(queryParams: QueryParams) {
    return this.router.navigateByUrl(
      `${this.rootPath}?${qs.stringify({
        ...this.queryParams,
        ...queryParams,
      })}`
    );
  }

  handleChangePage({ page, pageSize }: { page: number; pageSize: number }) {
    const {
      pagination,
      order: { sortOrder, sortBy },
      filters,
    } = this.state;
    pagination.page = page;
    pagination.limit = pageSize;
    this.navigate({ page, limit: pageSize, sortOrder, sortBy, ...filters });
  }

  handleChangeSortByFilter(item: any) {
    const { value } = item;
    const [sortBy, sortOrder] = value.split('_');
    const {
      pagination: { limit },
      order,
      filters,
    } = this.state;
    order.sortOrder = sortOrder;
    order.sortBy = sortBy;

    this.navigate({ sortBy, sortOrder, page: '1', limit, ...filters });
  }

  handleMultiselect({ selectedOptions, entity }: any) {
    const {
      pagination: { limit },
      order: { sortOrder, sortBy },
      filters,
    } = this.state;

    filters[entity] = selectedOptions.map((el: any) => el.id);

    this.navigate({
      sortOrder,
      sortBy,
      page: 1,
      limit,
      ...filters,
    });
  }

  handleSearch(event: any) {
    const {
      pagination: { limit },
      filters,
      order: { sortOrder, sortBy },
    } = this.state;
    filters.q = event.target.value;

    this.navigate({
      sortOrder,
      sortBy,
      page: 1,
      limit,
      ...filters,
    });
  }
}
