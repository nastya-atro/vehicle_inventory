import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() content!: { [key: string]: any }[];
  @Input() class!: string;
  @Input() displayedColumns: string[] = [];
  @Input() pathToDetailPage!: string;
  @Output() handleChangeStatus = new EventEmitter<{ id: number; status: string; comment: string }>();
  @Output() handleRemove = new EventEmitter<{ id: number }>();
  selection = new SelectionModel<any>(true, []);

  constructor() {}
}
