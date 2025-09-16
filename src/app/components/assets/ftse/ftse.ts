import { Component, inject } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { FinancialDataService } from '../../../services/financial-data-service';
import { ASSETS_DATA } from '../../../constants';
import { ProductDetails } from "../../shared/product-details/product-details";

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails, ProductDetails],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  financialData = inject(FinancialDataService);

  ftseData = ASSETS_DATA.FTSE;
  ftseApiSymbol = ASSETS_DATA.FTSE.API_SYMBOL;
  fAmountsData000 = ASSETS_DATA.FTSE.F_AMOUNTS_000;
  cAmountsData000 = ASSETS_DATA.FTSE.C_AMOUNTS_000;

  currentPrice: number | null = null;

  loading = false;
  error: string | null = null;

  assetRows: any[] = [[this.fAmountsData000, this.cAmountsData000]];

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
