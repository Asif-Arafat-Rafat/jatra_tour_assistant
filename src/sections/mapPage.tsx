import { Map, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import {useRef,useEffect, useState} from 'react'
setWorkerUrl(workerUrl)

export default function MapPage(){
        const mapContainer = useRef<HTMLDivElement | null>(null)
        const [position,setPosition]=useState("")
        const [results,setResults]=useState([90.48, 23.811]);
        async function searchLocation() {
            if (!position.trim()) return;

            const params = new URLSearchParams({
            q: `${position}, Dhaka, Bangladesh`,
            format: "jsonv2",
            limit: "5",
            countrycodes: "bd",
            });

            try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?${params}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch locations");
            }

            const data = await response.json();
            console.log(data[0]['lon'])
            setResults([data[0]['lon'],data[0]['lat']]);
            console.log([data[0]['lon'],data[0]['lat']]);

            } catch (error) {
            console.error(error);
            }
        }
        useEffect(() => {
            if (!mapContainer.current) return
    
            const map = new Map({
                container: mapContainer.current,
                // OpenFreeMap supports 'bright', 'liberty', or 'positron' (not 'dark')
                // For a dark map, use: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
                style: 'https://tiles.openfreemap.org/styles/bright',
                center: results,
                zoom:12,
                attributionControl: false
            })
    
            map.on('error', (e) => {
                console.error('MapLibre error:', e.error)
            })
    
            ;(window as any).map = map
            return () => {
                map.remove()
            }
        }, [results])
    return(<>
            <div className='overflow-hidden relative'>
                <div className='absolute z-5 left-5 top-5 flex items-center justify-center w-50 h-20 bg-accent/60 rounded-2xl'>
                    <input type="text" className='bg-white/60' value={position} onChange={(e)=>setPosition(e.target.value)}/>
                    <button onClick={searchLocation} className='p-2 bg-blue-200'>submit</button>
                </div>
                <div
                    ref={mapContainer}
                    className="w-[100vw] h-[100vh] rounded-lg"
                />
            </div>
    </>)
}