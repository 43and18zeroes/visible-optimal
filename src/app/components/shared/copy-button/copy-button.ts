import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-copy-button',
  imports: [MatIcon],
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.scss',
})
export class CopyButton {
  @Input() value = ''; // Text, der kopiert wird
  @Input() label = 'Copy'; // aria-label (optional)

  copied = false;

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.value);
      this.copied = true;
      setTimeout(() => (this.copied = false), 3000);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  }
}
