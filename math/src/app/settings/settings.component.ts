import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Settings {
  infiniteMode: boolean;
  roundCount: number;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  infiniteMode = false;
  roundCount = 10;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    const saved = localStorage.getItem('mathSettings');
    if (saved) {
      const settings: Settings = JSON.parse(saved);
      this.infiniteMode = settings.infiniteMode;
      this.roundCount = settings.roundCount;
    }
  }

  saveSettings() {
    const settings: Settings = {
      infiniteMode: this.infiniteMode,
      roundCount: this.roundCount
    };
    localStorage.setItem('mathSettings', JSON.stringify(settings));
    
    // Trigger session reset by emitting a storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'mathSettings',
      newValue: JSON.stringify(settings)
    }));
    
    // Navigate to multiplication page
    this.router.navigate(['/multiplication']);
  }
}
