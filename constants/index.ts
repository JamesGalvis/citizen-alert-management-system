import { LayoutGrid, Siren } from "lucide-react"

export const entities = ["Policía", "Bomberos", "Oficina de Gestión de Riesgos"]

export const navItems = [
  {
    label: "Dashboard",
    href: "/",
    Icon: LayoutGrid,
  },
  {
    label: "Alertas",
    href: "/alerts",
    Icon: Siren,
  },
]
