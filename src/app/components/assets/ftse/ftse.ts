import { Component, DestroyRef, inject } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { FinancialDataService } from '../../../services/financial-data-service';
import { ProductDetails } from '../../shared/product-details/product-details';
import { FTSE } from '../../../constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails, ProductDetails],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  financialData = inject(FinancialDataService);
  destroyRef = inject(DestroyRef);

  currentPrice: number | null = null;

  ftseData = FTSE;
  ftseApiSymbol = FTSE.API_SYMBOL;
  fAmountsData000 = FTSE.F_AMOUNTS_000;
  cAmountsData000 = FTSE.C_AMOUNTS_000;
  cAmountsData001 = FTSE.C_AMOUNTS_001;
  assetRows: any[] = [
    [this.fAmountsData000, this.cAmountsData000],
    [this.cAmountsData001],
  ];

  ngOnInit() {
    this.financialData
      .getPrice$(this.ftseApiSymbol)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((price) => (this.currentPrice = price));
  }

  fetchDevPrice() {
    this.financialData.fetchDevPrice(this.ftseApiSymbol);
  }

  fetchLivePrice() {
    this.financialData.fetchLivePrice(this.ftseApiSymbol);
  }
}
