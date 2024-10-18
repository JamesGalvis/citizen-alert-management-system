"use client"

import L from "leaflet"
import { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Circle,
  Tooltip,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"

import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import useCoordinateStore from "@/store/coordinateStore"

interface InteractiveMapProps {
  circleCoordinates: { center: number[]; radius: number } | null
}

function InteractiveMap({ circleCoordinates }: InteractiveMapProps) {
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
      <MapContainer
        scrollWheelZoom={false}
        center={
          !circleCoordinates
            ? [4.142, -73.626]
            : [circleCoordinates.center[0], circleCoordinates.center[1]]
        }
        zoom={15}
        className="md:size-full max-md:min-h-[450px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {circleCoordinates && (
          <FeatureGroup pathOptions={{ color: "red" }}>
            <Circle
            interactive={false}
              center={[
                circleCoordinates.center[0],
                circleCoordinates.center[1],
              ]}
              pathOptions={{ fillColor: "red" }}
              radius={circleCoordinates.radius}
              className="focus-visible:ring-0 focus-visible:ring-transparent ring-0 ring-transparent"
            >
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                Zona de afectación actual:{" "}
                {`${circleCoordinates.radius.toFixed(0)} metros`}
              </Tooltip>
            </Circle>
          </FeatureGroup>
        )}
        <FeatureGroup
          ref={(featureGroupRef) => {
            if (featureGroupRef) {
              // Chequeo para asegurarse de que no sea null
              setDrawnItems(featureGroupRef)
            }
          }}
        >
          <Tooltip>Zona de afectación nueva</Tooltip>
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
    </>
  )
}

export default InteractiveMap
