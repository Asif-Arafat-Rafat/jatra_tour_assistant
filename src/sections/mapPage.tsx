import { Map, setWorkerUrl,Marker } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import {useRef,useEffect, useState} from 'react'
setWorkerUrl(workerUrl)

export default function MapPage(){
        const mapContainer = useRef<HTMLDivElement | null>(null)
        const mapRef = useRef<Map | null>(null);
        const markerRef = useRef<Marker | null>(null);
        const [markerActive,setMarkerActive]=useState(false);
        const [position,setPosition]=useState("")
        const [results, setResults] = useState<[number, number]>([
                                        90.48,
                                        23.811
                                    ]);
        async function searchLocation() {
            if (!position.trim()) return;
            setMarkerActive(true);
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
        useEffect(()=>{
            if (!mapContainer.current) return
    
            const map = new Map({
                container: mapContainer.current,
                style: 'https://tiles.openfreemap.org/styles/bright',
                center: [
                    90.48,
                    23.811
                ],
                zoom:12,
                attributionControl: false
            })
            mapRef.current=map;
            markerRef.current=new Marker().setLngLat(mapRef.current.getCenter());
            map.on('error',(e)=>{console.error("Error 1:",e.error)});
            return ()=>{
                map.remove();
                mapRef.current=null;
                markerRef.current=null;
            };
        },[])
        useEffect(() => {
            if (!mapRef.current || !markerRef.current) return;
            if(markerActive && mapRef) markerRef.current.setLngLat(results).addTo(mapRef.current);

            mapRef.current.flyTo({
                center: results,
                zoom: 15,
                speed: 1.2,
                curve: 1.42,
                essential: true
            });

        }, [results]);
        
    return(<>
            <div className='overflow-hidden relative'>
                <div className='absolute z-5 left-5 top-5 flex items-center justify-center w-50 h-20 bg-accent/60 rounded-2xl'>
                    <input type="text" className='bg-white/60 h-8 w-[70%]' value={position} onChange={(e)=>setPosition(e.target.value)}/>
                    <button onClick={searchLocation} className='h-8 w-[30%] bg-blue-200'>submit</button>
                </div>
                <div
                    ref={mapContainer}
                    className="w-[100vw] h-[100vh] rounded-lg"
                />
            </div>
    </>)
}