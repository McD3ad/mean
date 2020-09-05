import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

import { SharedModule } from './shared/modules/shared.module';
import { MaterialModule } from './shared/modules/material.module';

import { AuthService } from './shared/services/auth.service';
import { TodosService } from './shared/services/todos.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WysiwygComponent } from './shared/components/wysiwyg/wysiwyg.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    WysiwygComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    TodosService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
