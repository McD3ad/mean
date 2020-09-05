import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GraphDirective } from 'src/app/shared/model/graph.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends GraphDirective {

  constructor(
    public authService: AuthService
  ) {
    super();
  }

}
