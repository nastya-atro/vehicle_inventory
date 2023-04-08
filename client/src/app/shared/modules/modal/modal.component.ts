import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  private readonly element: any;

  @Input() size!: string;
  @Input() id!: string;
  @Input() actionModal: boolean = false;
  @Input() slimSizeModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter();
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // ensure id attribute exists
    if (!this.id) {
      return;
    }
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy() {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open() {
    // this.element.style.display = 'block';
    this.element.children[0].classList.remove('modal_closed');
  }

  // close modal
  close() {
    // this.element.style.display = 'none';
    this.closeModalEvent.emit();
    this.element.children[0].classList.add('modal_closed');
  }
}
