import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  public sidebarItems = [
    {label: 'Home', icon: 'search', url: './home'},
    {label: 'Check-in', icon: 'label', url: './check-in'},
    {label: 'Habitaciones', icon: 'add', url: './rooms'},
    {label: 'Reservas', icon: 'search', url: './reservations'},
  ]

  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser() );

  get User(): User | null {
    return this.authService.currentUser();
  }

  onLogout(){
    this.authService.onLogout()
  }

}
