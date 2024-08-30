import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReservaService } from 'app/services/reserva.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ReservaComponent } from './reserva.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ReservaComponent,
  ],
  providers: [ReservaService],
})
export class ReservaModule { }
