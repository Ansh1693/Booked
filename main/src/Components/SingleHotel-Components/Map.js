import React, { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
const Map = ({ lat = 18.9885983229874, lang = 72.82971196711472, address }) => {
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
        zoom: 13,
      });

      const ttMarker = new tt.Marker().setLngLat([lang, lat]).addTo(ttMap);

      console.log(ttMap, ttMarker);
      setMap(ttMap);
      setMarker(ttMarker);
    };

    initializeMap();
  }, []);

  return (
    <section className="w-[96%] md:w-[96%] xl:w-[1280px] mx-auto" id="map">
      <section className="max-w-screen-xl w-full mx-auto px-4 my-4">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/2 sm:mr-4">
            <h2 className="font-bold text-2xl mb-6">Locate Us</h2>
            <span className="font-medium text-text text-sm whitespace-pre-line">
              <strong>Address:</strong>
              <br />
              <div className="whitespace-pre-line html-renderer-div">
                <p>{address}</p>
              </div>
            </span>
            <span className="font-medium text-text text-sm whitespace-pre-line">
              <strong>Contact:</strong>
              <a href="tel:+914440114576" className="ml-1 hover:text-orange">
                +914440114576
              </a>
            </span>

            <div className="mt-4 whitespace-pre-line">
              <header className="p-4 border bg-light border-gray-200 rounded-lg sm:text-lg font-semibold w-96 flex items-center justify-between">
                Directions
                <button className="text-text leading-none focus:outline-none">
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </header>
            </div>
            <a
              className="border border-gray-200 w-96 font-semibold bg-white py-2 px-4 mt-4 rounded-lg flex gap-2 text-primary items-center"
              href="https://www.google.com/maps/dir/?api=1&amp;destination=9.500365966939258,76.31649485652318"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.25 12.2383V3.34375L4.75 1.76172V10.6562L9.25 12.2383ZM13.3633 0.25C13.6211 0.25 13.75 0.378906 13.75 0.636719V11.957C13.75 12.1445 13.6562 12.2617 13.4688 12.3086L9.25 13.75L4.75 12.168L0.742188 13.7148L0.636719 13.75C0.378906 13.75 0.25 13.6211 0.25 13.3633V2.04297C0.25 1.85547 0.34375 1.73828 0.53125 1.69141L4.75 0.25L9.25 1.83203L13.2578 0.285156L13.3633 0.25Z"
                  fill="#F15824"
                />
              </svg>
              Get directions
            </a>
          </div>
          <div
            ref={mapContainer}
            style={{ width: "820px", height: "250px" }}
            className="rounded-lg shadow-lg overflow-x-hidden"
          ></div>
        </div>
      </section>
    </section>
  );
};

export default Map;
