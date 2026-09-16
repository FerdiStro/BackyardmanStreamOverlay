import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'app-logo',
    styleUrl: './logo.css',
    templateUrl: './logo.html',
})
export class Logo implements OnInit, OnDestroy {
    public logos: string[] = [
        // 'Logos/logo_1.png',
        'Logos/sponsor_1.png',
        'Logos/sponsor_2.png',
        'Logos/sponsor_3.png',
        'Logos/sponsor_4.png',
    ];

    public currentIndex = signal<number>(0);
    public isVisible = signal<boolean>(true);

    private timerId: any;

    ngOnInit(): void {
        this.scheduleNextSwitch();
    }

    ngOnDestroy(): void {
        if (this.timerId) clearTimeout(this.timerId);
    }

    private scheduleNextSwitch(): void {
        const baseDuration = 5000;
        const extraDuration = this.currentIndex() === 0 ? 15000 : 0;
        const currentDisplayTime = baseDuration + extraDuration;

        this.timerId = setTimeout(() => {
            this.isVisible.set(false);

            setTimeout(() => {
                this.currentIndex.update((prev) => (prev + 1) % this.logos.length);
                this.isVisible.set(true);
                this.scheduleNextSwitch();
            }, 1000);
        }, currentDisplayTime);
    }
}