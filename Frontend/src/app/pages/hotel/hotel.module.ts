import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { HotelService } from 'app/services/hotel.service';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { HotelComponent } from './hotel.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    HotelComponent,
  ],
  providers: [HotelService],
})
export class HotelModule { }
