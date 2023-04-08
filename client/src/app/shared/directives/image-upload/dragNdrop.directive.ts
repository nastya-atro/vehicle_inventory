import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDragNDrop]',
})
export class DragNDropDirective {
  @HostBinding('class.fileover') fileOver!: boolean;
  @Input() accept!: string;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() fileDropError = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    if (evt.dataTransfer) {
      const files = evt.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (!this.checkType(files[i].name, files[i].type)) {
          this.fileDropError.emit({
            message: `Unsupported file type ${files[i].name.split('.').pop()}`,
          });
          return;
        }
      }
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }

  private checkType(name: string, type: string) {
    if (!this.accept || this.accept.length === 0) {
      return true;
    }
    const accept = this.accept.split(',').map(x => x.trim());
    return !(
      accept.indexOf(type) === -1 && // image/png,image/jpg
      accept.indexOf(type.replace(/\/.+$/, '/*')) === -1 && // image/*
      accept.indexOf('.' + name.split('.').pop()) === -1
    );
  }
}
