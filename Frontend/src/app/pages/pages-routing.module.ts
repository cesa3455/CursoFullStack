import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { UserComponent } from './user/user.component';
import { HotelComponent } from './hotel/hotel.component';
import { QuartoComponent } from './quarto/quarto.component';
import { HospedeComponent } from './hospede/hospede.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: ReservaComponent,
    },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    // },
    {
      path: 'funcionario',
      component: FuncionarioComponent,
    },
    {
      path: 'quarto',
      component: QuartoComponent,
    },
    {
      path: 'hotel',
      component: HotelComponent,
    },
    // {
    //   path: 'task',
    //   component: TaskComponent,
    // },
    {
      path: 'hospede',
      component: HospedeComponent,
    },
    {
      path: 'reserva',
      component: ReservaComponent,
    },
    // {
    //   path: 'produto',
    //   // component: ProdutoComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
