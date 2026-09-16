import {Component, computed, OnInit, signal} from '@angular/core';
import {map, switchMap, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Athlete, mapAthletes, RawAthlete, sortStartNr} from "../models/Athlete";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
    imports: [], selector: 'app-stillstanding', styleUrl: './stillstanding.css', templateUrl: './stillstanding.html',
})
export class Stillstanding implements OnInit {
    public startNumber: number = environment.startNumber;

    public animateIn = signal<boolean>(false);
    public isScrolling = signal<boolean>(false);
    public currentIndex = signal<number>(0);
    public athletes = signal<Athlete[]>([]);
    public displayAthletes = computed(() => {
        const list = this.athletes();
        if (list.length === 0) return [];

        const offset = this.currentIndex() % list.length;
        return [...list.slice(offset), ...list.slice(0, offset)];
    });
    private apiUrl = 'https://api.raceresult.com/410433/X2LZ0XLGE3SQNJF1Z2UFS9ACJZBFBV0U';

    constructor(private readonly http: HttpClient) {
        timer(4000, 4000)
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                if (this.athletes().length > 1) {
                    this.isScrolling.set(true);
                    setTimeout(() => {
                        this.isScrolling.set(false);
                        this.currentIndex.update(i => i + 1);
                    }, 600);
                }


            });

        timer(0, 3000)
            .pipe(takeUntilDestroyed(),

                switchMap(() => this.http.get<RawAthlete[]>(this.apiUrl)), map((rawData) =>  mapAthletes(rawData)))
            .subscribe({
                next: (mappedData) => {
                    this.athletes.set(mappedData);
                }, error: (err) => console.error('Fehler beim Laden der API:', err)
            });


    }


    ngOnInit(): void {
        setTimeout(() => {
            this.animateIn.set(true);
        }, 50);


    }

    protected readonly sortStartNr = sortStartNr;
}
