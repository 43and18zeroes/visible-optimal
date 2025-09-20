import { Component, inject } from '@angular/core';
import { ProductDetails } from '../../shared/product-details/product-details';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { FinancialDataService } from '../../../services/financial-data-service';
import { MSCI } from '../../../constants';

@Component({
  selector: 'app-msci',
  imports: [ProductDetails, AssetDetails],
  templateUrl: './msci.html',
  styleUrl: './msci.scss',
})
export class Msci {
  financialData = inject(FinancialDataService);

  currentPrice: number | null = null;

  msciData = MSCI;
  msciApiSymbol = MSCI.API_SYMBOL;
  cAmountsData000 = MSCI.C_AMOUNTS_000;
  cAmountsData001 = MSCI.C_AMOUNTS_001;
  assetRows: any[] = [[this.cAmountsData000, this.cAmountsData001]];

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
