import { Component, inject } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { FinancialDataService } from '../../../services/financial-data-service';
import { ASSETS_DATA } from '../../../constants';
import { ProductDetails } from '../../shared/product-details/product-details';

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails, ProductDetails],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  financialData = inject(FinancialDataService);

  currentPrice: number | null = null;

  ftseData = ASSETS_DATA.FTSE;
  ftseApiSymbol = ASSETS_DATA.FTSE.API_SYMBOL;
  fAmountsData000 = ASSETS_DATA.FTSE.F_AMOUNTS_000;
  cAmountsData000 = ASSETS_DATA.FTSE.C_AMOUNTS_000;
  assetRows: any[] = [[this.fAmountsData000, this.cAmountsData000]];

  ngOnInit() {
    this.financialData.currentPrice$.subscribe((price) => {
      this.currentPrice = price;
    });
  }

  fetchDevPrice() {
    this.financialData.fetchDevPrice();
  }

  fetchLivePrice(apiSymbol: string) {
    this.financialData.fetchLivePrice(apiSymbol);
  }
}
