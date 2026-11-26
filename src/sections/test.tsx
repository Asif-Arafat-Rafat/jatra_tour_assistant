
import { useEffect, useRef } from 'react'

import Map from 'ol/Map.js'
import View from 'ol/View.js'
import LayerGroup from 'ol/layer/Group.js'
import { fromLonLat } from 'ol/proj.js'
import { apply } from 'ol-mapbox-style'

import 'ol/ol.css'

interface MapViewerProps {
    language: 'en' | 'bn'
}

const translations = {
    en: {
        badge: "LIVE NETWORK & TRANSFERS"
    },
    bn: {
        badge: "লাইভ নেটওয়ার্ক ও ট্রান্সফার"
    }
}

export default function MapViewerTest({ language }: MapViewerProps) {

    const mapContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!mapContainer.current) return

        const openfreemap = new LayerGroup()

        const map = new Map({
            target: mapContainer.current,
            layers: [openfreemap],
            view: new View({
                center: fromLonLat([90.48, 23.811]),
                zoom: 12
            })
        })

        apply(
            openfreemap,
            'https://tiles.openfreemap.org/styles/dark'
        ).catch((error) => {
            console.error('OpenFreeMap style error:', error)
        })

        return () => {
            map.setTarget(undefined)
        }

    }, [])

    const t = translations[language]

    return (
        <div className="h-[calc(100vh-76px)] w-full bg-background flex items-center overflow-hidden justify-evenly relative">

            {/* OpenFreeMap */}
            <div
                ref={mapContainer}
                className="w-full h-full rounded-lg"
            />

            {/* Background Gradient */}
            <div className="h-[150vh] absolute aspect-square rounded-4xl
                bg-[linear-gradient(45deg,rgba(18,59,80,0.25)_0%,var(--color-secondary)_40%,var(--color-primary)_100%)]
                rotate-[45deg] translate-x-[50%] flex items-center justify-evenly">
            </div>

            {/* Information Overlay */}
            <div className="z-20 w-[80%] h-[80%] absolute right-0
                flex flex-col items-end justify-start rounded-lg">

                <div className="mb-6 inline-flex items-center gap-2
                    rounded-full border border-primary/20 bg-white/80
                    px-4 mr-7 py-2 text-md font-semibold text-secondary">

                    <span className="h-2 w-2 rounded-full bg-success" />

                    {t.badge}
                </div>

                <div className="flex items-center text-white">

                    <div className="flex flex-col items-end text-right">
                        <h1 className="text-xl">
                            Multi-Bus Route Planning
                        </h1>

                        <p className="w-[60%]">
                            Automatically finds both direct buses and
                            seamless connecting routes with exact
                            transfer points across Dhaka
                        </p>
                    </div>

                    <div className="w-30 h-20 ml-2 rounded-l-full
                        bg-primary flex overflow-hidden items-center">

                        <div className="w-15 h-15 bg-white rounded-full
                            ml-2 flex items-center justify-center">

                            <h1 className="text-4xl text-primary/80">
                                1
                            </h1>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
