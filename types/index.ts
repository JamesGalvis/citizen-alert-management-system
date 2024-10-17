export type AlertByDate = {
  createdAt: string | Date
  _count: {
    id: number
  }
}

export type BarAlertData = {
  month: string
  alerts: number
}

export interface Coordinates {
  center: [number, number] // Tupla de dos números (lat, lng)
  radius: number
}
