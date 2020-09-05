import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  public get hasIcon(): string {
    return this.icon && this.iconPosition === 'left' ? 'ml-2' : (this.icon && this.iconPosition === 'right' ? 'mr-2' : '');
  }

  public env = environment;

  @Input('href')
  public href: string;

  @Input('target')
  public target: string = '_self';

  @Input('icon')
  public icon: string;

  @Input('icon-position')
  public iconPosition: string = 'left';

  @Output('buttonClick')
  public buttonClick: EventEmitter<any>;

  public onClick(event) {
    this.buttonClick.emit(event);
  }

}
