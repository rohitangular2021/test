import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { observable, Observable, pluck, shareReplay, tap } from 'rxjs';
import { LeafletMapService } from '../../services/leaflet-map.service';
import { TracketService } from '../../services/tracket.service';
import { TracknetmapService } from '../../services/tracknetmap.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})


export class MapComponent implements OnInit {
  leafMap: any = null;
  map$: Observable<any>
  isSpinner:boolean = false
  currentLat:any
  currentLng:any
  currentLocationIconRef: any;
  destLocationIconRef: any;
  markersREf:any = []
  constructor(private leafletMapService: LeafletMapService,private service:TracketService,
    private mapService:TracknetmapService,private http:HttpClient) { }

  ngOnInit(): void {
    this.isSpinner = true
    this.map$ = this.leafletMapService.mapReady("mapId").pipe(
      tap((leafLet) => {
        this.leafMap = leafLet;
      }),
      shareReplay(1)
    );
    this.map$.subscribe((_) => {
      this.isSpinner = false
      this.checkCurrentPosition()
      // this.watchCurrentPosition()
    });   
  }

  checkCurrentPosition(){
    if(!navigator.geolocation){
      alert('gps not supported in your system')
    }
    else{
      navigator.geolocation.getCurrentPosition((position)=>{
       let lat =  position.coords.latitude
       let long =  position.coords.longitude
       let currentLocationIcon  = 'assets/marker_icons/car moving.png'
       this.currentLocationIconRef = this.mapService.getMarker(
        {
          latitude: lat,
          longitude: long,
        },
        currentLocationIcon,
        this.leafMap
      );
      this.markersREf.push(this.currentLocationIconRef)
      },(err)=>{
        console.log(err);      
      })
    }
    
  }


  watchCurrentPosition(){
    navigator.geolocation.watchPosition((position)=>{
      let lat =  position.coords.latitude
      let long =  position.coords.longitude
      let currentLocationIcon  = 'assets/marker_icons/bike moving.png'
      this.destLocationIconRef = this.mapService.getMarker(
       {
         latitude: lat,
         longitude: long,
       },
       currentLocationIcon,
       this.leafMap
     );
     this.markersREf.push(this.destLocationIconRef)
    },err=>{
      console.log(err); 
    },{enableHighAccuracy:true,timeout:5000,maximumAge:0})
  }


}
