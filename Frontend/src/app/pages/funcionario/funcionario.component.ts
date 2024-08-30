// funcionario.component.ts

import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Funcionario } from 'app/models/funcionario';
import { FuncionarioService } from 'app/services/funcionario.service'; // Import the correct service
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'funcionario',
  styleUrls: ['funcionario.component.scss'],
  templateUrl: './funcionario.component.html',
})
export class FuncionarioComponent implements OnInit {
  @ViewChild('ng2TbFuncionario') ng2TbFuncionario: Ng2SmartTableComponent;
  @ViewChild('dialogFuncionario') dialogFuncionario: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbFuncionarioData: Funcionario[];
  tbFuncionarioConfig: Object;
  funcionarioSelected: Funcionario;

  formFuncionario = this.formBuilder.group({
    idFuncionario: [null],
    nome: [null, Validators.required],
    cargo: [null, Validators.required],
    // Add other fields as needed
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private funcionarioService: FuncionarioService, // Inject the correct service
  ) {}

  ngOnInit(): void {
    this.setConfigTbFuncionario();
    this.setDataTbFuncionario();
  }

  private setConfigTbFuncionario() {
    this.tbFuncionarioConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum funcionário cadastrado.',
      columns: {
        nome: {
          title: 'Nome',
        },
        cargo: {
          title: 'Cargo',
        },
      },
    };
  }

  private setDataTbFuncionario() {
    this.funcionarioService.list().subscribe((res) => {
      console.log(res);
      this.tbFuncionarioData = res;
    });
  }

  public openModalFuncionario(event: Row) {
    this.formFuncionario.reset();

    if (event) {
      const funcionario: Funcionario = event.getData();
      this.funcionarioService.findById(funcionario.idFuncionario).subscribe((res) => {
        this.formFuncionario.patchValue(res);
        console.log(this.formFuncionario.value);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogFuncionario);
  }

  public openModalExclusion(event: Row) {
    this.funcionarioSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.funcionarioSelected.nome });
  }

  public btnSave() {
    if (this.formFuncionario.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addFuncionario();
    else this.editFuncionario();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formFuncionario.get('nome').markAsTouched();
    this.formFuncionario.get('cargo').markAsTouched();
    // Add other fields as needed
  }

  private isAdd(): boolean {
    return !this.formFuncionario.get('idFuncionario').value;
  }

  private addFuncionario() {
    this.funcionarioService.create(this.findFormAdd()).subscribe((res) => {
      this.tbFuncionarioData.push(res.body);
      this.ng2TbFuncionario.source.refresh();
      this.toastrService.success('Funcionário criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.setDataTbFuncionario();
    });
  }

  private findFormAdd() {
    const funcionario = this.formFuncionario.value;
    delete funcionario.idFuncionario;

    return funcionario;
  }

  private editFuncionario() {
    this.funcionarioService.edit(this.formFuncionario.value).subscribe((res) => {
      this.tbFuncionarioData = this.tbFuncionarioData.map((funcionario: Funcionario) => {
        if (funcionario.idFuncionario === this.formFuncionario.value.idFuncionario) return this.formFuncionario.value;
        return funcionario;
      });
      this.toastrService.success('Funcionário editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    console.log(this.funcionarioSelected.nome);
    this.funcionarioService.delete(this.funcionarioSelected.idFuncionario).subscribe((res) => {
      this.tbFuncionarioData = this.tbFuncionarioData.filter(
        (funcionario) => funcionario.idFuncionario !== this.funcionarioSelected.idFuncionario,
      );
      this.toastrService.success('Funcionário excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
