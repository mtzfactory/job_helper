import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';

import { FilterInterface } from '../interfaces/filter.interface';

export class DataSharing {
    public offersFilters: FirebaseListObservable<any[]>;
    public offersRejected: FirebaseListObservable<any[]>;
    public offersReaded: FirebaseListObservable<any[]>;

    public fbReaded: any;
    
    public activeFilter: FilterInterface;
    public activeFilterKey: string;
    public pageFilter: number;
    public selectedOffer: string;

    alreadyReaded(jobId: string): string {
        let key: string = null;

        this.fbReaded.some(function(item) {
            if (item.id == jobId) {
                key = item.$key;
                return true;
            }
        });
        return key;
    }
}