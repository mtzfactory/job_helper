// http://stackoverflow.com/questions/33530726/angular-2-eventemitter-broadcasting-next-from-a-service-function
// http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

import { Observable, ReplaySubject } from 'rxjs/Rx';

export class OffersEvent {
  _offers: ReplaySubject<any> = new ReplaySubject(1);
  _page: ReplaySubject<any> = new ReplaySubject(1);
  
  constructor() { }

  update(data) {
    this._offers.next(data);
  }
  page(pg: number) {
    this._page.next(pg);
  }
}