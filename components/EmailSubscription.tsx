"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function WorldMapDemo() {
  return (
    <div className="py-24 dark:bg-black bg-white w-full">
      <div className="max-w-8xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Stay Ahead of the Marketing Game
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-8xl mx-auto py-4">
          Get exclusive marketing tips, industry insights, and growth strategies delivered to your inbox
        </p>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full">
        <WorldMap
          dots={[
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
            { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
            { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
          ]}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-10 flex justify-center pointer-events-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 w-full flex flex-col items-center gap-4 border border-neutral-200 dark:border-neutral-800">
            <Label
              htmlFor="email"
              className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-2 w-full text-left"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            />
            <Button
              type="button"
              className="w-full mt-2 py-3 px-6 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"
            >
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
