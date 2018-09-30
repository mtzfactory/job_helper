import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// DATA INTERFACES
import { OffersInterface } from '../interfaces/offers.interface';
import { OfferInterface } from '../interfaces/offer.interface';

const APPSPOT = "https://job-helper.appspot.com/query";
const IJ_OFFER = 'https://api.infojobs.net/api/1/offer';
const IJ_APPLICATION = 'https://api.infojobs.net/api/1/application';

const USERNAME: string = '8c6b2bf93db6451c80fd6d85dd4b594c';
const PASSWORD: string = '5DLZ/kHy150BM/0I8MMl/XcgwsGsQN+TXxeUF6LbjShe5859ew';

@Injectable()
export class JobService {

  constructor(private _http: Http, private _jsonp: Jsonp) {
    //this.offersUrl = 'https://angular2.apispark.net/v1/companies/'
  }

  private post(oi?: string, q?: string, c?: string, p?: string, mn?: string, mx?: string, pg?: number): Observable<any> {
    let uri = APPSPOT;
    let urlSearchParams = new URLSearchParams();
    if (c) urlSearchParams.append('c', c);
    if (p) urlSearchParams.append('p', p);
    if (q) urlSearchParams.append('q', q);
    if (mn) urlSearchParams.append('mn', mn);
    if (mx) urlSearchParams.append('mx', mx);
    if (pg) urlSearchParams.append('pg', String(pg));
    if (oi) urlSearchParams.append('oi', oi);
    let body = urlSearchParams.toString()
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let data$ = this._http.post(uri, body, new RequestOptions({ headers: headers }))
      .map((res:Response) => res.json());
    return data$;
  }

  public getOffers(q: string, c?: string, p?: string, mn?: string, mx?: string, pg?: number): Observable<OffersInterface> {
    return this.post(null, q, c, p, mn, mx, pg);
  }

  public getOffer(oi: string): Observable<OfferInterface> {
    return this.post(oi);
  }

  public getApplications(query: string) {

  }

  private getHeaders(): Headers{
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(USERNAME + ':' + PASSWORD));
    //headers.append('Authorization', 'Basic ' + btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be7-9655-7ef7d7bf9d20'));
    //headers.append('Content-Type', 'text/plain');
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    //headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.append('Accept', 'text/plain');
    return headers;
  }
  /*
  The access credetials are:
    Client ID: 8c6b2bf93db6451c80fd6d85dd4b594c
    Client Secret: 5DLZ/kHy150BM/0I8MMl/XcgwsGsQN+TXxeUF6LbjShe5859ew

    OGM2YjJiZjkzZGI2NDUxYzgwZmQ2ZDg1ZGQ0YjU5NGM6NURMWi9rSHkxNTBCTS8wSThNTWwvWGNnd3NHc1FOK1RYeGVVRjZMYmpTaGU1ODU5ZXc=

  $ echo -n "Aladdin:OpenSesame" | base64
  */
}