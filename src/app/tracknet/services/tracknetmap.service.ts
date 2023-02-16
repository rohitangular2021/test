import { Injectable } from '@angular/core';

declare let L;

@Injectable({
  providedIn: 'root'
})
export class TracknetmapService {

  constructor() { }

  getMarker(center: any, iconUrl: string, map: any) {
    return L.marker([center.latitude, center.longitude], {
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 25],
        iconAnchor: [10, 10],
      }),
    }).addTo(map).bindPopup(`lat:${center.latitude},long:${center.longitude}`)
  }
}
