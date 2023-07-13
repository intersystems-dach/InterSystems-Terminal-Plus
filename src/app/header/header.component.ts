import { Component } from '@angular/core';
import { AppearenceService } from '../services/appearence.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private appearenceService: AppearenceService) {}

  getAppearenceService(): AppearenceService {
    return this.appearenceService;
  }
}
