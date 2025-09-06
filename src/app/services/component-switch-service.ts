import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentSwitchService {
  private _changes = new Subject<string>();
  changes$ = this._changes.asObservable();

  switchTo(name: string) {
    this._changes.next(name);
  }
}
