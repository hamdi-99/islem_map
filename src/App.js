import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import data from './assets/data.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtZGloYXJha2V0aTk5IiwiYSI6ImNrbWNrZmF6NzBibTcydmxqamJ4Y282bGsifQ.fBIztamOU1ulVWk0F19aaw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(9.716);
  const [lat, setLat] = useState(35.283);
  const [zoom, setZoom] = useState(6);
  const markers = useRef(new Array(data.length).fill(null))
  const pop = ({ el }) => {
    return `<h4>${el['port_name']}</h4>`
  }

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/hamdiharaketi99/ckmckiqe138qz17n3fv8olhgx',
        center: [lng, lat],
        zoom: zoom
      });
    }

    markers.current.forEach((marker, i) => {
      if (!markers.current[i]) {
        markers.current[i] = new mapboxgl.Marker({
          color: "#FFFFFF",
          draggable: true
        }).setLngLat([data[i]['longitude'], data[i]['latitude']])
          .setPopup(new mapboxgl.Popup().setHTML(pop({ 'el': data[i] })))
          .addTo(map.current);
      }
    })

    // initialize map only once




  });
  return (
    <div className="App">
      <p>IPA Swixtboard</p>
      <div className="container">
        <div ref={mapContainer} className="map-container" />
      </div>

    </div >
  );
}

export default App;
