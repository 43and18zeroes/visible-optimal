import { Component, DestroyRef, inject } from '@angular/core';
import { ProductDetails } from '../../shared/product-details/product-details';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { FinancialDataService } from '../../../services/financial-data-service';
import { MSCI } from '../../../constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-msci',
  imports: [ProductDetails, AssetDetails],
  templateUrl: './msci.html',
  styleUrl: './msci.scss',
})
export class Msci {
  financialData = inject(FinancialDataService);
  destroyRef = inject(DestroyRef);

  currentPrice: number | null = null;

  msciData = MSCI;
  msciApiSymbol = MSCI.API_SYMBOL;
  cAmountsData000 = MSCI.C_AMOUNTS_000;
  cAmountsData001 = MSCI.C_AMOUNTS_001;
  assetRows: any[] = [[this.cAmountsData000, this.cAmountsData001]];

  ngOnInit() {
    this.financialData
      .getPrice$(this.msciApiSymbol)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((price) => (this.currentPrice = price));
  }

  fetchDevPrice() {
    this.financialData.fetchDevPrice(this.msciApiSymbol);
  }

  fetchLivePrice() {
    this.financialData.fetchLivePrice(this.msciApiSymbol);
  }
}
