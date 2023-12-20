import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CodeAreaComponent } from './code-area/code-area.component';
import { HttpClientModule } from '@angular/common/http';
import { ReplyAreaComponent } from './reply-area/reply-area.component';
import { ConnectionBarComponent } from './connection-bar/connection-bar.component';
import { DarkmodeSwitchComponent } from './darkmode-switch/darkmode-switch.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CodeAreaComponent,
    ReplyAreaComponent,
    ConnectionBarComponent,
    DarkmodeSwitchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
