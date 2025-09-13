import { Component, inject } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { CopyButton } from '../../shared/copy-button/copy-button';
import { FinancialDataService } from '../../../services/financial-data-service';
import { MatButtonModule } from '@angular/material/button';
import { ASSETS_DATA } from '../../../constants';

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails, CopyButton, MatButtonModule],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  financialData = inject(FinancialDataService);

  ftseApiSymbol = ASSETS_DATA.FTSE.API_SYMBOL;
  fAmountsData = ASSETS_DATA.FTSE.F_AMOUNTS;

  currentPrice: number | null = null;
  currentVolume: number | null = null;

  loading = false;
  error: string | null = null;

  fetchDevPrice() {
    const devPrice: number = 200; // Mock price for development
    this.updatePriceDetails(devPrice);
  }

  fetchLivePrice(symbol = this.ftseApiSymbol) {
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

  calculateVolume(stockPrice: number) {
    return this.fAmountsData.AMOUNT * stockPrice;
  }
}
