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
