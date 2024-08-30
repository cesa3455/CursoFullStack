import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QuartoService } from 'app/services/quarto.service'; // Importe o serviço Quarto correto
import { ThemeModule } from '../../@theme/theme.module';
import { QuartoComponent } from './quarto.component'; // Importe o componente Quarto correto

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    QuartoComponent,
  ],
  providers: [QuartoService], // Forneça o serviço Quarto correto
})
export class QuartoModule { }
