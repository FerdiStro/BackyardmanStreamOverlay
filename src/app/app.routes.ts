import {Routes} from '@angular/router';
import {Overlay} from "./overlay/overlay";
import {Manage} from "./manage/manage";
import {Loop} from "./loop/loop";
import {Logo} from "./logo/logo";
import {Rules} from "./rules/rules";
import {Problems} from "./problems/problems";
import {Camp} from "./camp/camp";
import {Best} from "./best/best";
import {Stillstanding} from "./stillstanding/stillstanding";
import {Interview} from "./interview/interview";
import {VideoPlayback} from "./video-playback/video-playback";
import {CommercialVideo} from "./commercial-video/commercial-video";
import {Swim} from "./swim/swim.component";
import {StartSoon} from "./start-soon/start-soon";
import {Bestlist} from "./bestlist/bestlist";
import {BackyardBanner} from "./backyard-banner/backyard-banner";

export const routes: Routes = [{
    path: 'overlay', component: Overlay,
}, {
    path: 'manage', component: Manage,
}, {
    path: 'loop', component: Loop,
}, {
    path: 'logo', component: Logo,
}, {
    path: 'rules', component: Rules,
}, {
    path: 'camp', component: Camp,
}, {
    path: 'problems', component: Problems,
}, {
    path: 'best', component: Best,
}, {
    path: 'stillStanding', component: Stillstanding,
}, {
    path: 'interview/:startNr', component: Interview
}, {
    path: 'videoPlayBack/:mode', component: VideoPlayback
},
    {
        path: 'videoPlayBack', component: VideoPlayback
    },
    {
        path: 'commercialVideo', component: CommercialVideo
    },

    {
        path: 'commercialVideo/:clipNr', component: CommercialVideo
    },
    {
        path: 'swim', component: Swim
    },
    {
        path: 'startSoon', component: StartSoon
    },
    {
        path: 'bestList', component: Bestlist
    },
    {
        path: 'backyardBanner', component: BackyardBanner
    },


];
