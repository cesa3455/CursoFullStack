import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Quarto } from 'app/models/quarto'; // Importe a classe Quarto correta
import { QuartoService } from 'app/services/quarto.service'; // Importe o serviço Quarto correto
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'quarto',
  styleUrls: ['quarto.component.scss'],
  templateUrl: './quarto.component.html',
})
export class QuartoComponent implements OnInit {
  @ViewChild('ng2TbQuarto') ng2TbQuarto: Ng2SmartTableComponent;
  @ViewChild('dialogQuarto') dialogQuarto: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbQuartoData: Quarto[];
  tbQuartoConfig: Object;
  quartoSelected: Quarto;

  formQuarto = this.formBuilder.group({
    idQuarto: [null],
    numeroQuarto: [null, Validators.required],
    tipoQuarto: [null, Validators.required],
    statusQuarto: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private quartoService: QuartoService, // Injete o serviço Quarto correto
  ) {}

  ngOnInit(): void {
    this.setConfigTbQuarto();
    this.setDataTbQuarto();
  }

  private setConfigTbQuarto() {
    this.tbQuartoConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum quarto cadastrado.',
      columns: {
        numeroQuarto: {
          title: 'Número do Quarto',
        },
        tipoQuarto: {
          title: 'Tipo de Quarto',
        },
        statusQuarto: {
          title: 'Status do Quarto',
        },
      },
    };
  }

  private setDataTbQuarto() {
    this.quartoService.list().subscribe((res) => {
      this.tbQuartoData = res;
    });
  }

  public openModalQuarto(event: Row) {
    this.formQuarto.reset();

    if (event) {
      const quarto: Quarto = event.getData();
      this.quartoService.findById(quarto.idQuarto).subscribe((res) => {
        this.formQuarto.patchValue(res);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogQuarto);
  }

  public openModalExclusion(event: Row) {
    this.quartoSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.quartoSelected.numeroQuarto });
  }

  public btnSave() {
    if (this.formQuarto.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addQuarto();
    else this.editQuarto();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formQuarto.get('numeroQuarto').markAsTouched();
    this.formQuarto.get('tipoQuarto').markAsTouched();
    this.formQuarto.get('statusQuarto').markAsTouched();
  }

  private isAdd(): boolean {
    return !this.formQuarto.get('idQuarto').value;
  }

  private addQuarto() {
    this.quartoService.create(this.findFormAdd()).subscribe((res) => {
      this.tbQuartoData.push(res.body);
      this.ng2TbQuarto.source.refresh();
      this.toastrService.success('Quarto criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.setDataTbQuarto();
    });
  }

  private findFormAdd() {
    const quarto = this.formQuarto.value;
    delete quarto.idQuarto;

    return quarto;
  }

  private editQuarto() {
    this.quartoService.edit(this.formQuarto.value).subscribe((res) => {
      this.tbQuartoData = this.tbQuartoData.map((quarto: Quarto) => {
        if (quarto.idQuarto === this.formQuarto.value.idQuarto) return this.formQuarto.value;
        return quarto;
      });
      this.toastrService.success('Quarto editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    this.quartoService.delete(this.quartoSelected.idQuarto).subscribe((res) => {
      this.tbQuartoData = this.tbQuartoData.filter((quarto) => quarto.idQuarto !== this.quartoSelected.idQuarto);
      this.toastrService.success('Quarto excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
