"use client"

import { useTheme } from "next-themes"
import { LogIn, Moon, Sun, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { FcGoogle } from "react-icons/fc"


export default function SettingsPage() {
    const { setTheme } = useTheme()

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
            <p className="text-muted-foreground">
                Ändere Deine Nutzererfahrung.
            </p>

            <Separator />

            {/* Account Section */}
            <Card className="rounded-2xl shadow-sm border">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Logge Dich ein oder erstelle einen neuen Account.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Button className="flex-1 py-2 gap-2">
                            <LogIn className="h-4 w-4" />
                            <span>Einloggen</span>
                        </Button>
                        <Button variant="outline" className="flex-1 py-2 gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Registrieren</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-sm text-muted-foreground">oder</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <Button variant="outline" className="flex items-center justify-center gap-2 py-3">
                        <FcGoogle className="h-5 w-5" />
                        <span>Mit Google anmelden</span>
                    </Button>
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
                    <CardDescription>Verwalte wie Du Updates erhälst.</CardDescription>
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
