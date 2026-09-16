import {computed} from "@angular/core";

export interface Athlete {
    startNr: number;
    name: string;
    flagUrl: string;
    loop: string,
    totalTime: string;
    rank: string;
}

export interface RawAthlete {
    'Startnr.': number;
    Name: string;
    Nation: string;
    Loop: string;
    'Total time': string;
    Platzierung: string;
}


export function  sortStartNr(athletesList: any[]): any[] {
    if (!athletesList || athletesList.length === 0) {
        return [];
    }

    return [...athletesList].sort((a, b) => {
        const nrA = Number(a?.startNr) || 0;
        const nrB = Number(b?.startNr) || 0;

        return nrA - nrB;
    });
}

export function mapAthletes(rawData: RawAthlete[]): Athlete[] {
    return rawData.map((raw) => {

        const flagMatch = raw.Nation.match(/\[img:(.*?)\]/);
        const flagPath = flagMatch ? flagMatch[1] : '';

        const fullFlagUrl = flagPath ? `https://my.raceresult.com${flagPath}` : '';

        return {
            startNr: raw['Startnr.'],
            name: raw.Name.replace(",", ""),
            flagUrl: fullFlagUrl,
            loop: raw.Loop,
            totalTime: raw['Total time'],
            rank: raw.Platzierung,
        };
    });
}