import { Component, OnInit, Input } from '@angular/core';

import { DataSharing } from '../data/data.sharing';
import { FilterInterface } from '../interfaces/filter.interface';

@Component({
  selector: 'mtz-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() filter: FilterInterface;
  @Input() index: number;
  private updatedFilter: FilterInterface;
  private initialized: boolean = false;

  constructor(public datasharing: DataSharing) { }

  ngOnInit() { }

  filterChanged(key: string): void {
      this.updatedFilter = {
        keywords: this.filter.keywords,
        province: this.filter.province,
        city: this.filter.city,
        days: this.filter.days,
        enabled: this.filter.enabled,
        created: this.filter.created,
        modified: new Date().toLocaleString()
      }
      this.datasharing.offersFilters.update(key, this.updatedFilter);
  }

  filterRemove(key: string) {
    this.datasharing.offersFilters.remove(key);
  }
}
