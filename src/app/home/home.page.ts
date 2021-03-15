import { Component, OnDestroy, AfterViewInit , OnInit, ViewChild , ViewChildren} from '@angular/core';
import { Howl } from 'howler';
import {IonRange, Platform , IonRouterOutlet, AlertController} from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { NewsRss } from 'src/app/news-rss';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
  radio: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  audio: any;

   playlist: Track[] = [
      {
        name: 'Chimes Radio',
        path: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHIMESRADIO_S01.mp3',
        radio: true,
      },
    {
      name: 'Beej Kahan Hai',
      // tslint:disable-next-line:max-line-length
      // path: 'https://chtbl.com/track/G62156/traffic.omny.fm/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/7ca6bfe5-f3e5-48d0-9ec9-ac7900823408/7612de23-6ba2-40f3-8692-acda0084b8fa/audio.mp3?utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3'
      // tslint:disable-next-line:max-line-length
      path: 'https://21393.mc.tritondigital.com/OMNY_AKBARBIRBALSTORIESHINDIMORALTALES_P/media-session/b339381a-8795-482e-b8cd-46952787e1c0/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/7ca6bfe5-f3e5-48d0-9ec9-ac7900823408/7612de23-6ba2-40f3-8692-acda0084b8fa/audio/direct/t1614255508/Beej_Kahan_Hai.mp3?t=1614255508&utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3',
      radio: false,
    },
    {
      name: 'Bhoomi Daku De Vaade',
      // tslint:disable-next-line:max-line-length
      path: 'https://21393.mc.tritondigital.com/OMNY_PUNJABISAKHISFORKIDS_P/media-session/a69f31fc-3a2a-4e52-adc8-603bed33d966/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/d768dee5-b31c-4e2b-a330-acd901209403/445e2bc1-6517-4ffe-ae19-acd90124807e/audio/direct/t1614188845/Bhoomi_Daku_De_Vaade.mp3?t=1614188845&utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3',
      radio: false,
    },
    {
      name: 'Rama Avatara',
      // tslint:disable-next-line:max-line-length
      path: 'https://21393.mc.tritondigital.com/OMNY_INDIANEPICSANDPURANASSTORIESFORKIDS_P/media-session/3f712f6a-aca1-4688-a628-b21f152315aa/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/2fe1a183-6745-4c9f-b4b6-ac79008236a4/2ec89d5b-29fd-462c-917e-acc7008c7832/audio/direct/t1614240858/Rama_Avatara.mp3?t=1614240858&utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3',
      radio: false,
    },
    {
      name: 'The Three Idols (तीन मूर्तियां)',
      // tslint:disable-next-line:max-line-length
      path: 'https://21393.mc.tritondigital.com/OMNY_AKBARBIRBALSTORIESHINDIMORALTALES_P/media-session/7735b80f-c6af-4173-b70a-564eac82294f/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/7ca6bfe5-f3e5-48d0-9ec9-ac7900823408/41846a37-b1f2-4f28-90a8-acc301305fc2/audio/direct/t1612290601/The_Three_Idols_(_).mp3?t=1612290601&utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3',
      radio: false,
    },
    {
      name: 'The Ugly Duckling',
      // tslint:disable-next-line:max-line-length
      path: 'https://21393.mc.tritondigital.com/OMNY_CLASSICENGLISHSTORIESFORKIDS_P/media-session/9d078628-9f8d-46cf-bfd8-37432babba86/d/clips/11768d44-b0a8-487d-8e8b-ac790033e153/cf5b68b4-0dd8-42e1-a728-ac790082331c/bf9326ce-8ea0-4c0d-a445-acc300cb3b02/audio/direct/t1612268783/The_Ugly_Duckling.mp3?t=1612268783&utm_source=Podcast&in_playlist=01a98998-6939-4536-95ee-ac990081a8dc.mp3',
      radio: false,
    }
  ];

   activeTrack: Track = null;
   player: Howl = null;
   backButtonSubscription;
   isPlaying = false;
   progress = 0;
   matches : any;
   RssData: NewsRss;
   @ViewChild('range', {static: false}) range: IonRange;

  // tslint:disable-next-line:max-line-length
  constructor( private http: HttpClient, public platform: Platform , public iab : InAppBrowser , public loadingController: LoadingController, private router: Router, private location: Location ,     public alertController: AlertController  , public speechRecognition : SpeechRecognition   )  {
  }

  ngAfterViewInit() {
    // this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    //   navigator['app'].exitApp();
    // });
  }


  ngOnInit() {
    this.audio = new Audio();
    this.playlist.forEach(element => {
      this.audio.src = element.path;
      this.audio.load();
      this.GetRssFeedData();
    });
  }

   ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  GetRssFeedData() {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http
      // tslint:disable-next-line:max-line-length
      .get<any>('https://www.omnycontent.com/d/playlist/11768d44-b0a8-487d-8e8b-ac790033e153/4b149261-d04c-4666-99f4-ac9600ba6e42/01a98998-6939-4536-95ee-ac990081a8dc/podcast.rss', requestOptions)
      .subscribe(data => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          console.log(this.RssData);
        });
      });
  }

  start(track: Track) {
      // alert('1');
    if (this.isPlaying) {
        this.audio.pause();
    }

    this.audio.src = track.path;
    this.audio.load();
    this.activeTrack = track;
    this.audio.play();
    this.isPlaying = true;
    this.presentLoadingWithOptions();
  }

  togglePlayer(pause) {
      this.isPlaying = !pause;
      if (pause) {
          this.audio.pause();
          // alert('playback paused');
         //  this.player.pause();
      } else {
          // alert('playback resumed');
          this.audio.play();
      }
  }

  next() {
      // alert('next track');
      const index = this.playlist.indexOf(this.activeTrack);
      if (index !== this.playlist.length - 1) {
          this.start(this.playlist[index + 1]);
      } else {
          this.start(this.playlist[0]);
      }
  }

  prev() {
      // alert('previous track');
      const index = this.playlist.indexOf(this.activeTrack);
      if (index > 0) {
          this.start(this.playlist[index - 1]);
      } else {
          this.start(this.playlist[this.playlist.length - 1]);
      }
  }

  seek() {
    // const newValue = + this.range.value;
    // const duration = this.player.duration();
    // this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
      // const seek = this.player.seek();
      // this.progress = (seek / this.player.duration()) * 100 || 0;
      // setTimeout(() => {
      //     this.updateProgress();
      // }, 1000);
  }

  checkPermission() {
    this.speechRecognition.hasPermission().then((permission)=>{
      if(permission){
       alert('Already has permission for speech recognition');
      } else{
        alert('Not permission yet')
      }
   
    }, (err)=>{
     alert(JSON.stringify(err))
    })
   
     }
   
     requestPermission(){
       
       this.speechRecognition.requestPermission().then((data)=>{
   
         alert(JSON.stringify(data))
   
       }, (err)=>{
         alert(JSON.stringify(err))
       })
   
     }

     startListening(){
      this.speechRecognition.startListening().subscribe((speeches)=>{
        this.matches= speeches;
      },(err)=>{
        alert(JSON.stringify(err))
      })
      
        }

        stopListening(){
          this.speechRecognition.stopListening()
      
        }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 2000,
      message: 'Loading audio...',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
}

  openBrowser(link) {
    this.platform.ready().then( () => {

    const browser = this.iab.create(link, '_blank', { location: 'yes' });

    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: 'body{color: red;' });
    });
    browser.close();
  }
  )}

}
