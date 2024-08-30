import { Hospede } from './hospede';
import { Quarto } from './quarto';

export interface Reserva {
  idReserva?: string;
  hospede: Hospede;
  quarto: Quarto;
  checkin: Date;
  checkout: Date;
}
