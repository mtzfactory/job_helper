import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class FnfComponent {
  constructor(private router: Router, private ar: ActivatedRoute) {
  }
  routeMe(path: string, anchor?: string): void {
    this.router.navigate([path], { fragment: anchor });
  }
}
