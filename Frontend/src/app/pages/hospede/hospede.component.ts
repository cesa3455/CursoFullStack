import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Hospede } from 'app/models/hospede'; // Import the correct model
import { HospedeService } from 'app/services/hospede.service'; // Import the correct service
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'hospede',
  styleUrls: ['hospede.component.scss'],
  templateUrl: './hospede.component.html',
})
export class HospedeComponent implements OnInit {
  @ViewChild('ng2TbHospede') ng2TbHospede: Ng2SmartTableComponent;
  @ViewChild('dialogHospede') dialogHospede: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbHospedeData: Hospede[];
  tbHospedeConfig: Object;
  hospedeSelected: Hospede;

  formHospede = this.formBuilder.group({
    idHospede: [null],
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    telefone: [null, Validators.required],
    // Add other fields as needed
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private hospedeService: HospedeService, // Inject the correct service
  ) {}

  ngOnInit(): void {
    this.setConfigTbHospede();
    this.setDataTbHospede();
  }

  private setConfigTbHospede() {
    this.tbHospedeConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum hóspede cadastrado.',
      columns: {
        nome: {
          title: 'Nome',
        },
        email: {
          title: 'E-mail',
        },
        telefone: {
          title: 'Telefone',
        },
      },
    };
  }

  private setDataTbHospede() {
    this.hospedeService.list().subscribe((res) => {
      console.log(res);
      this.tbHospedeData = res;
    });
  }

  public openModalHospede(event: Row) {
    this.formHospede.reset();

    if (event) {
      const hospede: Hospede = event.getData();
      this.hospedeService.findById(hospede.idHospede).subscribe((res) => {
        this.formHospede.patchValue(res);
        console.log(this.formHospede.value);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogHospede);
  }

  public openModalExclusion(event: Row) {
    this.hospedeSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.hospedeSelected.nome });
  }

  public btnSave() {
    if (this.formHospede.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addHospede();
    else this.editHospede();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formHospede.get('nome').markAsTouched();
    this.formHospede.get('email').markAsTouched();
    this.formHospede.get('telefone').markAsTouched();
    // Add other fields as needed
  }

  private isAdd(): boolean {
    return !this.formHospede.get('idHospede').value;
  }

  private addHospede() {
    this.hospedeService.create(this.findFormAdd()).subscribe((res) => {
      this.tbHospedeData.push(res.body);
      this.ng2TbHospede.source.refresh();
      this.toastrService.success('Hóspede criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.setDataTbHospede();
    });
  }

  private findFormAdd() {
    const hospede = this.formHospede.value;
    delete hospede.idHospede;

    return hospede;
  }

  private editHospede() {
    this.hospedeService.edit(this.formHospede.value).subscribe((res) => {
      this.tbHospedeData = this.tbHospedeData.map((hospede: Hospede) => {
        if (hospede.idHospede === this.formHospede.value.idHospede) return this.formHospede.value;
        return hospede;
      });
      this.toastrService.success('Hóspede editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    console.log(this.hospedeSelected.nome);
    this.hospedeService.delete(this.hospedeSelected.idHospede).subscribe((res) => {
      this.tbHospedeData = this.tbHospedeData.filter(
        (hospede) => hospede.idHospede !== this.hospedeSelected.idHospede,
      );
      this.toastrService.success('Hóspede excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
