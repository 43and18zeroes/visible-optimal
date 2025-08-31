import { Component } from '@angular/core';
import { F_AMOUNTS } from '../../constants';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.scss'
})
export class OverviewPage {

  amounts = F_AMOUNTS;

  purchaseDate = new Date(this.amounts.PURCHASE_DATE);
}
