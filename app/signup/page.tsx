"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name } // user_metadata, erscheint in auth.users.user_metadata
      }
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      // Nutzer wurde erstellt — evtl. mit Email-Confirm abhängig von Settings
      router.push("/settings") // oder danke-Seite
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl mb-4">Registrieren</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Username" value={name} onChange={e=>setName(e.target.value)} className="input" />
        <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="input" />
        <Input type="password" placeholder="Passwort" value={password} onChange={e=>setPassword(e.target.value)} required className="input" />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <Button disabled={loading} className="w-full">{loading ? "..." : "Account erstellen"}</Button>
      </form>
    </div>
  )
}
