import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Reserva } from 'app/models/reserva';
import { Hospede } from 'app/models/hospede'; // Importar o modelo de Hospede
import { Quarto } from 'app/models/quarto'; // Importar o modelo de Quarto
import { ReservaService } from 'app/services/reserva.service'; // Importar o serviço correto
import { HospedeService } from 'app/services/hospede.service'; // Importar o serviço de Hospede
import { QuartoService } from 'app/services/quarto.service'; // Importar o serviço de Quarto
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'reserva',
  styleUrls: ['reserva.component.scss'],
  templateUrl: './reserva.component.html',
})
export class ReservaComponent implements OnInit {
  @ViewChild('ng2TbReserva') ng2TbReserva: Ng2SmartTableComponent;
  @ViewChild('dialogReserva') dialogReserva: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbReservaData: Reserva[];
  tbReservaConfig: Object;
  reservaSelected: Reserva;

  optionsHospede: Hospede[]; // Adicionar esta linha
  optionsQuarto: Quarto[]; // Adicionar esta linha

  formReserva = this.formBuilder.group({
    idReserva: [null],
    hospede: [null, Validators.required],
    quarto: [null, Validators.required],
    checkin: [null, Validators.required],
    checkout: [null, Validators.required],
    // Adicionar outros campos conforme necessário
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private reservaService: ReservaService, // Injetar o serviço correto
    private hospedeService: HospedeService, // Injetar o serviço de Hospede
    private quartoService: QuartoService, // Injetar o serviço de Quarto
  ) {}

  ngOnInit(): void {
    this.setConfigTbReserva();
    this.setDataTbReserva();
    this.loadOptions();
  }

  private setConfigTbReserva() {
    this.tbReservaConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhuma reserva cadastrada.',
      columns: {
        hospede: {
          title: 'Hóspede',
          valuePrepareFunction: (hospede: Hospede) => hospede.nome, // Adicionar esta linha
        },
        quarto: {
          title: 'Quarto',
          valuePrepareFunction: (quarto: Quarto) => quarto.numeroQuarto.toString(), // Adicionar esta linha
        },
        checkin: {
          title: 'Check-in',
          type: 'date',
        },
        checkout: {
          title: 'Check-out',
          type: 'date',
        },
        // Adicionar outros campos conforme necessário
      },
    };
  }

  private setDataTbReserva() {
    this.reservaService.list().subscribe((res) => {
      this.tbReservaData = res;
    });
  }

  private loadOptions() {
    this.hospedeService.list().subscribe((res) => {
      this.optionsHospede = res;
    });

    this.quartoService.list().subscribe((res) => {
      this.optionsQuarto = res;
    });
  }

  public openModalReserva(event: Row) {
    this.formReserva.reset();

    if (event) {
      const reserva: Reserva = event.getData();
      this.reservaService.findById(reserva.idReserva).subscribe((res) => {
        this.formReserva.patchValue(res);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogReserva);
  }

  public openModalExclusion(event: Row) {
    this.reservaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.reservaSelected.hospede.nome });
  }

  public btnSave() {
    if (this.formReserva.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addReserva();
    else this.editReserva();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formReserva.get('hospede').markAsTouched();
    this.formReserva.get('quarto').markAsTouched();
    this.formReserva.get('checkin').markAsTouched();
    this.formReserva.get('checkout').markAsTouched();
    // Adicionar outros campos conforme necessário
  }

  private isAdd(): boolean {
    return !this.formReserva.get('idReserva').value;
  }

  private addReserva() {
    const reservaFormValue = this.formReserva.value;
    reservaFormValue.hospede = this.optionsHospede.find((hospede) => hospede.idHospede === reservaFormValue.hospede);
    reservaFormValue.quarto = this.optionsQuarto.find((quarto) => quarto.idQuarto === reservaFormValue.quarto);

    this.reservaService.create(reservaFormValue).subscribe((res) => {
      this.tbReservaData.push(res.body);
      this.ng2TbReserva.source.refresh();
      this.toastrService.success('Reserva criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.setDataTbReserva();
    });
  }

  private editReserva() {
    const reservaFormValue = this.formReserva.value;
    reservaFormValue.hospede = this.optionsHospede.find((hospede) => hospede.idHospede === reservaFormValue.hospede);
    reservaFormValue.quarto = this.optionsQuarto.find((quarto) => quarto.idQuarto === reservaFormValue.quarto);

    this.reservaService.edit(reservaFormValue).subscribe((res) => {
      this.tbReservaData = this.tbReservaData.map((reserva: Reserva) => {
        if (reserva.idReserva === reservaFormValue.idReserva) return reservaFormValue;
        return reserva;
      });
      this.toastrService.success('Reserva editada com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    this.reservaService.delete(this.reservaSelected.idReserva).subscribe((res) => {
      this.tbReservaData = this.tbReservaData.filter(
        (reserva) => reserva.idReserva !== this.reservaSelected.idReserva,
      );
      this.toastrService.success('Reserva excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
