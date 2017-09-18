import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private dirService: DirectionsService = new google.maps.DirectionsService;
  private dirDisplay: DirectionsRenderer = new google.maps.DirectionsRenderer;
  private dirRequest: DirectionsRequest = new google.maps.DirectionsRequest;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MapPage');
  }
  
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 11,
      center: {lat: 37.7831413, lng: -122.4029678}
    });
    this.dirDisplay.setMap(this.map);
  }
  
  addWp() {
    wps: any = dirRequest.waypoints;
    @ViewChild('place') place: Checkbox; 
    if (!place.checked && !place.disabled) {
    wps.push({
      location: place.value,
      stopover: true
    });
    } else if (!place.disabled) {
      wps.splice(wps.findIndex((e) => e.location === place.value), 1);
    }
    dirRequest.waypoints = wps;
    dirService.route(dirRequest, (res, stat) => {
      if (stat === 'OK') {
        dirDisplay.setDirections(res);
        private route: DirectionsRoute = res.routes[0];
        private totalSec: Number;
        for (let i = 0; i < route.legs.length; i++) {
          totalSec += route.legs[i].duration.value;
        }
        
      }
    });
  }
}
