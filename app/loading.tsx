import { Spinner } from "@/components/ui/spinner"

export default function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-4">
        <Spinner className="size-6 text-primary" />
        <span className="text-lg font-medium">Lade...</span>
      </div>
    </div>
  )
}