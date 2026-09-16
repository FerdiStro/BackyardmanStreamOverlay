import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-video-playback',
  styleUrl: './video-playback.css',
  templateUrl: './video-playback.html',
})
export class VideoPlayback {
  public mode = input<string>();

  public isPortrait = computed(() => {
    const m = this.mode()?.toLowerCase()?.trim();
    if (!m) return false;
    return m === 'vertical';
  });
}