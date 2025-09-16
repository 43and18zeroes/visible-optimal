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

  private currentPriceSubject = new BehaviorSubject<number | null>(null);
  currentPrice$ = this.currentPriceSubject.asObservable();

  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  /** Holt den aktuellen Preis für ein Symbol */
  getGlobalQuote(symbol: string): Observable<number> {
    const params = new HttpParams()
      .set('function', 'GLOBAL_QUOTE')
      .set('symbol', symbol)
      .set('apikey', secrets.API_KEY);

    return this.http.get<GlobalQuoteResponse>(this.baseUrl, { params }).pipe(
      map((res) => {
        if (res.Note) {
          throw new Error('API-Limit erreicht. Bitte später erneut versuchen.');
        }
        const priceStr = res['Global Quote']?.['05. price'];
        const price = priceStr ? parseFloat(priceStr) : NaN;
        if (isNaN(price)) {
          throw new Error('Ungültige Kursdaten erhalten.');
        }
        return price;
      })
    );
  }

  fetchDevPrice() {
    const price = 200; // Mock price for development
    this.currentPriceSubject.next(price);
  }

  fetchLivePrice(apySymbol: string) {
    this.currentPriceSubject.next(null); // Set to null while fetching
    this.getGlobalQuote(apySymbol).subscribe({
      next: (price) => {
        this.currentPriceSubject.next(price);
      },
      error: (err: unknown) => {
        console.error(err);
        this.currentPriceSubject.next(null);
      },
    });
  }
}
