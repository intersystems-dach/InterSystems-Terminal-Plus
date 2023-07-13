import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AppearenceService } from '../services/appearence.service';

@Component({
  selector: 'app-code-area',
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.sass'],
})
export class CodeAreaComponent {
  loading: boolean = false;
  code: string = 'write "Hello World"';

  @Output() replyEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private appearenceService: AppearenceService
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
        this.replyEmitter.emit(data);
      },
      error: (error: Error) => {
        alert(error);
        this.loading = false;
      },
    });
  }

  getWidth() {
    if (!this.appearenceService.isVerticalAlignment) {
      return window.innerWidth * 0.8;
    }
    return window.innerWidth * 0.4;
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
