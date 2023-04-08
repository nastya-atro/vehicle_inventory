export enum NOTIFICATION_TYPE {
  TIP = 'tip',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ALERT = 'alert',
  ASYNC = 'async',
}

export const DEFAULT_NOTIFIER_OPTIONS = {
  position: 'top-right' as any,
  maxNotifications: 10,
  animationDuration: 300,
  labels: {
    warning: 'Error',
    info: 'Info',
    tip: 'Tip',
    success: 'Success',
    alert: 'Error',
    async: 'Loading',
  },
  icons: {
    prefix: '<svg class="icon icon_size-m">\n' + "<use href='#",
    suffix: "' height='100%' width='100%'></use>\n" + '  </svg>',
    info: 'iconWarningTriangle',
    warning: 'iconWarningTriangle',
    tip: 'icon_question',
    success: 'iconCheck',
    alert: 'iconWarningTriangle',
    async: 'cof fa-spin',
  },
  messages: {
    async: 'Please, wait…',
    ['async-block']: 'Loading',
  },
};
