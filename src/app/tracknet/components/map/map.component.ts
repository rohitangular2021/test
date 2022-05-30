import { Component, OnInit } from '@angular/core';
import { observable, Observable, pluck, shareReplay, tap } from 'rxjs';
import { LeafletMapService } from '../../services/leaflet-map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  leafMap: any = null;
  map$: Observable<any>
  isSpinner:boolean = false
  constructor(private leafletMapService: LeafletMapService,) { }

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
    });
 
    
    
  }

  


}
