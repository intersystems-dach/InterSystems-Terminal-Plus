import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AppearenceService } from '../services/appearence.service';
import { NamespaceService } from '../services/namespace.service';

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
    private appearenceService: AppearenceService,
    private namespaceService: NamespaceService
  ) {
    this.code = this.localStorageService.getCode();
  }

  handleKeydown(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      let start = event.target.selectionStart;
      let end = event.target.selectionEnd;
      event.target.value =
        event.target.value.substring(0, start) +
        '  ' +
        event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
      //this.data = event.target.value;
    }
  }

  run() {
    this.localStorageService.setCode(this.code);
    this.loading = true;
    this.apiService
      .executeCode(this.code, this.namespaceService.getCurrNamespace())
      .subscribe({
        next: (data: any) => {
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
