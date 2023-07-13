import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsTerminalPlus';
  reply: string = '';

  onReply(pReply: string) {
    this.reply = pReply;
  }
}
