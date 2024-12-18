import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import axios from 'axios';

const MyRoutes = () => {
  const [initialCenter, setInitialCenter] = useState<[number, number]>([
    -123.11934, // Default longitude (Vancouver)
    49.24966, // Default latitude (Vancouver)
  ]);
  const [initialZoom, setInitialZoom] = useState<number>(16);

  // Map and container refs
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // State for dynamic map properties
  const [profile, setProfile] = useState<string>('walking');
  const [distance, setDistance] = useState<number>(0);

  // Initialize Mapbox map
  useEffect(() => {
    // Attempt to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          setInitialCenter([longitude, latitude]);
        },
        (error) => console.error('Error obtaining location:', error)
      );
    }

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN || '';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });

    map.on('move', () => {
      const mapCenter = map.getCenter();
      setInitialCenter([mapCenter.lng, mapCenter.lat]);
      setInitialZoom(map.getZoom());
    });

    // Add geolocate control to the map.
    const geoLocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geoLocation);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Add Mapbox Draw and route handling
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true,
      },
      defaultMode: 'draw_line_string',
      styles: [
        {
          id: 'gl-draw-line',
          type: 'line',
          filter: ['all', ['==', '$type', 'LineString']],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#38BDF8',
            'line-dasharray': [0.2, 2],
            'line-width': 2,
          },
        },
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
          paint: {
            'circle-radius': 5,
            'circle-color': '#FFF',
          },
        },
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
          paint: {
            'circle-radius': 3,
            'circle-color': '#38BDF8',
          },
        },
      ],
    });

    map.addControl(draw, 'top-right');

    const updateRoute = () => {
      const data = draw.getAll();
      if (!data.features.length) return;

      const coords =
        data.features[data.features.length - 1].geometry.coordinates;
      const joinedCoords = coords.join(';');
      const radiuses = coords.map(() => 25);

      fetchRoute(joinedCoords, radiuses, profile);
    };

    const fetchRoute = async (
      coordinates: string,
      radiuses: number[],
      profile: string
    ) => {
      const radiusParam = radiuses.join(';');
      const url = `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiusParam}&steps=true&access_token=${mapboxgl.accessToken}`;

      try {
        const { data } = await axios.get(url);

        if (data.code !== 'Ok') {
          alert(
            `Error: ${data.message}\n\nRefer: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
          );
          return;
        }

        const routeGeometry = data.matchings[0].geometry;
        const routeDistance = data.matchings[0].distance;

        drawRoute(routeGeometry);

        // Add start and end markers to the map
        const coords = routeGeometry.coordinates;
        const startMarker = new mapboxgl.Marker({ color: '#34d399' })
          .setLngLat([coords[0][0], coords[0][1]])
          .addTo(map);
        const endMarker = new mapboxgl.Marker({ color: '#f43f5d' })
          .setLngLat([
            coords[coords.length - 1][0],
            coords[coords.length - 1][1],
          ])
          .addTo(map);

        setDistance(parseFloat((routeDistance / 1000).toFixed(2)));
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    const drawRoute = (geometry: any) => {
      const map = mapRef.current;
      if (!map) return;

      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry,
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1D4ED8',
          'line-width': 8,
          'line-opacity': 0.8,
        },
      });
    };

    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
  }, [profile]);

  return (
    <div className='flex flex-col justify-around items-center w-full h-full p-1'>
      {/* Saved Routes Display */}
      <div className='flex flex-row justify-start items-center gap-x-2 w-full p-1'>
        <div className='w-36 h-10 ring-2 ring-emerald-200 rounded-2xl'>
          Saved Route 1
        </div>
        <div className='w-36 h-10 ring-2 ring-emerald-200 rounded-2xl'>
          Saved Route 2
        </div>
      </div>

      {/* Distance Display */}
      <div className='w-36 h-10 rounded bg-white'>Distance: {distance} km</div>

      {/* Map Container */}
      <div className='grow w-full h-full'>
        <div
          id='map-container'
          className='w-full h-full'
          ref={mapContainerRef}
        />
      </div>
    </div>
  );
};

export default MyRoutes;
