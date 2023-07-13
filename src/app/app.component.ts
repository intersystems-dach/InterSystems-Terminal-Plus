import { Component } from '@angular/core';
import { AppearenceService } from './services/appearence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsTerminalPlus';
  reply: any = {
    IsError: false,
    ErrorText: '',
    Prompt: '',
  };

  constructor(private appearenceService: AppearenceService) {}

  onReply(pReply: any) {
    this.reply = pReply;
  }

  getAppearanceService() {
    return this.appearenceService;
  }
}
