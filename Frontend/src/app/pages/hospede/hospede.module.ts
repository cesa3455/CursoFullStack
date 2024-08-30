import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HospedeService } from 'app/services/hospede.service'; // Import the correct service
import { ThemeModule } from '../../@theme/theme.module';
import { HospedeComponent } from './hospede.component'; // Adjust the component name

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    HospedeComponent, // Adjust the component name
  ],
  providers: [HospedeService], // Adjust the service name
})
export class HospedeModule { } // Adjust the module name
