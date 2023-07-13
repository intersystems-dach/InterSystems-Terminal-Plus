import { Component, Input } from '@angular/core';
import { AppearenceService } from '../services/appearence.service';

@Component({
  selector: 'app-reply-area',
  templateUrl: './reply-area.component.html',
  styleUrls: ['./reply-area.component.sass'],
})
export class ReplyAreaComponent {
  @Input() reply: any = {
    IsError: false,
    ErrorText: '',
    Prompt: '',
  };

  constructor(private appearenceService: AppearenceService) {}

  getText() {
    if (this.reply.IsError) {
      return this.reply.ErrorText;
    }
    return this.reply.Prompt;
  }

  getWidth() {
    if (!this.appearenceService.isVerticalAlignment) {
      return window.innerWidth * 0.8;
    }
    return window.innerWidth * 0.4;
  }

  getHeight() {
    console.log(this.reply);
    const text = this.getText();
    console.log(text);
    const lines = Math.max(text.split('\n').length, text.split('\r').length);
    const height = lines * 40;
    if (height < 200) {
      return 200;
    }
    return height;
  }
}
