// store/coordinateStore.ts
import { create } from "zustand"
import { Coordinates } from "@/types"

interface CoordinateState {
  coordinates: Coordinates | null
  setCoordinates: (coords: Coordinates | null) => void
  resetCoordinates: () => void
}

const useCoordinateStore = create<CoordinateState>((set) => ({
  coordinates: null,
  setCoordinates: (coords) => set({ coordinates: coords }),
  resetCoordinates: () => set({ coordinates: null }),
}))

export default useCoordinateStore
