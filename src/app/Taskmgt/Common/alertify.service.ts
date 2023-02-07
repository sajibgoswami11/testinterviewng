import { Injectable } from '@angular/core';
declare let alertify;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
    alertify.set('notifier','position', 'top-right');
  }
  public success(message)
  {
    alertify.success(message);
  }
  public error(message)
  {
    alertify.error(message);
  }
  public warning(message)
  {
    alertify.warning(message);
  }
  public message(message)
  {
    alertify.message(message);
  }
  public notify(message)
  {
    alertify.notify(message);
  }
}
