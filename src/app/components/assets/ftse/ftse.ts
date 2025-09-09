import { Component } from '@angular/core';
import { AssetDetails } from '../../shared/asset-details/asset-details';
import { F_AMOUNTS } from '../../../constants';
import { CopyButton } from "../../shared/copy-button/copy-button";

@Component({
  selector: 'app-ftse',
  imports: [AssetDetails, CopyButton],
  templateUrl: './ftse.html',
  styleUrl: './ftse.scss',
})
export class Ftse {
  amounts = F_AMOUNTS;
}
