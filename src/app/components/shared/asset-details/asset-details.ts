import { Component, inject, input, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface HoldingAmounts {
  PRODUCT_NAME: string;
  PRODUCT_ISIN: string;
  PRODUCT_WKN: string;
  PURCHASE_DATE: string | number | Date;
  AMOUNT: number;
  INITIAL_PRICE: number;
}

@Component({
  selector: 'app-asset-details',
  imports: [DatePipe, DecimalPipe, MatButtonModule],
  providers: [CurrencyPipe],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.scss',
})
export class AssetDetails {
  currencyPipe = inject(CurrencyPipe);

  @Input({ required: true }) amounts!: HoldingAmounts;
  @Input() purchaseDate!: Date;
  @Input() initialVolume!: number;
  @Input() currentPrice: number | null = null;
  @Input() currentVolume: number | null = null;
  @Input() profitEuro: number | null = null;
  @Input() profitPercent: number | null = null;

  formatCurrency(value: number | null): string {
    if (value === null) {
      return '';
    }
    return (
      this.currencyPipe.transform(value ?? 0, 'EUR', 'symbol', '1.2-2', 'de') ??
      ''
    );
  }
}
