import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from './loader.component';

@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective implements OnInit, OnDestroy {
  timeoutId: any;
  @Input('appLoader') set isLoading(loading: boolean) {
    if (loading) {
      this.timeoutId = setTimeout(() => this.addLoader(), this.delay);
    } else {
      clearTimeout(this.timeoutId);
      this.removeLoader();
    }
  }
  @Input() delay = 300;
  @Input() set minHeight(height: number) {
    const container = this.element.nativeElement;
    this.renderer.setStyle(container, 'min-height', height + 'px');
  }
  loader!: ComponentRef<LoaderComponent>;

  constructor(private element: ElementRef, private containerRef: ViewContainerRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  addLoader(): void {
    const container = this.element.nativeElement;
    this.renderer.setStyle(container, 'position', 'relative');

    this.loader = this.containerRef.createComponent(LoaderComponent);
    container.appendChild(this.loader.location.nativeElement);
  }

  removeLoader(): void {
    if (this.loader) {
      const index = this.containerRef.indexOf(this.loader.hostView);
      this.containerRef.remove(index);
    }
  }
}
