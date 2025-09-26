import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { secrets } from '../../environments/environment.secret';

type GlobalQuoteResponse = {
  ['Global Quote']?: {
    ['05. price']?: string;
  };
  Note?: string; // kommt bei Rate Limits
  Information?: string; // bei falschen Parametern etc.
};

@Injectable({
  providedIn: 'root',
})
export class FinancialDataService {
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  // Preis-Streams pro Symbol
  private priceSubjects = new Map<string, BehaviorSubject<number | null>>();

  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  private getOrCreateSubject(symbol: string) {
    if (!this.priceSubjects.has(symbol)) {
      this.priceSubjects.set(symbol, new BehaviorSubject<number | null>(null));
    }
    return this.priceSubjects.get(symbol)!;
  }

  /** Observable für ein konkretes Symbol */
  getPrice$(symbol: string): Observable<number | null> {
    return this.getOrCreateSubject(symbol).asObservable();
  }

  /** Live-Preis für ein Symbol holen und in dessen Stream pushen */
  fetchLivePrice(symbol: string) {
    const subj = this.getOrCreateSubject(symbol);
    subj.next(null); // Ladezustand
    this.getGlobalQuote(symbol).subscribe({
      next: (price) => subj.next(price),
      error: (err) => {
        console.error(err);
        subj.next(null);
      },
    });
  }

  /** Dev-Preis pro Symbol setzen (praktisch für Mocks) */
  fetchDevPrice(symbol: string) {
    this.getOrCreateSubject(symbol).next(200);
  }

  /** Holt den aktuellen Preis für ein Symbol (unverändert) */
  getGlobalQuote(symbol: string): Observable<number> {
    const params = new HttpParams()
      .set('function', 'GLOBAL_QUOTE')
      .set('symbol', symbol)
      .set('apikey', secrets.API_KEY);

    return this.http.get<GlobalQuoteResponse>(this.baseUrl, { params }).pipe(
      map((res) => {
        if (res.Note) throw new Error('API-Limit erreicht. Bitte später erneut versuchen.');
        const priceStr = res['Global Quote']?.['05. price'];
        const price = priceStr ? parseFloat(priceStr) : NaN;
        if (isNaN(price)) throw new Error('Ungültige Kursdaten erhalten.');
        return price;
      })
    );
  }
}