import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono } from "next/font/google";
import TopBar from "@/components/TopBar";
import "./globals.css";

const monoBody = JetBrains_Mono({
  variable: "--font-mono-body",
  subsets: ["latin"],
});

const monoDisplay = Space_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Komal — Product Manager. Builder. Always Curious.",
    template: "%s · Komal",
  },
  description:
    "Portfolio of Komal, a product manager and builder turning complex problems into meaningful products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monoBody.variable} ${monoDisplay.variable} h-full antialiased`}
    >
      <head>
        {/* apply a saved theme before first paint (default is dark) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full">
        {/* desktop: the shell is exactly one viewport; pages fit it, and only
            blog and projects scroll (see components/Page.tsx) */}
        <div className="flex min-h-dvh w-full flex-col gap-3 p-3 lg:h-dvh lg:overflow-hidden">
          <TopBar />
          <main className="flex flex-1 flex-col gap-3 lg:min-h-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
