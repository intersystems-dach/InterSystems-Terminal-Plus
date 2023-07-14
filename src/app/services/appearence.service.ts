import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppearenceService {
  public isVerticalAlignment = false;
  public isDarkTheme = false;

  constructor(private localStorageService: LocalStorageService) {
    const alignment = localStorageService.getAlignment();
    if (alignment === 'vertical') {
      this.isVerticalAlignment = true;
    }
    this.isDarkTheme = localStorageService.getIsDarkmode();
    this.setTheme();
  }

  toggleAlignment() {
    this.isVerticalAlignment = !this.isVerticalAlignment;
    this.localStorageService.setAlignment(
      this.isVerticalAlignment ? 'vertical' : 'horizontal'
    );
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.localStorageService.setIsDarkmode(this.isDarkTheme);
    this.setTheme();
  }

  setTheme() {
    if (this.isDarkTheme) {
      this.darkMode();
    } else {
      this.lightMode();
    }
  }

  darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
