import { Component } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { F_AMOUNTS } from '../../../constants';

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  amounts = F_AMOUNTS;
}
