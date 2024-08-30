import { NbMenuItem } from '@nebular/theme';
import { TaskFilter, TaskFilterEnum } from 'app/models/task';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/dashboard',
  //   // aqui esta
  // },
  {
    title: 'CADASTROS',
    group: true,
  },
  {
    title: 'Funcionario',
    icon: 'person-outline',
    link: '/pages/funcionario',
    home: true,
  },
  {
    title: 'Quarto',
    icon: 'home',
    link: '/pages/quarto',
  },
  {
    title: 'Hotel',
    icon: 'home',
    link: '/pages/hotel',
  },
  {
    title: 'Hospede',
    icon: 'person-outline',
    link: '/pages/hospede',
  },
  {
    title: 'Reserva',
    icon: 'calendar',
    link: '/pages/reserva',
  },
  // {
  //   title: 'Tarefas',
  //   icon: 'checkmark-square-outline',
  //   children: [
  //     new TaskFilter('Minhas', TaskFilterEnum.MY),
  //     new TaskFilter('Em aberto', TaskFilterEnum.OPENED),
  //     new TaskFilter('Finalizadas', TaskFilterEnum.FINISHED),
  //     new TaskFilter('Todas', TaskFilterEnum.ALL),
  //   ],
  // },
  // {
  //   title: 'Produtos',
  //   icon: 'gift-outline',
  //   link: '/pages/produto',
  // },

];
