import { AwnPosition } from 'awesome-notifications';

export type NotificationsOptions = {
  position?: AwnPosition | undefined;
  maxNotifications?: number;
  animationDuration?: number;
  labels?: {
    warning?: string;
    info?: string;
    tip?: string;
    success?: string;
    alert?: string;
    async?: string;
  };
  icons?: {
    warning?: string;
    info?: string;
    tip?: string;
    success?: string;
    alert?: string;
    async?: string;
  };
  messages?: {
    async?: string;
    ['async-block']?: string;
  };
};

export type Notifications = {
  tip: (msg: string, options?: NotificationsOptions) => unknown;
  info: (msg: string, options?: NotificationsOptions) => unknown;
  success: (msg: string, options?: NotificationsOptions) => unknown;
  warning: (msg: string, options?: NotificationsOptions) => unknown;
  alert: (msg: string, options?: NotificationsOptions) => unknown;
  async: (
    promise: Promise<unknown>,
    onResolve: any,
    onReject: any,
    msg: string,
    options?: NotificationsOptions
  ) => unknown;
  confirm: (msg: string, onOk: any, onCancel: any, options?: NotificationsOptions) => unknown;
};
