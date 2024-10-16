import { LargeLogo } from "@/components/common/large-logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <div className="flex-1 relative max-lg:hidden flex items-end w-[520px] min-w-[500px] h-screen px-8 py-10 2xl:py-[100px] bg-gradient-to-b from-purple-700 via-purple-700/50 to-purple-900/20 inverted-border-radius">
        <LargeLogo className="absolute top-8 left-8" />
        <div className="space-y-2 select-none">
          <h2 className="text-[60px] 2xl:text-[80px] font-light leading-[58px] 2xl:leading-[80px] mb-7 2xl:mb-10">
            Protección <br /> Urbana Inteligente
          </h2>
          <p className="text-muted-foreground md:text-lg 2xl:text-2xl w-[90%] xl:w-[70%]">
            Conectando a las entidades más importantes para hacer de nuestra
            ciudad un lugar más seguro
          </p>
        </div>
      </div>
      <div className="flex-1 lg:py-8 max-lg:py-6 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
