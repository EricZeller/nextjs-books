"use client"

import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { LoadingSpinner } from "@/components/Loading"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileDetails() {
    
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const provider = user?.app_metadata?.provider || "unknown"

    useEffect(() => {
        async function loadUser() {
            const { data } = await supabase.auth.getUser()
            setUser(data?.user ?? null)
            setLoading(false)
        }
        loadUser()
    }, [])
    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : user ? (
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">
                        Hallo {user?.user_metadata.name}!
                    </h2>
                    <p><strong>E-Mail:</strong> {user.email}</p>
                    
                    <p><strong>Login Methode:</strong> {provider.charAt(0).toUpperCase() + provider.slice(1)}</p>
                </div>
            ) : (
                <div className="flex flex-row items-center justify-between">
                    <p>Du bist nicht eingeloggt.</p>
                    <Button onClick={() => router.push("/settings")}>
                        <UserPlus className="mr-1" />
                        Jetzt einloggen oder registrieren
                    </Button>
                </div>
            )}
        </div>
    )
}
