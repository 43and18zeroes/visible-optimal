import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { auditTime, distinctUntilChanged, filter, fromEvent, map, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);
  private platformId = inject(PLATFORM_ID);
  private renderer: Renderer2;
  isAndroid: boolean = false;
  isiPhone: boolean = false;

  constructor(
    rendererFactory: RendererFactory2,
    private router: Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator.userAgent;
      this.isAndroid = /Android/i.test(userAgent);
      this.isiPhone =
        /iPhone|iPad|iPod/i.test(userAgent) || /iOS/i.test(userAgent);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.applyDeviceClassToSidenavContainer();
        });

      this.applyDeviceClassToSidenavContainer();
    }
  }

  readonly isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map((state) => state.matches),
      distinctUntilChanged()
    ),
    { initialValue: false }
  );

  private applyDeviceClassToSidenavContainer(): void {
    const sidenavContainer = document.querySelector('mat-sidenav-container');
    if (sidenavContainer) {
      if (this.isAndroid) {
        this.renderer.addClass(sidenavContainer, 'android__height');
      }
      if (this.isiPhone) {
        this.renderer.addClass(sidenavContainer, 'iphone__height');
      }
    }
  }

  readonly viewportWidth = toSignal(
  isPlatformBrowser(this.platformId)
    ? fromEvent(window, 'resize').pipe(
        auditTime(100),
        map(() => window.innerWidth),
        startWith(window.innerWidth),
        distinctUntilChanged()
      )
    : of(0),
  { initialValue: 0 }
);
}
