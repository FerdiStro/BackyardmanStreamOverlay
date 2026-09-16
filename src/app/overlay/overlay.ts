import {Component, computed, effect, signal} from '@angular/core';
import {Athlete, mapAthletes, RawAthlete} from "../models/Athlete";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {environment} from "../../environments/environment";

@Component({
    imports: [], selector: 'app-overlay', standalone: true, styleUrl: './overlay.css', templateUrl: './overlay.html',
})
export class Overlay {
    public startNumber: number = environment.startNumber;


    public elapsedTime = signal<string>('00:00:00');
    public raceData = signal<RaceResultData | null>(null);
    public athletes = signal<Athlete[]>([]);
    public loopCount = computed(() => {
        const raw = this.raceData()?.['Loop gestartet'];
        return raw ? parseInt(raw, 10) || 0 : 0;
    });
    private startTimestamp: number = 0;
    private readonly apiRaceDataUri = environment.apiRaceDataUri;
    private readonly apiUrl = environment.apiUrl;

    constructor(private readonly http: HttpClient) {

        timer(0, 1000)
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                this.updateTimer();
            });

        effect(() => {
            const data = this.raceData();
            if (data?.LoopStarted_time) {
                this.initLoopStartTime(data.LoopStarted_time);
            }
        });

        //race data request
        timer(0, 3000)
            .pipe(switchMap(() => this.http.get<RaceResultData[]>(this.apiRaceDataUri)), takeUntilDestroyed())
            .subscribe({
                next: (data) => {
                    if (data && data.length > 0) {
                        this.raceData.set(data[0]);
                    }
                }, error: (err) => console.error('Fehler beim Abrufen der RaceResult API:', err)
            });

        timer(0, 3000)
            .pipe(takeUntilDestroyed(),

                switchMap(() => this.http.get<RawAthlete[]>(this.apiUrl)), map((rawData) => mapAthletes(rawData)))
            .subscribe({
                next: (mappedData) => {
                    this.athletes.set(mappedData);
                }, error: (err) => console.error('Error on loading API:', err)
            });
    }

    private initLoopStartTime(timeStr: string): void {
        const parts = timeStr.split(':').map(Number);
        const hours = parts[0] || 0;
        const minutes = parts[1] || 0;
        const seconds = parts[2] || 0;

        const startDate = new Date();
        startDate.setHours(hours, minutes, seconds, 0);

        // Wenn die angegebene Zeit in der Zukunft liegt, war der Start am Vortag
        if (startDate.getTime() > Date.now()) {
            startDate.setDate(startDate.getDate() - 1);
        }

        this.startTimestamp = startDate.getTime();
        this.updateTimer();
    }

    private updateTimer(): void {
        if (!this.startTimestamp) return;

        const diffSeconds = Math.max(0, Math.floor((Date.now() - this.startTimestamp) / 1000));

        const h = Math.floor(diffSeconds / 3600);
        const m = Math.floor((diffSeconds % 3600) / 60);
        const s = diffSeconds % 60;

        const formattedH = String(h).padStart(2, '0');
        const formattedM = String(m).padStart(2, '0');
        const formattedS = String(s).padStart(2, '0');

        this.elapsedTime.set(`${formattedH}:${formattedM}:${formattedS}`);
    }


}

export interface RaceResultData {
    Platzierung: string;
    'Loop gestartet': string;
    LoopStarted_time: string;
}
