import React, { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
const Map = ({ lat = 18.9885983229874, lang = 72.82971196711472 }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markVisible, setMarkVisible] = useState(false);

  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      //   console.log(lang, lat);
      const apiKey = process.env.REACT_APP_MAP_KEY;

      const ttMap = tt.map({
        key: apiKey,
        container: mapContainer.current,
        center: [lang, lat], // lng, lat
        zoom: 10,
      });

      const ttMarker = new tt.Marker().setLngLat([lang, lat]).addTo(ttMap);

      console.log(ttMap, ttMarker);
      setMap(ttMap);
      setMarker(ttMarker);
    };

    initializeMap();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "215px", height: "68px" }}
      className="rounded-lg  overflow-x-hidden"
    ></div>
  );
};

export default Map;
