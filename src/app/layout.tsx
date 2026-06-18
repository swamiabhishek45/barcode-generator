import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
        <Analytics/>
        <html lang="en">
            <body>{children}</body>
        </html>
        </>
    );
}
