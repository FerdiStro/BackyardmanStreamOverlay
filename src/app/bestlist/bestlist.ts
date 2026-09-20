import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var RRPublish: any;

@Component({
  imports: [],
  selector: 'app-bestlist',
  styleUrl: './bestlist.css',
  templateUrl: './bestlist.html',
  standalone: true,
})
export class Bestlist implements OnInit {
  @ViewChild('rrContainer', { static: true }) rrContainer!: ElementRef;

  ngOnInit(): void {
    this.loadRaceResultScript();
  }

  private loadRaceResultScript(): void {
    // Prüfen, ob das Script bereits im DOM ist
    if (!document.getElementById('rr-publish-script')) {
      const script = document.createElement('script');
      script.id = 'rr-publish-script';
      script.src = 'https://my.raceresult.com/RRPublish/load.js.php?lang=de';
      script.type = 'text/javascript';
      script.onload = () => this.initRaceResult();
      document.body.appendChild(script);
    } else {
      this.initRaceResult();
    }
  }

  private initRaceResult(): void {
    if (typeof RRPublish !== 'undefined' && this.rrContainer) {
      // (Container-Element, Event-ID, Ansicht)
      const rrp = new RRPublish(this.rrContainer.nativeElement, 410433, 'results');
      rrp.ShowTimerLogo = false;
      rrp.ShowInfoText = false;
    }
  }
}