import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Athlete, mapAthletes, RawAthlete } from '../models/Athlete';
import { environment } from '../../environments/environment';

export interface LaneDisplay {
    laneNumber: number;
    startNumbers: number[];
}

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-swim',
    templateUrl: './swim.html',
})
export class Swim {
    public apiAthletes = signal<Athlete[] | null>(null);

    private readonly apiUrl = environment.apiUrl;

    private readonly envLines: Record<string, number[]> = {
        line_1: environment.line_1 || [],
        line_2: environment.line_2 || [],
        line_3: environment.line_3 || [],
        line_4: environment.line_4 || [],
        line_5: environment.line_5 || [],
        line_6: environment.line_6 || [],
    };

    public lanes = computed<LaneDisplay[]>(() => {
        const currentApi = this.apiAthletes();
        const hasData = currentApi !== null && currentApi.length > 0;
        const activeStartNrs = hasData ? new Set(currentApi.map((a) => Number(a.startNr))) : null;

        return [1, 2, 3, 4, 5, 6].map((num) => {
            const defaultList = this.envLines[`line_${num}`] || [];
            const filtered = activeStartNrs ? defaultList.filter((nr) => activeStartNrs.has(nr)) : defaultList;

            return {
                laneNumber: num,
                startNumbers: filtered,
            };
        });
    });

    constructor(private readonly http: HttpClient) {
        timer(0, 3000)
            .pipe(
                takeUntilDestroyed(),
                switchMap(() => this.http.get<RawAthlete[]>(this.apiUrl)),
                map((rawData) => mapAthletes(rawData))
            )
            .subscribe({
                next: (data) => this.apiAthletes.set(data),
                error: () => this.apiAthletes.set(null),
            });
    }
}