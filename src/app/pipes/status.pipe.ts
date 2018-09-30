import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
    transform(array, neddle): string {
        let color: string = null;
        if (!array) return color;
        array.some(function(item) {
            if (item["id"] == neddle) {
                if (item["rejected"]) color = "list-group-item-danger"
                else if (item["visited"]) color ="list-group-item-success"
                else color = "list-group-item-warning";
                //console.log(neddle + ": " + color);
                return;
            }
        });
        return color;
    }
}