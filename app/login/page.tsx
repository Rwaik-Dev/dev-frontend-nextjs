"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simular login
        setTimeout(() => {
            setIsLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simular registro
        setTimeout(() => {
            setIsLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">

                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">FakeStore API</h1>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center text-white">Bem-vindo</CardTitle>
                        <CardDescription className="text-center text-slate-400">
                            Entre na sua conta ou crie uma nova
                        </CardDescription>
                    </CardHeader>
                    <CardContent>



                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-200">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-200">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-slate-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-slate-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </form>


                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
