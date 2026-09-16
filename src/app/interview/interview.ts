import { Component, computed, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { map, switchMap, timer } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Athlete, mapAthletes, RawAthlete } from "../models/Athlete";
import { environment } from "../../environments/environment";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-interview',
    styleUrl: './interview.css',
    templateUrl: './interview.html',
})
export class Interview {

    // URL-Parameter aus der Route /interview/:startNr
    public startNr = input<string>();

    public athletes = signal<Athlete[]>([]);

    public selectedAthlete = computed(() => {
        const routeNr = this.startNr();
        if (!routeNr) return null;

        const targetNr = Number(routeNr);

        // Wandelt a.startNr ebenfalls zu Number um, falls es in den API-Daten als String vorliegt
        return this.athletes().find(a => Number(a.startNr) === targetNr) || null;
    });

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
        effect(() => {
            console.log('Gefundener Athlet:', this.startNr());
        });

        // API Polling
        timer(0, 3000)
            .pipe(
                takeUntilDestroyed(),
                switchMap(() => this.http.get<RawAthlete[]>(this.apiUrl)),
                map((rawData) => mapAthletes(rawData))
            )
            .subscribe({
                next: (mappedData) => {
                    this.athletes.set(mappedData);
                },
                error: (err) => console.error('Error on loading API:', err)
            });
    }
}