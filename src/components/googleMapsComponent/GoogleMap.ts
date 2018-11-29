import { Vue } from "../../pages/Admin/baseExporter";
import { Component } from "vue-property-decorator";
@Component({
  template: require('./GoogleMap.html')
})
export class GoogleMap extends Vue {
  center = { lat: 45.508, lng: -73.587 }
  markers = []
  places = []
  currentPlace = null

  mounted() {
    this.geolocate();
  }

  constructor() {
    super()
  }

  // receives a place object via the autocomplete component
  setPlace(place) {
    this.currentPlace = place;
  }
  addMarker() {
    if (this.currentPlace) {
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      }
      this.markers.push({ position: marker });
      this.places.push(this.currentPlace);
      this.center = marker;
      this.currentPlace = null;
    }
  }
  geolocate() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  }
}
