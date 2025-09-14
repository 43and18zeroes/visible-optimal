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

  ftseData = ASSETS_DATA.FTSE;
  ftseApiSymbol = ASSETS_DATA.FTSE.API_SYMBOL;
  fAmountsData001 = ASSETS_DATA.FTSE.F_AMOUNTS_001;
  cAmountsData001 = ASSETS_DATA.FTSE.C_AMOUNTS_001;

  currentPrice: number | null = null;
  // currentVolume: number | null = null;

  loading = false;
  error: string | null = null;

  fetchDevPrice() {
    this.currentPrice = 200; // Mock price for development
  }

  fetchLivePrice(symbol = this.ftseApiSymbol) {
    this.loading = true;
    this.error = null;
    this.currentPrice = null;

    this.financialData.getGlobalQuote(symbol).subscribe({
      next: (price) => {
        this.currentPrice = price;
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
}
