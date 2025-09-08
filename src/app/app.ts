import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomSidenav } from './components/custom-sidenav/custom-sidenav';
import { ThemeService } from './services/theme-service';
import { DeviceService } from './services/device-service';
import { Subscription } from 'rxjs';
import { ComponentSwitchService } from './services/component-switch-service';
import { Ftse } from './components/assets/ftse/ftse';
import { Msci } from "./components/assets/msci/msci";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatSlideToggleModule,
    CustomSidenav,
    Ftse,
    Msci
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular Material Darkmode');
  deviceService = inject(DeviceService);
  themeService = inject(ThemeService);
  switcher = inject(ComponentSwitchService);
  collapsed = signal(false);
  isDesktop = signal(true);
  private breakpointSub?: Subscription;

  currentComponent = signal('ftse');
  private subs: Subscription[] = [];

  constructor() {
    effect(() => {
      const mobile = this.deviceService.isMobile();
      if (mobile) {
        this.collapsed.set(true);
        this.isDesktop.set(false);
      } else {
        this.isDesktop.set(true);
      }
    });
  }

  ngOnInit() {
    this.themeService.initTheme();

    this.subs.push(
      this.switcher.changes$.subscribe((name) => {
        this.currentComponent.set(name);
      })
    );
  }

  sidenavWidth = computed(() => (this.collapsed() ? '81px' : '250px'));
  contentMarginLeft = computed(() => {
    if (!this.isDesktop()) {
      return '81px';
    }
    return this.collapsed() ? '81px' : '250px';
  });

  collapseSidenav() {
    this.collapsed.set(true);
  }

  ngOnDestroy() {
    this.breakpointSub?.unsubscribe();
  }
}
