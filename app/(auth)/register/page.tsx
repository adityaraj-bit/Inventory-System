"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isStrongPassword = (password: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!isStrongPassword(password)) {
            setError("Weak password. Follow requirements.");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            if (data.role === "MANAGER") {
                router.push("/manager");
            } else if (data.role === "ADMIN") {
                router.push("/admin");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-surface-lowest text-foreground overflow-hidden">
        {/* LEFT - Editorial Section */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center px-24 relative bg-surface-lowest">
            {/* Signature Texture/Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] opacity-30 animate-pulse pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
                <h1 className="text-[120px] font-black tracking-tighter uppercase leading-[0.8] mix-blend-difference select-none">
                    Join the <br /> <span className="text-primary italic">Intelligence</span>
                </h1>
                <p className="max-w-md text-xl font-medium text-muted-foreground leading-relaxed">
                    Deploy your personal inventory terminal and harness the power of automated operational telemetry.
                </p>
            </div>

            <div className="absolute bottom-12 left-24 flex items-center gap-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Type</span>
                    <span className="text-xs font-bold text-foreground font-mono italic">Client Terminal</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Encryption</span>
                    <span className="text-xs font-bold text-primary font-mono italic">AES-256 Enabled</span>
                </div>
            </div>
        </div>

        {/* RIGHT - Auth Section */}
        <div className="flex items-center justify-center lg:col-span-5 px-6 relative bg-surface-low lg:bg-transparent">
            {/* Background for mobile */}
            <div className="lg:hidden absolute inset-0 bg-surface-lowest" />
            
            <form
                onSubmit={handleRegister}
                className="w-full max-w-sm relative z-10 bg-surface-variant/40 lg:bg-surface-highest/60 backdrop-blur-3xl p-10 rounded-sm border border-border/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-500"
            >
                <div className="mb-10 space-y-2 text-center lg:text-left">
                    <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">
                        Link Terminal
                    </h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
                        Establish Identity Parameters
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border-l-2 border-destructive p-4 mb-6 animate-in slide-in-from-left-2 transition-all">
                        <p className="text-destructive text-[11px] font-bold uppercase tracking-wider">
                            {error}
                        </p>
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    {/* NAME */}
                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
                        <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-primary">Operator Name</label>
                        <div className="relative">
                            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-4 h-4 transition-colors group-focus-within:text-primary/50" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
                        <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-primary">Direct Channel</label>
                        <div className="relative">
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-4 h-4 transition-colors group-focus-within:text-primary/50" />
                            <input
                                type="email"
                                placeholder="name@domain.com"
                                className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
                        <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-primary">Secure Access Token</label>
                        <div className="relative">
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-4 h-4 transition-colors group-focus-within:text-primary/50" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-br from-primary to-[#4D80FF] text-primary-foreground font-black text-[10px] uppercase tracking-[0.3em] py-4 rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(174,198,255,0.2)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                >
                    {loading ? "Establishing Link..." : (
                        <>
                            Authorize Connection
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                <p className="text-[10px] font-bold text-center mt-8 text-muted-foreground uppercase tracking-[0.2em]">
                    Registry complete?{" "}
                    <span
                        className="text-primary cursor-pointer hover:underline underline-offset-4 decoration-primary/40 hover:text-white transition-colors"
                        onClick={() => router.push("/login")}
                    >
                        Access Terminal
                    </span>
                </p>
            </form>
        </div>
    </div>

    );
}
