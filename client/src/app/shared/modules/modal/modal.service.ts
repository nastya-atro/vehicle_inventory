import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: any[] = [];
  private currentModalState: any | null = null;

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string, state?: any) {
    // open modal specified by id
    this.currentModalState = state;
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  getState() {
    return this.currentModalState;
  }

  findModal(id: string) {
    return this.modals.find(x => x.id === id);
  }

  close(id: string) {
    // close modal specified by id
    this.currentModalState = null;
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }
}
