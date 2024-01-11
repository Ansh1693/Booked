import React, { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import ttSearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";

const Maps = ({
  location = { lat: 18.9885983229874, lang: 72.82971196711472 },
  singleHotel,
  setLocation,
  edit = false,
  height = "200px",
  width = "100%",
}) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markVisible, setMarkVisible] = useState(false);
  const [action, setAction] = useState("");

  const mapContainer = useRef(null);

  const startTimeout = (duration, setState, message) => {
    setState(message);

    setTimeout(() => {
      setState("");
    }, duration);
  };

  useEffect(() => {
    const initializeMap = async () => {
      //   console.log(lang, lat);
      const apiKey = process.env.REACT_APP_MAP_KEY;

      const ttMap = tt.map({
        key: apiKey,
        container: mapContainer.current,
        center: [location.lang, location.lat], // lng, lat
        zoom: 10,
      });

      //   console.log(ttServices.services, ttMap);

      if (edit) {
        const searchBox = new ttSearchBox(ttServices.services, {
          idleTimePress: 100,
          minNumberOfCharacters: 0,
          searchOptions: {
            key: apiKey,
            language: "en-GB",
          },
          autocompleteOptions: {
            key: apiKey,
            language: "en-GB",
          },
          labels: {
            noResultsMessage: "No results found.",
          },
        });
        searchBox.on("tomtom.searchbox.resultselected", (event) => {
          console.log(event);
          const { result } = event.data;

          ttMarker.setLngLat([result.position.lng, result.position.lat]);

          ttMap.flyTo({
            center: [result.position.lng, result.position.lat],
            zoom: 10,
          });
        });
        ttMap.addControl(searchBox, "top-left");
        ttMap.on("click", (e) => {
          const { lng, lat } = e.lngLat;
          ttMarker.setLngLat([lng, lat]);
        });
      }
      const ttMarker = new tt.Marker({ draggable: edit })
        .setLngLat([location.lang, location.lat])
        .addTo(ttMap);

      setMap(ttMap);
      setMarker(ttMarker);
    };
    if (location?.lang && location?.lat) {
      initializeMap();
    }
  }, [location?.lang, location?.lat]);

  const getMarkerLocation = () => {
    if (marker) {
      const markerLocation = marker.getLngLat();
      console.log("Marker Location:", markerLocation);
    }
  };

  const handleReject = () => {
    if (!singleHotel?.location) {
      marker.setLngLat([location.lang, location.lat]);
    } else {
      marker.setLngLat([
        parseFloat(singleHotel.location.lang),
        parseFloat(singleHotel.location.lat),
      ]);
    }

    startTimeout(2000, setAction, "Location Rejected");
  };

  const handleAccept = async () => {
    const markerLocation = marker.getLngLat();

    if (
      singleHotel?.location?.lang &&
      markerLocation.lng === location.lang &&
      markerLocation.lat === location.lat
    ) {
      return;
    }

    const { lat, lng } = markerLocation;

    setLocation({ lat, lang: lng });

    startTimeout(2000, setAction, "Location Accepted");
  };

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        style={{ width: width, height: height }}
        className="rounded-[5px]"
      ></div>
      {edit && (
        <div className="absolute bottom-2 z-10 h-10 w-20  left-2 flex items-center gap-2">
          <div
            className="h-8 w-8 flex items-center rounded-full bg-red-600 justify-center cursor-pointer shadow-lg"
            onClick={() => handleReject()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div
            className="h-8 w-8 flex items-center rounded-full bg-green-500 justify-center cursor-pointer shadow-lg"
            onClick={() => handleAccept()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
      )}
      {action && (
        <p className="absolute text-primary text-[12px] w-full text-right">
          {action}
        </p>
      )}
    </div>
  );
};

export default Maps;
