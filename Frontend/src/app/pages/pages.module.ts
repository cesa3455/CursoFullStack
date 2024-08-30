import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { TaskModule } from './task/task.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { HotelModule } from './hotel/hotel.module';
import { QuartoComponent } from './quarto/quarto.component';
import { QuartoModule } from './quarto/quarto.module';
import { HospedeComponent } from './hospede/hospede.component';
import { HospedeModule } from './hospede/hospede.module';
import { ReservaModule } from './reserva/reserva.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    HotelModule,
    TaskModule,
    FuncionarioModule,
    QuartoModule,
    HospedeModule,
    ReservaModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
