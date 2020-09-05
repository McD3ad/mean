import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../../services/currency.service'

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit, OnChanges {

  @ViewChild('input', { static: true }) protected input: ElementRef<HTMLDivElement>;

  private value: number;

  constructor() {
    const { ...a } = JSON.parse(JSON.stringify({ name: 'aaa', email: 'email@app.com', password: 'password' }))

    console.log(a);
  }

  public amountChanged({ target }) {
    let value = '';

    target.value = target.value.replace(/\s\,/, '');

    value = (new RegExp(`^(${CurrencyService.current}[1-9])[0-9]*$`)).test(target.value)
      ? target.value
      : (this.value ? CurrencyService.current + this.value : '');

    target.value = value.replace(/[^$\d]/gi, '');

    this.value = target.value ? +target.value.substr(1) : null;
  }

  public ngOnInit(): void {
    console.log(CurrencyService.calc(1, 2));
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
