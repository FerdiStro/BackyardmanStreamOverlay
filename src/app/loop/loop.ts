import { Component, signal, input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  styleUrl: './loop.css',
  templateUrl: './loop.html',
})
export class Loop implements OnInit {
  public loopCount = signal<number>(1);


  public startTime = input<string>('20:21:00');

  public elapsedTime = signal<string>('00:00:00');

  private startTimestamp: number = 0;

  ngOnInit(): void {
    this.initTimer();
  }

  constructor() {
    timer(0, 1000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.updateElapsedTime();
        });
  }

  private initTimer(): void {
    const timeStr = this.startTime();
    const parts = timeStr.split(':').map(Number);

    const hours = parts[0] || 0;
    const minutes = parts[1] || 0;
    const seconds = parts[2] || 0;

    const startDate = new Date();
    startDate.setHours(hours, minutes, seconds, 0);

    if (startDate.getTime() > Date.now()) {
      startDate.setDate(startDate.getDate() - 1);
    }

    this.startTimestamp = startDate.getTime();
  }

  private updateElapsedTime(): void {
    if (!this.startTimestamp) return;

    const now = Date.now();

    let diffSeconds = Math.floor((now - this.startTimestamp) / 1000);

    if (diffSeconds < 0) diffSeconds = 0;

    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;

    const formattedH = String(h).padStart(2, '0');
    const formattedM = String(m).padStart(2, '0');
    const formattedS = String(s).padStart(2, '0');

    this.elapsedTime.set(`${formattedH}:${formattedM}:${formattedS}`);
  }
}