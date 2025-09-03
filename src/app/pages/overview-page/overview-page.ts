import { Component } from '@angular/core';
import { F_AMOUNTS } from '../../constants';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CopyButton } from '../../components/shared/copy-button/copy-button';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-overview-page',
  imports: [DatePipe, CurrencyPipe, CopyButton, MatButtonModule],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.scss',
})
export class OverviewPage {
  amounts = F_AMOUNTS;
  purchaseDate = new Date(this.amounts.PURCHASE_DATE);
  copied = false;
  currentPrice: number | null = null;

  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }

  get initialVolume(): number {
    return this.amounts.AMOUNT * this.amounts.INITIAL_PRICE;
  }

  fetchDevPrice() {
    const devPrice: number = 200; // Mock price for development
    this.updatePriceDetails(devPrice);
  }

  updatePriceDetails(currentPrice: number) {
    this.currentPrice = currentPrice;
    // updateElementText("currentPrice", formatCurrency(price));
    // const currentValue = calculateInitialValue(stockAmount, price);
    // const profitMarginEuro = currentValue - initialValue;
    // const profitMarginPercent = ((price - initialPrice) / initialPrice) * 100;
    // updateElementText("currentValue", formatCurrency(currentValue));
    // updateElementText("profitMarginEuro", formatCurrency(profitMarginEuro));
    // updateElementText("profitMarginPercent", `${profitMarginPercent.toFixed(2).replace(".", ",")} %`);
  }
}
