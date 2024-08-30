import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Hotel } from 'app/models/hotel'; // Certifique-se de importar o modelo correto para Hotel
import { HotelService } from 'app/services/hotel.service'; // Certifique-se de importar o serviço correto para Hotel
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'hotel',
  styleUrls: ['hotel.component.scss'],
  templateUrl: './hotel.component.html',
})
export class HotelComponent implements OnInit {
  @ViewChild('ng2TbHotel') ng2TbHotel: Ng2SmartTableComponent;
  @ViewChild('dialogHotel') dialogHotel: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbHotelData: Hotel[];
  tbHotelConfig: Object;
  hotelSelected: Hotel;

  formHotel = this.formBuilder.group({
    idHotel: [null],
    nome: [null, Validators.required],
    endereco: [null, Validators.required],
    telefone: [null, Validators.required],
    // Adicione outros campos conforme necessário para a classe Hotel
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private hotelService: HotelService, // Certifique-se de injetar o serviço correto para Hotel
  ) {}

  ngOnInit(): void {
    this.setConfigTbHotel();
    this.setDataTbHotel();
  }

  private setConfigTbHotel() {
    this.tbHotelConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum hotel cadastrado.',
      columns: {
        nome: {
          title: 'Nome',
        },
        endereco: {
          title: 'Endereço',
        },
        telefone: {
          title: 'Telefone',
        },
      },
    };
  }

  private setDataTbHotel() {
    this.hotelService.list().subscribe((res) => {
      console.log(res);
      this.tbHotelData = res;
    });
  }

  public openModalHotel(event: Row) {
    this.formHotel.reset();

    if (event) {
      const hotel: Hotel = event.getData();
      this.hotelService.findById(hotel.idHotel).subscribe((res) => {
        this.formHotel.patchValue(res);
        console.log(this.formHotel.value);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogHotel);
  }

  public openModalExclusion(event: Row) {
    this.hotelSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.hotelSelected.nome });
  }

  public btnSave() {
    if (this.formHotel.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addHotel();
    else this.editHotel();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formHotel.get('nome').markAsTouched();
    this.formHotel.get('endereco').markAsTouched();
    this.formHotel.get('telefone').markAsTouched();
    // Adicione outros campos conforme necessário para a classe Hotel
  }

  private isAdd(): boolean {
    return !this.formHotel.get('idHotel').value;
  }

  private addHotel() {
    this.hotelService.create(this.findFormAdd()).subscribe((res) => {
      this.tbHotelData.push(res.body);
      this.ng2TbHotel.source.refresh();
      this.toastrService.success('Hotel criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.setDataTbHotel();
    });
  }

  private findFormAdd() {
    const hotel = this.formHotel.value;
    delete hotel.idHotel;

    return hotel;
  }

  private editHotel() {
    this.hotelService.edit(this.formHotel.value).subscribe((res) => {
      this.tbHotelData = this.tbHotelData.map((hotel: Hotel) => {
        if (hotel.idHotel === this.formHotel.value.idHotel) return this.formHotel.value;
        return hotel;
      });
      this.toastrService.success('Hotel editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    console.log(this.hotelSelected.endereco);
    this.hotelService.delete(this.hotelSelected.idHotel).subscribe((res) => {
      this.tbHotelData = this.tbHotelData.filter(((hotel) => hotel.idHotel !== this.hotelSelected.idHotel));
      this.toastrService.success('Hotel excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
