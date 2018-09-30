import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit?: number, trail?: string) : string {
        //let trail = '…'; 
        if (!value || limit === undefined) return value;
        return value.length > limit ? value.substring(0, limit-(trail?trail.length:0)) + (trail ? trail : '') : value;
    }
/*
    transform(value: string, n: any){
        let pad:string = Array(n-1).fill('').join(' ');
        if (typeof value === 'undefined' || !value) 
            return '…' + pad;
        //console.log((value + pad).substring(0, n));
        return (value + '…' + pad).substring(0, n-1);
    }

    pad (pad: string, str: string, padLeft: boolean) {
        if (typeof str === 'undefined') 
            return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }
*/
}

// For example, to zero pad a number to a length of 10 digits,
// pad('0000000000',123,true);
// To pad a string with whitespace, so the entire string is 255 characters,
// var padding = Array(256).join(' '), // make a string of 255 spaces
// pad(padding,123,true);