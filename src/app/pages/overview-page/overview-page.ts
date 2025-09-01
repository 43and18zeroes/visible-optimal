import { Component } from '@angular/core';
import { F_AMOUNTS } from '../../constants';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-overview-page',
  imports: [DatePipe, CurrencyPipe, MatIcon],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.scss'
})
export class OverviewPage {
  amounts = F_AMOUNTS;
  purchaseDate = new Date(this.amounts.PURCHASE_DATE);
  copied = false;

  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
}
