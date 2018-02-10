import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({
  name: 'youTube',
})
export class YouTubePipe implements PipeTransform {

  constructor(private dom: DomSanitizer) {

  }

  transform(value, args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
