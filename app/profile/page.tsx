import { BackLink } from "@/components/BackLink";
import { Separator } from "@/components/ui/separator";
import ProfileDetails from "@/components/ProfileDetails";

export default function profilePage() {
  return (
        <div className="max-w-2xl mx-auto p-6 space-y-4 mt-0">
            <div className="space-y-0 p-0 px-0 py-0 pl-0 m-0"><BackLink /></div>

            <h1 className="text-3xl font-bold tracking-tight">Mein Profil</h1>
            <Separator />

            <ProfileDetails />

        </div>
  )
}
