import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FuncionarioService } from 'app/services/funcionario.service';
import { ThemeModule } from '../../@theme/theme.module';
import { FuncionarioComponent } from './funcionario.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    FuncionarioComponent,
  ],
  providers: [FuncionarioService],

})
export class FuncionarioModule { }
