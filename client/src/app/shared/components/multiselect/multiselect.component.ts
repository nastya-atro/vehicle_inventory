import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

export type MultiselectParams = {
  selectedOptions: Option[];
  entity: string;
};
type Option = { id: number; title: string };

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent implements OnInit {
  @Input() title!: string;
  @Input() entity!: string;
  @Input() filterProperty!: string;
  @Input() options: Option[] = [];
  @Input() selectedOptions: any[] = [];
  @Output() handleChange = new EventEmitter<MultiselectParams>();
  selected!: Option[];
  $el: HTMLElement | null = null;

  ngOnInit() {
    if (this.selectedOptions) {
      this.selected = [...this.selectedOptions];
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(evt: any) {
    if (
      (evt.path && !evt.path.includes(this.$el) && this.$el) ||
      (evt.composedPath && !evt.composedPath().includes(this.$el) && this.$el)
    ) {
      this.$el.classList.remove('multiselect_opened');
      this.$el = null;
    }
  }

  addSelectItem($event: any, item: Option) {
    $event.preventDefault();
    $event.stopPropagation();

    this.selected.push(item);
    this.$el && this.$el.classList.remove('multiselect_opened');

    this.handleChange.emit({ selectedOptions: this.selected, entity: this.filterProperty });
  }

  removeSelectItem($event: any, item: Option) {
    $event.preventDefault();
    $event.stopPropagation();

    this.selected = this.selected.filter(option => option.id !== item.id);
    this.handleChange.emit({ selectedOptions: this.selected, entity: this.filterProperty });
  }

  toggleMultiselect($el: HTMLElement) {
    if (!this.checkAllOptionsAreSelected()) {
      this.$el = $el;
      this.$el.classList.toggle('multiselect_opened');
    }
  }

  checkAllOptionsAreSelected() {
    if (this.selectedOptions && this.options && this.selectedOptions.length && this.options.length) {
      return this.selectedOptions.length === this.options.length;
    }
    return false;
  }
}
