"use client"

import L from "leaflet"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"

import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import useCoordinateStore from "@/store/coordinateStore"

function InteractiveMap() {
  const { setCoordinates, resetCoordinates } = useCoordinateStore()
  const [drawnItems, setDrawnItems] = useState<L.FeatureGroup<any>>(
    new L.FeatureGroup()
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      })
    }
  }, [])

  // Función que se llama cuando se crea un nuevo elemento
  const handleCreated = (e: any) => {
    const layer = e.layer

    // Si el elemento creado es un círculo
    if (layer instanceof L.Circle) {
      const center = layer.getLatLng() // Obtiene el centro del círculo
      const radius = layer.getRadius() // Obtiene el radio del círculo
      setCoordinates({ center: [center.lat, center.lng], radius })
    }

    drawnItems.addLayer(layer) // Añade la capa a drawnItems
  }

  const handleDeleted = (e: any) => {
    const layers = e.layers // Obtiene las capas eliminadas

    layers.eachLayer((layer: any) => {
      if (layer instanceof L.Circle) {
        resetCoordinates()
      }
    })
  }

  return (
    <>
      <div className="relative h-full">
        <MapContainer
          center={[4.142, -73.626]} // Coordenadas de Bogotá
          zoom={12.6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup
            ref={(featureGroupRef) => {
              if (featureGroupRef) {
                // Chequeo para asegurarse de que no sea null
                setDrawnItems(featureGroupRef)
              }
            }}
          >
            <EditControl
              position="topright"
              onCreated={handleCreated} // Llama a handleCreated cuando se crea un nuevo elemento
              onDeleted={handleDeleted} // Agregado para manejar la eliminación
              draw={{
                rectangle: false,
                circle: true, // Habilitamos la opción de dibujar círculos
                circlemarker: false,
                marker: false,
                polyline: false,
                polygon: false, // Deshabilitamos polígonos
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </>
  )
}

export default InteractiveMap