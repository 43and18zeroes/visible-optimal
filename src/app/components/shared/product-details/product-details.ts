import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CopyButton } from "../copy-button/copy-button";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  imports: [CopyButton, MatButtonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {
  @Input() productName: string = '';
  @Input() productIsin: string = '';
  @Input() productWkn: string = '';
  @Output() fetchPrice = new EventEmitter<void>();

  onFetchPrice() {
    this.fetchPrice.emit();
  }
}
