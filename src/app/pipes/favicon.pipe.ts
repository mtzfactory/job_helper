//https://github.com/AdirAmsalem/angular-favicon
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'favicon' })
export class FaviconPipe implements PipeTransform {
    transform(value: string, args: string): any {
        var provider = "https://www.google.com/s2/favicons?domain=%s";
        if (!value) return value;
        return provider.replace(/%s/g, value);
    }
}