import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from './auth/auth.service'

import { DataSharing } from './data/data.sharing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,
              private ar: ActivatedRoute,
              public auth$: AuthService,
              public datasharing: DataSharing) {//, private af: AngularFire) {
      this.auth$.logout();
    // this.af.auth.subscribe(auth => console.log(auth));
      router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          // you can use DomAdapter
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(element); }
        }
      }
    });
  }

  routeMe(path: string, anchor?: string): void {
    this.router.navigate([path], { relativeTo: this.ar, fragment: anchor })
  }

  logOut(): void {
    firebase.database().goOffline();
    this.auth$.logout();
    console.info("User has logged out.");
    this.router.navigate(["./"], { relativeTo: this.ar, fragment: "app" });
  }
}
