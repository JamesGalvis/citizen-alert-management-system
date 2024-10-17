import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { alertId: string } }
) {
  try {
    if (!params.alertId) {
      return new NextResponse("Alert ID is required", { status: 400 })
    }

    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    })

    const alert = await db.alert.findUnique({
      where: { id: params.alertId },
      include: {
        entity: true,
        user: true,
      },
    })

    return NextResponse.json(alert, { headers })
  } catch (error) {
    console.log("[ALERT_GET_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  })

  return new NextResponse(null, { headers })
}
