import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { AmountComponent } from '../components/amount/amount.component';
import { ImageUploadComponent } from '../components/image-upload/image-upload.component';
import { CurrencyService } from '../services/currency.service';

const MODULES = [
  RouterModule,
  MaterialModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule
];

const COMPONENTS = [
  ButtonComponent,
  AmountComponent,
  ImageUploadComponent
];

const SERVICES = [
  CurrencyService
];

@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES, CommonModule],
  exports: [...MODULES, ...COMPONENTS, ...SERVICES],
  providers: SERVICES
})
export class SharedModule { }
