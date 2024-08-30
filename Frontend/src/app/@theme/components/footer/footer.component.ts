import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Criado por <b><a href="https://www.facebook.com/HotelCarneiros/" target="_blank">Hotel Carneiros</a></b>
    </span>
  `,
})
export class FooterComponent {
}
