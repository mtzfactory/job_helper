//http://stackoverflow.com/questions/17238977/angularjs-newline-characters-to-paragraph-elements
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'nl2paragraph' })
export class Nl2ParagraphPipe implements PipeTransform {
    transform(value: string): any {
        if (!value) return value;
        return value.split('\n');
    }
}