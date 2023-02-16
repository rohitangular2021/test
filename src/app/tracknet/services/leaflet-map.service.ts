import { Injectable } from "@angular/core";
import { Observable, defer, of, from } from "rxjs";
import {
  tap,
  switchMap,
  map,
  catchError,
  filter,
} from "rxjs/operators";
import { AppService } from "../../app.service";
import { ScriptLoaderService } from "../script-loader.service";
declare let L;

@Injectable({
  providedIn: "root",
})
export class LeafletMapService {
  constructor(
    private scriptLoaderSvc: ScriptLoaderService,
    private appService: AppService
  ) {}

  public mapReady = (mapId: string, options: object = { fullscreenControl: true }): Observable<any> =>
    defer(() => {
      return this.appService.googleKey$.pipe(
        map((v) => {
          try {
            return v.data[0].googleSetting.key;
          } catch (e) {
            return null;
          }
        }),
        switchMap((key) => from(this.scriptLoaderSvc.loadScript(key)).pipe(
          switchMap((v) => of(L.map(mapId, options).setView([20.5937, 78.9629], 4)).pipe(
            tap((leafMap) => {
              var os = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                  id: "mapbox.satellite",
                }
              );
              var roadMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "roadmap",
              });

              if (key) {
                roadMutant.addTo(leafMap);
              } else {
                os.addTo(leafMap);
              }

              var satMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "satellite",
              });

              var terrainMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "terrain",
              });

              var hybridMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "hybrid",
              });

              var styleMutant = L.gridLayer.googleMutant({
                styles: [
                  {
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                  { featureType: "water", stylers: [{ color: "#444444" }] },
                  {
                    featureType: "landscape",
                    stylers: [{ color: "#eeeeee" }],
                  },
                  { featureType: "road", stylers: [{ visibility: "off" }] },
                  { featureType: "poi", stylers: [{ visibility: "off" }] },
                  {
                    featureType: "transit",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "administrative",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "administrative.locality",
                    stylers: [{ visibility: "off" }],
                  },
                ],
                maxZoom: 24,
                type: "roadmap",
              });

              var trafficMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "roadmap",
              });
              trafficMutant.addGoogleLayer("TrafficLayer");

              var transitMutant = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "roadmap",
              });

              transitMutant.addGoogleLayer("TransitLayer");

              L.control
                .layers(
                  {
                    Default: os,
                    Roadmap: roadMutant,
                    Aerial: satMutant,
                    Terrain: terrainMutant,
                    Hybrid: hybridMutant,
                    Styles: styleMutant,
                    Traffic: trafficMutant,
                    Transit: transitMutant,
                  },
                  {},
                  {
                    collapsed: true,
                  }
                )
                .addTo(leafMap);
            })
          )
          ),
          catchError((e) => {
            console.log("error in map load ", e);
            return of(null);
          }),
          filter((e) => e != null)
        )
        )
      );
    }
    
  );
}
