"use client"

import * as React from "react"
import { Cookie, MousePointerClick, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function CookieConsent() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [hide, setHide] = React.useState(true)

    React.useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            setHide(false)
            // Small delay to make it slide in naturally
            setTimeout(() => setIsOpen(true), 100)
        }
    }, [])

    const acceptAll = () => {
        setIsOpen(false)
        setTimeout(() => setHide(true), 300)
        localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: true, marketing: true }))
    }

    const rejectAll = () => {
        setIsOpen(false)
        setTimeout(() => setHide(true), 300)
        localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: false, marketing: false }))
    }

    if (hide) return null

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out sm:p-6",
                !isOpen ? "translate-y-full" : "translate-y-0"
            )}
        >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-background/80 p-6 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 dark:bg-card/80">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Cookie className="h-7 w-7" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold tracking-tight">We value your privacy</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px] w-full sm:w-auto">
                        <Button onClick={acceptAll} className="w-full font-semibold shadow-lg hover:shadow-primary/20 transition-all">
                            Accept All
                        </Button>
                        <Button variant="outline" onClick={rejectAll} className="w-full">
                            Reject All
                        </Button>
                        <CookieSettings onSave={(preferences) => {
                            setIsOpen(false)
                            setTimeout(() => setHide(true), 300)
                            localStorage.setItem("cookie-consent", JSON.stringify(preferences))
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function CookieSettings({ onSave }: { onSave: (pref: any) => void }) {
    const [preferences, setPreferences] = React.useState({
        necessary: true,
        analytics: false,
        marketing: false,
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground">
                    Customize settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cookie Preferences</DialogTitle>
                    <DialogDescription>
                        Manage your cookie preferences. Essential cookies cannot be disabled.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="necessary" className="flex items-center font-medium">
                                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                                Strictly Necessary
                            </Label>
                            <span className="text-xs text-muted-foreground">Required for the website to function properly.</span>
                        </div>
                        <Switch id="necessary" checked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
                            <span className="text-xs text-muted-foreground">Help us understand how visitors interact with the website.</span>
                        </div>
                        <Switch
                            id="analytics"
                            checked={preferences.analytics}
                            onCheckedChange={(c) => setPreferences({ ...preferences, analytics: c })}
                        />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
                            <span className="text-xs text-muted-foreground">Used to deliver advertisements relevant to you.</span>
                        </div>
                        <Switch
                            id="marketing"
                            checked={preferences.marketing}
                            onCheckedChange={(c) => setPreferences({ ...preferences, marketing: c })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(preferences)} className="w-full">Save Preferences</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
