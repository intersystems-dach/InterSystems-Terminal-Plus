import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply-area',
  templateUrl: './reply-area.component.html',
  styleUrls: ['./reply-area.component.sass'],
})
export class ReplyAreaComponent {
  @Input() text: string = '';

  getHeight() {
    const lines = Math.max(
      this.text.split('\n').length,
      this.text.split('\r').length
    );
    const height = lines * 40;
    if (height < 200) {
      return 200;
    }
    return height;
  }
}
