import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, concat, from } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

declare var Compressor
@Injectable({
  providedIn: "root",
})
export class ScriptLoaderService {
  dynamiclinks = [
    "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css",
    "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css",
    "https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css",
    "https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css",
  ];
  dynamicScripts = [
    //neew from index.html
    "https://unpkg.com/leaflet@1.6.0/dist/leaflet.js",
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQmxZajncBdPsgaOZhrmf-AUuqPFn73JI",
    "https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js",
    "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js",
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet-editable/1.2.0/Leaflet.Editable.js",
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js",
    //  Existing
    "https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js",
    "https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js",
    
  ];

  constructor(public http: HttpClient) {

  }

  public async loadScript(key: string=null) {
    var p =[]    
    if(key){
      this.dynamicScripts[1]=`https://maps.googleapis.com/maps/api/js?key=${key}`
    }   

    for (var i = 0; i < this.dynamiclinks.length; i++) {
      p.push(this.loadStyleSrc(this.dynamiclinks[i]).toPromise())
    }
    Promise.all(p)

    //loading script in sequence
    for (var i = 0; i < this.dynamicScripts.length; i++) {
      await this.loadScripSrc(this.dynamicScripts[i]).toPromise()
    }

  }


  loadedSrc$ : Record<string , Observable<any>> ={};
  public loadScripSrc(scriptSrc : string): Observable<any>{  
    if(!this.loadedSrc$[scriptSrc]){
      this.loadedSrc$[scriptSrc] =   from(new Promise((resolve, reject) => {
        const scriptElement = window.document.createElement('script');
        scriptElement.src = scriptSrc;
  
        window.document.body.appendChild(scriptElement);
        scriptElement.onload = () => {
          resolve(null)
        };
  
        scriptElement.onerror = () => {
          reject()
        };
  
      })).pipe(shareReplay(1));
    }
    return this.loadedSrc$[scriptSrc]
  }

  public loadStyleSrc(scriptSrc : string): Observable<any>{
    if(!this.loadedSrc$[scriptSrc]){
      this.loadedSrc$[scriptSrc] =   from(new Promise((resolve, reject) => {
        const styleElement = window.document.createElement('link');
        styleElement.href = scriptSrc;
        styleElement.rel = "stylesheet";

        window.document.body.appendChild(styleElement);
        styleElement.onload = () => {
          resolve(null)
        };
  
        styleElement.onerror = () => {
          reject("could not load scrip")
        };

      })).pipe(shareReplay(1));
    }
    return this.loadedSrc$[scriptSrc];
  }


  compressImage(file) {
    return this.loadCompressor().then(_ => {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          conversize:25000,// 250 kb
          success: (result) => {
            resolve(result)
          }
        })
      })
    }) 
  }

  compressorLoaded = false;

  loadCompressor(): Promise<void> {
  
    if (!this.compressorLoaded) {
      this.compressorLoaded = true;
      return new Promise((resolve, reject) => {
        const scriptElement = window.document.createElement('script');
        scriptElement.src = 'assets/scripts/imagecompress.min.js';
        scriptElement.onload = () => {
          resolve();
        };

        scriptElement.onerror = () => {
          reject();
        };

        window.document.body.appendChild(scriptElement);
      });

    } else {
      return Promise.resolve()
    }
  }


}
