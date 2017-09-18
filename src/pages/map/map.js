"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var MapPage = (function () {
    function MapPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dirService = new google.maps.DirectionsService;
        this.dirDisplay = new google.maps.DirectionsRenderer;
        this.dirRequest = new google.maps.DirectionsRequest;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.initMap();
        console.log('ionViewDidLoad MapPage');
    };
    MapPage.prototype.initMap = function () {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 11,
            center: { lat: 37.7831413, lng: -122.4029678 }
        });
        this.dirDisplay.setMap(this.map);
    };
    MapPage.prototype.addWp = function () {
        wps: any = dirRequest.waypoints;
        place: Checkbox;
        if (!place.checked && !place.disabled) {
            wps.push({
                location: place.value,
                stopover: true
            });
        }
        else if (!place.disabled) {
            wps.splice(wps.findIndex(function (e) { return e.location === place.value; }), 1);
        }
        dirRequest.waypoints = wps;
        dirService.route(dirRequest, function (res, stat) {
            if (stat === 'OK') {
                dirDisplay.setDirections(res);
            }
        }, private, route, DirectionsRoute = res.routes[0]);
    };
    MapPage.prototype.for = function (let, i, i) {
        if (let === void 0) { let = i = 0; }
        if (i === void 0) { i = ; }
        if (i === void 0) { i = ++; }
        totalSec += route.legs[i].duration.value;
    };
    __decorate([
        core_1.ViewChild('map')
    ], MapPage.prototype, "mapElement");
    MapPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-map',
            templateUrl: 'map.html'
        })
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
;
