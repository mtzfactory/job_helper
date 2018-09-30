import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { JobService} from '../services/job.service';

import { OfferEvent } from '../events/offer.event';
import { OffersEvent } from '../events/offers.event';

import { FilterInterface } from '../interfaces/filter.interface';
import { OfferInterface } from '../interfaces/offer.interface';
import { OffersInterface } from '../interfaces/offers.interface';
import { DataSharing } from '../data/data.sharing';

const voidFilter: FilterInterface = {
  keywords: null,
  city: null,
  province: null,
  days: 0,
  enabled: false,
  created: null,
  modified: null
}

const voidOffer: OffersInterface = {
  offers: null,
  totalResults: -1,
  currentResults: -1,
  totalPages: -1,
  currentPage: -1,
  pageSize: -1,
  facets: null
};

@Component({
  //selector: 'body', 
  //host: { '[class.no-scroll]':'showOverlayNoBodyScroll' },
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent {
  private showLeftPanel: boolean = false;
  private showRightPanel: boolean = false;
  //private @HostBinding('class.no-scroll') showOverlayNoBodyScroll: boolean = false;
  //private showOverlayNoBodyScroll: boolean = false;
  private userId: string;
  private fbFilters: any;
  public jobOffers: OffersInterface = voidOffer;
  public jobOffer: OfferInterface = null;

  constructor(private router: Router,
              private ar: ActivatedRoute,
              private af: AngularFire,
              public auth$: AuthService,
              public datasharing: DataSharing,
              private jobService: JobService) { 
              //private offersEvent: OffersEvent,
              //private offerEvent: OfferEvent) {
    this.userId = this.auth$.id;
    //this.offerEvent._offer.subscribe((jobId) => {
    //  this.datasharing.selectedOffer = jobId;
    //  this.retrieveOffer(jobId);
    //})
    //this.offersEvent._page.subscribe((pg) => {
    //  this.datasharing.pageFilter = pg;
    //  this.retrieveOffers(this.datasharing.activeFilter, pg);
    //})
  }

  ngOnInit(): void {
    if (this.auth$.userVerified) {
      this.datasharing.activeFilter = voidFilter;
      this.datasharing.offersFilters = this.af.database.list('/' + this.userId + '/filters');
      this.datasharing.offersFilters.map( (arr) => { return arr.reverse(); } ).subscribe(filters => {
        this.fbFilters = filters;
      });
      this.datasharing.offersReaded = this.af.database.list('/' + this.userId + '/readed');
    }
  }

  setActiveFilter(filterKey: string): void {
    //if (filterKey != this.datasharing.activeFilterKey) {
      document.body.style.cursor='wait';
      //this.datasharing.activeFilter = voidFilter;
      this.datasharing.activeFilterKey = filterKey;
      this.jobOffers = voidOffer;

      this.datasharing.offersReaded = this.af.database.list('/' + this.userId + '/readed/' + filterKey);
      this.datasharing.offersReaded.subscribe(readed => {
        this.datasharing.fbReaded = readed;
      });

      let filter: FilterInterface = voidFilter;
      this.af.database.list('/' + this.userId + '/filters/' + filterKey, { preserveSnapshot: true }).take(8)
        .subscribe(
          snapshots => {
            snapshots.forEach(snapshot => {
              filter[snapshot.key] = snapshot.val();
            });
          },
          error => { console.error('No se han podido cargar el filtro: ' + filterKey + '. ' + error); },
          () => { 
            this.datasharing.activeFilter = filter;
            this.datasharing.pageFilter = 0;
            this.retrieveOffers(filter);
          }
        );
    //}
  }

  addFilter() {
    //if (this.filter.days == 0) this.filter.days = 1;
    let filter:FilterInterface = {
      keywords: "",
      province: "",
      city: "",
      days: 1,
      enabled: true,
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString()
    }
    this.datasharing.offersFilters.push(filter);
  }

  retrieveOffers(f: FilterInterface, pg?: number): void {
    let d: any;
    let t: Date = new Date();
    t.setDate(new Date().getDate() - f.days);
    //this.offersEvent.update(null);
    this.jobService.getOffers(f.keywords, f.city, f.province, t.toISOString().split('.')[0]+"Z", null, pg||null)
      .subscribe(
        data => { d = data; },
        error => { console.error('No se han podido cargar las ofertas de trabajo. ' + error); },
        () => {
          this.jobOffers = d;
          //this.offersEvent.update(this.jobOffers);
          document.body.style.cursor='default';
          console.info('Se han cargado las ofertas de trabajo (' + this.jobOffers.currentPage + '/' + this.jobOffers.totalPages + '): ' + this.datasharing.activeFilterKey);
        }
      );
  }

  retrieveOffer(jobId: string): void {
    let d: any;
    let item = { id: jobId, rejected: false, visited: false, seen : new Date().toISOString() };

    document.body.style.cursor='wait';
    if (!this.datasharing.alreadyReaded(jobId)) this.datasharing.offersReaded.push(item);
    this.datasharing.selectedOffer = jobId;
    this.jobService.getOffer(jobId)
      .subscribe(
        data => { d = data; },
        error => { console.error('No se ha podido cargar la oferta de trabajo. ' + error); },
        () => {
          console.info('Se ha cargado la oferta de trabajo: ' + this.datasharing.selectedOffer);
          this.jobOffer = d;
          document.getElementById("top-right-sidenav").scrollTop = 0;
          this.showRightPanel = true;
          this.bodyScroll(true);
          document.body.style.cursor = 'default';
        }
      );
  }

  openOffer(offer: OfferInterface): void {
    //this.showRightPanel = false;
    //let item = { id: offer.id, visited: true, seen : new Date().toISOString() };
    let key = this.datasharing.alreadyReaded(offer.id);
    if (key) this.datasharing.offersReaded.update(key, { visited: true });
    window.open(offer.link, "_blank");
  }

  markAsRejected(jobId: string): void {
    this.showRightPanel = false;
    this.bodyScroll(false);
    //let item = { id: jobId, rejected: true, seen : new Date().toISOString() };
    let key = this.datasharing.alreadyReaded(jobId);
    if (key) this.datasharing.offersReaded.update(key, { rejected: true });
  }

  previousPage(): void {
    if (this.jobOffers.currentPage > 1) {
      //this.offersEvent.page(this.jobOffers.currentPage - 1);
      this.datasharing.pageFilter = this.jobOffers.currentPage - 1;
      this.retrieveOffers(this.datasharing.activeFilter, this.datasharing.pageFilter);
      this.router.navigate(["dash"], { fragment: "top" });
    }
  }

  nextPage(): void {
    if (this.jobOffers.currentPage < this.jobOffers.totalPages) {
      //this.offersEvent.page(this.jobOffers.currentPage + 1);
      this.datasharing.pageFilter = this.jobOffers.currentPage + 1;
      this.retrieveOffers(this.datasharing.activeFilter, this.datasharing.pageFilter);
      this.router.navigate(["dash"], { fragment: "top" });
    }
  }

  bodyScroll(noScroll: boolean) {
    if (noScroll) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }

}