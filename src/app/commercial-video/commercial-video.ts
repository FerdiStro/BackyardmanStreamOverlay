import { Component, input, computed, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-commercial-video',
  styleUrl: './commercial-video.css',
  templateUrl: './commercial-video.html',
})
export class CommercialVideo implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  public clipNr = input<string>();

  public commercialVideos: string[] = [
    'commercialVideos/Rocktherace.mp4',
    'commercialVideos/Traithlon.mp4',
    'commercialVideos/vid1.mp4',
    'commercialVideos/vid2.mp4',
  ];

  public animateIn = signal<boolean>(false);

  public activeClipIndex = computed(() => {
    const rawNr = Number(this.clipNr());
    if (isNaN(rawNr) || rawNr < 1) return 0;
    return rawNr - 1;
  });

  public activeVideoPath = computed(() => {
    const idx = this.activeClipIndex();
    return this.commercialVideos[idx] || null;
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateIn.set(true);
      this.playVideoWithAudio();
    }, 150);
  }

  private playVideoWithAudio(): void {
    if (this.videoPlayer?.nativeElement) {
      const video = this.videoPlayer.nativeElement;

      video.muted = false; // Ton explizit aktivieren
      video.volume = 1.0;
      video.currentTime = 0;

      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn('Autoplay mit Ton vom Browser blockiert. In OBS funktioniert es direkt:', err);
        });
      }
    }
  }
}