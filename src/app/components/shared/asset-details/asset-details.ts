import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

export interface AssetData {
  PURCHASE_DATE: string | number | Date;
  AMOUNT: number;
  INITIAL_PRICE: number;
  NOTE?: string;
}

@Component({
  selector: 'app-asset-details',
  imports: [DatePipe, DecimalPipe],
  providers: [CurrencyPipe],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.scss',
})

export class AssetDetails implements OnChanges {
  currencyPipe = inject(CurrencyPipe);

  @Input({ required: true }) assetData!: AssetData;
  @Input() currentPrice: number | null = null; // falls du später wieder von außen setzt

  purchaseDate: Date | null = null;
  currentVolume: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if ('assetData' in changes && this.assetData) {
      this.purchaseDate = new Date(this.assetData.PURCHASE_DATE);
      // falls currentPrice schon gesetzt ist, gleich das Volumen aktualisieren
      if (this.currentPrice != null) {
        this.currentVolume = this.calculateVolume(this.currentPrice);
      }
    }
    if ('currentPrice' in changes && this.currentPrice != null && this.assetData) {
      this.currentVolume = this.calculateVolume(this.currentPrice);
    }
  }

  get initialVolume(): number | null {
    if (!this.assetData) return null;
    return this.calculateVolume(this.assetData.INITIAL_PRICE);
  }

  get profitEuro(): number | null {
    if (this.currentVolume == null || this.initialVolume == null) return null;
    return this.currentVolume - this.initialVolume;
  }

  get profitPercent(): number | null {
    if (this.currentPrice == null || !this.assetData) return null;
    return ((this.currentPrice - this.assetData.INITIAL_PRICE) / this.assetData.INITIAL_PRICE) * 100;
  }

  formatCurrency(value: number | null): string {
    if (value == null) return '';
    return this.currencyPipe.transform(value, 'EUR', 'symbol', '1.2-2', 'de') ?? '';
  }

  calculateVolume(stockPrice: number) {
    return (this.assetData?.AMOUNT ?? 0) * stockPrice;
  }
}