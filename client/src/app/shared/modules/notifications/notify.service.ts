import { Injectable } from '@angular/core';
import AWN from 'awesome-notifications';
import { DEFAULT_NOTIFIER_OPTIONS } from './notify.enum';
import { Notifications } from './notify.interface';

@Injectable()
export class NotifyService {
  readonly notifier: Notifications = new AWN(DEFAULT_NOTIFIER_OPTIONS);

  constructor() {
    this.notifier = new Proxy<Notifications>(this.notifier, {
      get(target: AWN, name: string) {
        if ((target as any)[name]) {
          return (target as any)[name];
        }
      },
    });
  }
}
