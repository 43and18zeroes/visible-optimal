import { Component, inject } from '@angular/core';
import { F_AMOUNTS } from '../../constants';
import {
  DatePipe,
  CurrencyPipe,
  DecimalPipe,
  CommonModule,
} from '@angular/common';
import { CopyButton } from '../../components/shared/copy-button/copy-button';
import { MatButtonModule } from '@angular/material/button';
import { FinancialDataService } from '../../services/financial-data-service';

@Component({
  selector: 'app-overview-page',
  imports: [CommonModule, DatePipe, DecimalPipe, CopyButton, MatButtonModule],
  providers: [CurrencyPipe],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.scss',
})
export class OverviewPage {
  financialData = inject(FinancialDataService)
  amounts = F_AMOUNTS;
  purchaseDate = new Date(this.amounts.PURCHASE_DATE);
  currentPrice: number | null = null;
  currentVolume: number | null = null;

  loading = false;
  error: string | null = null;

  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  get initialVolume(): number {
    return this.calculateVolume(this.amounts.INITIAL_PRICE);
  }

  get profitEuro(): number | null {
    if (this.currentVolume === null) return null;
    return this.currentVolume - this.initialVolume;
  }

  get profitPercent(): number | null {
    if (this.currentPrice === null) return null;
    return (
      ((this.currentPrice - this.amounts.INITIAL_PRICE) /
        this.amounts.INITIAL_PRICE) *
      100
    );
  }

  calculateVolume(stockPrice: number) {
    return this.amounts.AMOUNT * stockPrice;
  }

  fetchDevPrice() {
    const devPrice: number = 200; // Mock price for development
    this.updatePriceDetails(devPrice);
  }

  fetchLivePrice(symbol = 'VWCE.DE') {
    this.loading = true;
    this.error = null;
    this.currentPrice = null;

    this.financialData.getGlobalQuote(symbol).subscribe({
      next: (price) => {
        this.updatePriceDetails(price);
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error =
          err instanceof Error
            ? err.message
            : 'Fehler beim Abrufen der Kursdaten.';
        this.loading = false;
      },
    });
  }

  updatePriceDetails(currentPrice: number) {
    this.currentPrice = currentPrice;
    this.currentVolume = this.calculateVolume(currentPrice);
  }

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
