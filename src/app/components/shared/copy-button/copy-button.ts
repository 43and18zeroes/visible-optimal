import { Component, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-copy-button',
  imports: [MatIcon],
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.scss',
})
export class CopyButton {
  private clipboard = inject(Clipboard);

  @Input() value = '';
  @Input() label = 'Copy';

  copied = false;

  copyToClipboard(e?: Event) {
    // Verhindert ggf. Doppelfeuer auf Mobile, s.u.
    e?.preventDefault();

    const ok = this.clipboard.copy(this.value);
    this.copied = ok; // true, wenn erfolgreich (inkl. Fallback)
    if (ok) setTimeout(() => (this.copied = false), 3000);
  }
}