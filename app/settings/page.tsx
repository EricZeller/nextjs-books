"use client"

import { LogIn, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { FcGoogle } from "react-icons/fc"
import { BackLink } from "@/components/BackLink"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { LoadingSpinner } from "@/components/Loading"

export default function SettingsPage() {

    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            const { data } = await supabase.auth.getUser()
            setUser(data?.user ?? null)
            setLoading(false)
        }
        loadUser()
    }, [])

    async function handleGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${location.origin}/settings` }
        })
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4 mt-0">
            <div className="space-y-0 p-0 px-0 py-0 pl-0 m-0"><BackLink /></div>

            <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
            <Separator />

            {/* Account Section */}
            <Card className="rounded-2xl shadow-sm border">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                        {user ? "Du bist eingeloggt." : "Logge Dich ein oder erstelle einen neuen Account."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">

                    {/* Loading Zustand */}
                    {loading && <LoadingSpinner />}

                    {/* Fall 1: User ist NICHT eingeloggt */}
                    {!loading && !user && (
                        <>
                            <div className="flex items-center gap-4">
                                <Button onClick={() => router.push("/login")} className="flex-1 py-2 gap-2">
                                    <LogIn className="h-4 w-4" />
                                    <span>Einloggen</span>
                                </Button>

                                <Button onClick={() => router.push("/signup")} variant="outline" className="flex-1 py-2 gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    <span>Registrieren</span>
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-sm text-muted-foreground">oder</span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <Button
                                onClick={handleGoogle}
                                variant="outline"
                                className="flex items-center justify-center gap-2 py-3"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span>Mit Google anmelden</span>
                            </Button>
                        </>
                    )}

                    {/* Fall 2: User IST eingeloggt */}
                    {!loading && user && (
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground">
                                Eingeloggt als:<br />
                                <span className="font-medium text-foreground">{user?.user_metadata?.name} ({user?.user_metadata?.email})</span>
                            </p>

                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="py-2"
                            >
                                Logout
                            </Button>
                        </div>
                    )}

                </CardContent>
            </Card>

            {/* Theme Section */}
            <Card className="rounded-2xl shadow-sm border">
                <CardHeader className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <CardTitle>Design</CardTitle>
                        <CardDescription>Wähle Dein gewünschtes Erscheinungsbild.</CardDescription>
                    </div>
                    <ModeToggle />
                </CardHeader>
            </Card>

            {/* Notifications Section */}
            <Card className="rounded-2xl shadow-sm border">
                <CardHeader>
                    <CardTitle>Benachrichtigungen</CardTitle>
                    <CardDescription>Verwalte wie Du Updates erhältst.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email-Mitteilung</Label>
                        <Switch id="email-notifications" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Push-Mitteilung</Label>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
