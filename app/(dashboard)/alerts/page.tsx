"use client"

import dynamic from "next/dynamic"

import AlertForm from "./components/alert-form"

const Map = dynamic(() => import("./components/interactive-map"), {
  ssr: false,
})

export default function AlertsPage() {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="xl:w-1/3 w-1/2 shrink-0 h-full py-4 px-2 overflow-y-auto">
        <AlertForm />
      </div>

      <div className="flex-1 h-full overflow-hidden">
        <Map />
      </div>
    </div>
  )
}
