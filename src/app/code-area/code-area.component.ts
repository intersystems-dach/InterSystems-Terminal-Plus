import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-code-area',
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.sass'],
})
export class CodeAreaComponent {
  loading: boolean = false;
  code: string = 'write "Hello World"';

  @Output() replyEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {
    this.code = this.localStorageService.getCode();
  }

  run() {
    this.localStorageService.setCode(this.code);
    this.loading = true;
    this.apiService.executeCode(this.code).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        this.replyEmitter.emit(data.reply);
      },
      error: (error: Error) => {
        alert(error);
        this.loading = false;
      },
    });
  }

  getHeight() {
    const lines = this.code.split('\n').length;
    const height = lines * 40;
    if (height < 200) {
      return 200;
    }
    return height;
  }
}
