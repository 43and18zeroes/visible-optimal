import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ComponentSwitchService } from '../../services/component-switch-service';

export type MenuItem = {
  icon: string;
  label: string;
  component: string;
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

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  iconMargin = computed(() => (this.sideNavCollapsed() ? '12px' : '16px'));

  renderComponent(component: string) {
    this.switcher.switchTo(component);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'insightsinsights',
      label: 'Overview',
      component: 'overview',
    },
    {
      icon: 'filter_alt',
      label: 'FTSE',
      component: 'ftse',
    },
    {
      icon: 'filter_alt',
      label: 'MSCI',
      component: 'msci',
    },
  ]);
}
