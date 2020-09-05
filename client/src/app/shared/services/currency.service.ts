import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyService {

  public static current: string = '$';

  public getCurrent() {
    return CurrencyService.current;
  }

  public static calc(a: number, b: number): string {
    return CurrencyService.current + (a + b);
  }

}
