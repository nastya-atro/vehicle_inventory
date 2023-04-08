import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() id!: string;
  @Input() title!: string;
  @Input() queryName!: string;
  @Input() options!: { name: string; value: string | string[] }[];
  @Input() defaultOption!: { name: string; value: string };
  @Output() value!: { name: string; value: string };
  $el!: HTMLElement | null;

  @Output() handleChanged = new EventEmitter<{
    name: string;
    value: string | { sortBy: string; sortOrder: string };
    queryName: string;
  }>();

  /**
   *
   */
  handleChangeFilter(option: any) {
    this.value = option;

    this.handleChanged.emit({
      name: this.id,
      value: option.value,
      queryName: this.queryName,
    });
  }

  ngOnInit() {
    this.value = this.defaultOption;
  }
}
