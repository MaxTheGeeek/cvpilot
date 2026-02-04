"use client"

import { Analytics } from "@vercel/analytics/next"
import * as React from "react"

export function AnalyticsManager() {
    const [shouldTrack, setShouldTrack] = React.useState(false)

    React.useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (consent) {
            try {
                const { analytics } = JSON.parse(consent)
                if (analytics) {
                    setShouldTrack(true)
                }
            } catch (e) {
                // ignore
            }
        }
    }, [])

    if (!shouldTrack) return null

    return <Analytics />
}
