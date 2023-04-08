import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() pageSize!: number;

  paginationArray: any = [];

  @Output() handleChanged = new EventEmitter<{ page: number; pageSize: number }>();

  handleChangePage(page: number | string, isLeft: boolean) {
    if (page === '...') {
      if (isLeft) {
        this.page = Math.floor((this.page - 1) / 2);
      } else {
        this.page = Math.floor((this.totalPages + this.page + 2) / 2);
      }
    } else {
      this.page = +page;
    }
    this.handleChanged.emit({ page: this.page, pageSize: this.pageSize });
  }

  ngOnInit() {
    this.generatePaginationArray();
  }

  public ngOnChanges() {
    this.generatePaginationArray();
  }

  generatePaginationArray() {
    const arrPrev = [];
    const arrAfter = [];
    if (this.page < 6) {
      for (let i = 1; i < this.page; i++) {
        arrPrev.push(i);
      }
    } else {
      arrPrev[0] = 1;
      arrPrev[1] = '...';
      arrPrev[2] = this.page - 2;
      arrPrev[3] = this.page - 1;
    }
    if (this.totalPages - this.page < 5) {
      for (let i = this.page + 1; i <= this.totalPages; i++) {
        arrAfter.push(i);
      }
    } else {
      arrAfter[0] = this.page + 1;
      arrAfter[1] = this.page + 2;
      arrAfter[2] = '...';
      arrAfter[3] = this.totalPages;
    }
    this.paginationArray = arrPrev.concat(this.page, arrAfter);
  }
}
