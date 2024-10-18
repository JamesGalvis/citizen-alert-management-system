import { LayoutGrid, Siren, UsersRound } from "lucide-react"

export const entities = ["Policía", "Bomberos", "Oficina de Gestión de Riesgos"]

export const navItems = [
  {
    label: "Dashboard",
    href: "/",
    Icon: LayoutGrid,
    onlyAdmin: false,
  },
  {
    label: "Alertas",
    href: "/alerts",
    Icon: Siren,
    onlyAdmin: false,
  },
  {
    label: "Miembros",
    href: "/members",
    Icon: UsersRound,
    onlyAdmin: true,
  },
]
