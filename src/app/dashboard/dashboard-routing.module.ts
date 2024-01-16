import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { CheckInComponent } from './pages/check-in/check-in.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'check-in', component: CheckInComponent },
      { path: '**', redirectTo: 'home'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
