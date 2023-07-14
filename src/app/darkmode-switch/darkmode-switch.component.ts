import { Component } from '@angular/core';
import { AppearenceService } from '../services/appearence.service';

@Component({
  selector: 'app-darkmode-switch',
  templateUrl: './darkmode-switch.component.html',
  styleUrls: ['./darkmode-switch.component.sass'],
})
export class DarkmodeSwitchComponent {
  isDarkmode = true;

  constructor(private appearenceService: AppearenceService) {
    this.isDarkmode = this.appearenceService.isDarkTheme;
  }

  onChange(): void {
    console.log(this.isDarkmode);
    this.appearenceService.toggleTheme();
  }
}
