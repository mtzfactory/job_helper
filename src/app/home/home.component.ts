import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private ar: ActivatedRoute) {
  }
  routeMe(path: string, anchor?: string): void {
    this.router.navigate([path], { relativeTo: this.ar, fragment: anchor });
  }
}
