"use client";

import React, {useEffect, useRef, useState} from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {formatSelectedAddress} from '@/app/tools/AddressFormatter';


const AddressMap = () => {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker>(new maplibregl.Marker());
    const [suggestions, setSuggestions]: any[] = useState([]);
    const [query, setQuery] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (mapContainerRef.current) {
            const initMap = new maplibregl.Map({
                container: mapContainerRef.current,
                style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
                center: [2.3522, 48.8566],
                zoom: 13,
            });

            markerRef.current = new maplibregl.Marker()
                .setLngLat([2.3522, 48.8566])
                .addTo(initMap);
            setMap(initMap);

            return () => initMap.remove();
        }
    }, []);

    const handleInput = async (e: any) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(async ()=> {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&lang=fr&limit=5`);
            const data = await res.json();
            console.log(data);
            setSuggestions(data.features);
        }, 1500);

        setDebounceTimeout(timeout);
    };

    const handleSelect = (feature: any) => {
        const [lng, lat] = feature.geometry.coordinates;
        if (map && markerRef) {
            map.flyTo({ center: [lng, lat], zoom: 15 });
            markerRef.current.setLngLat([lng, lat]);
            setQuery(formatSelectedAddress(feature));
            setSuggestions([]);
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={handleInput}
                placeholder="Entrez une adresse"
                className="p-2 border rounded w-full max-w-md"
            />
            {suggestions.length > 0 && (
                <div className="border rounded shadow bg-white max-w-md absolute z-50">
                    {suggestions.map((s: any, i: any) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(s)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {formatSelectedAddress(s)}
                        </div>
                    ))}
                </div>
            )}
            <div ref={mapContainerRef} className="mt-4" style={{ height: '400px' }} />
        </div>
    );
}


export default AddressMap;

