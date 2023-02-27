import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
  standalone: true
})
export class DomSanitizerPipe implements PipeTransform {

  private domSanitizer = inject(DomSanitizer);

  transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
