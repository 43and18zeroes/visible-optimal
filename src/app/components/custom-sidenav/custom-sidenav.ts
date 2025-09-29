import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ComponentSwitchService } from '../../services/component-switch-service';

export type MenuItem = {
  label: string;
  component: string;
  imgSrc: string;
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.html',
  styleUrl: './custom-sidenav.scss',
})
export class CustomSidenav {
  switcher = inject(ComponentSwitchService);
  sideNavCollapsed = signal(false);
  srcPath = 'public/';

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  iconMargin = computed(() => (this.sideNavCollapsed() ? '12px' : '16px'));

  active = signal<string>('ftse');

  ngOnInit() {
    this.switcher.changes$.subscribe((name) => this.active.set(name));
  }

  renderComponent(component: string) {
    this.active.set(component);
    this.switcher.switchTo(component);
  }

  menuItems = signal<MenuItem[]>([
    {
      label: 'FTSE',
      component: 'ftse',
      imgSrc: `vanguard.png`,
    },
    {
      label: 'MSCI',
      component: 'msci',
      imgSrc: `ishares.png`,
    },
  ]);

  // menuItems = signal<MenuItem[]>([
  //   {
  //     icon: 'insightsinsights',
  //     label: 'Overview',
  //     component: 'overview',
  //     imgSrc: `overview.png`,
  //   },
  //   {
  //     icon: 'filter_alt',
  //     label: 'FTSE',
  //     component: 'ftse',
  //     imgSrc: `vanguard.png`,
  //   },
  //   {
  //     icon: 'filter_alt',
  //     label: 'MSCI',
  //     component: 'msci',
  //     imgSrc: `ishares.png`,
  //   },
  //   {
  //     icon: 'filter_alt',
  //     label: 'Gold',
  //     component: 'gold',
  //     imgSrc: `bs.png`,
  //   },
  //   {
  //     icon: 'filter_alt',
  //     label: 'Bitwise',
  //     component: 'bitwise',
  //     imgSrc: `bitwise.png`,
  //   },
  //   {
  //     icon: 'filter_alt',
  //     label: '21Shares',
  //     component: 'twenty-one-shares',
  //     imgSrc: `21.jpg`,
  //   },
  // ]);
}
