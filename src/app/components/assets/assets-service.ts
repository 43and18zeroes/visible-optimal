import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private document = inject(DOCUMENT);

  public scrollToTop(delayMs: number = 0): void {
    this.document.defaultView?.setTimeout(() => {
      const content = this.document.querySelector('mat-sidenav-content');
      if (content) {
        content.scrollTop = 0;
      } else {
        this.document.documentElement.scrollTop = 0;
      }
    }, delayMs);
  }
}
