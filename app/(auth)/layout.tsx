import InitialAuthLayout from "@/components/common/auth/initial-auth-layout"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <InitialAuthLayout>{children}</InitialAuthLayout>
}
