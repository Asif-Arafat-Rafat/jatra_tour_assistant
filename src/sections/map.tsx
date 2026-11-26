import { useEffect, useRef } from 'react'
import { Map, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'

const translations = {
    en: {
        badge: 'LIVE NETWORK & TRANSFERS',
        features: [
            {
                num: '1',
                title: 'Smart Multi-Bus Routing',
                desc: 'Automatically finds both direct buses and seamless connecting routes with exact transfer points across Dhaka.'
            },
            {
                num: '2',
                title: 'Upfront Fare Estimation',
                desc: 'Calculates expected journey fares before you board so you always travel with clarity and confidence.'
            },
            {
                num: '3',
                title: 'Live Interactive Map',
                desc: 'Trace full bus corridors, inspect every stoppage, and spot your nearest boarding point visually.'
            }
        ]
    },
    bn: {
        badge: 'লাইভ নেটওয়ার্ক ও ট্রান্সফার',
        features: [
            {
                num: '১',
                title: 'স্মার্ট মাল্টি-বাস রাউটিং',
                desc: 'ঢাকার যেকোনো গন্তব্যে সরাসরি বাস এবং সঠিক ট্রান্সফার পয়েন্টসহ সংযোগকারী রুট সহজেই খুঁজে পান।'
            },
            {
                num: '২',
                title: 'আগাম ভাড়ার হিসাব',
                desc: 'বাসে ওঠার আগেই দূরত্ব অনুযায়ী সম্ভাব্য ভাড়া জেনে নিশ্চিন্তে যাত্রা করুন।'
            },
            {
                num: '৩',
                title: 'লাইভ ইন্টারঅ্যাক্টিভ ম্যাপ',
                desc: 'ম্যাপে সম্পূর্ণ বাস রুট, প্রতিটি স্টপেজ এবং আপনার নিকটতম বোর্ডিং পয়েন্ট সরাসরি দেখুন।'
            }
        ]
    }
}

setWorkerUrl(workerUrl)

export default function MapViewer({ language = 'en' }: { language: 'en' | 'bn' }) {
    const mapContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!mapContainer.current) return

        const map = new Map({
            container: mapContainer.current,
            // OpenFreeMap supports 'bright', 'liberty', or 'positron' (not 'dark')
            // For a dark map, use: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
            style: 'https://tiles.openfreemap.org/styles/dark',
            center: [90.48, 23.811],
            zoom: 12,
            attributionControl: false
        })

        map.on('error', (e) => {
            console.error('MapLibre error:', e.error)
        })

        ;(window as any).map = map
        return () => {
            map.remove()
        }
    }, [])

    const t = translations[language] || translations.en

    return (
        <div className="h-[calc(100vh-76px)] w-full bg-background flex items-center overflow-hidden justify-evenly relative">
            <div
                ref={mapContainer}
                className="w-[100vw] h-[100%] rounded-lg"
            />

            {/* Diagonal Overlay Shape */}
            <div className="pointer-events-none h-[150vh] absolute aspect-square rounded-4xl bg-[linear-gradient(45deg,rgba(18,59,80,0.25)_0%,var(--color-secondary)_40%,var(--color-primary)_100%)] rotate-[45deg] translate-x-[50%] flex items-center justify-evenly" />

            {/* Right-Aligned Feature Stack */}
            <div className="pointer-events-none z-20 w-[80%] h-[80%] absolute right-0 flex flex-col items-end justify-center gap-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/85 px-4 mr-7 py-2 text-sm font-semibold text-secondary backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    {t.badge}
                </div>

                <div className="flex flex-col items-end gap-5 w-full">
                    {t.features.map((item) => (
                        <div key={item.num} className="flex items-center text-white">
                            <div className="flex flex-col items-end text-right">
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <p className="w-[60%] text-sm text-white/85 mt-1">{item.desc}</p>
                            </div>
                            <div className="w-28 h-20 ml-3 shrink-0 rounded-l-full bg-primary flex overflow-hidden items-center shadow-md">
                                <div className="w-14 h-14 bg-white rounded-full ml-3 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary/80">{item.num}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}