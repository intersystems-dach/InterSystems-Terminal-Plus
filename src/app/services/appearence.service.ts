import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppearenceService {
  public isVerticalAlignment = false;

  constructor(private localStorageService: LocalStorageService) {
    const alignment = localStorageService.getAlignment();
    if (alignment === 'vertical') {
      this.isVerticalAlignment = true;
    }
  }

  toggleAlignment() {
    this.isVerticalAlignment = !this.isVerticalAlignment;
    this.localStorageService.setAlignment(
      this.isVerticalAlignment ? 'vertical' : 'horizontal'
    );
  }
}
