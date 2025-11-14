"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      // Erfolgreich — weiterleiten
      router.push("/settings")
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 flex justify-center flex-col">
      <h1 className="text-2xl mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input  type="email" placeholder="Email" value={email}
               onChange={(e)=>setEmail(e.target.value)} required className="input" />
        <Input type="password" placeholder="Passwort" value={password}
               onChange={(e)=>setPassword(e.target.value)} required className="input" />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <Button disabled={loading} className="w-full">
          {loading ? "..." : "Einloggen"}
        </Button>
      </form>
    </div>
  )
}
