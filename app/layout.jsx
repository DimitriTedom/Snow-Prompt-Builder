import "../styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import StyledComponentsRegistry from "./registry";
import { LoadingProvider } from "@components/LoadingContext";
import Footer from "@components/Footer";

export const metadata = {
  title: {
    default: "Snow Prompt Builder",
    template: "%s | Snow Prompt Builder",
  },
  description: "Discover, generate, and share AI‑powered prompts with community‑suggested tags.",
  keywords: [
    "AI prompts",
    "prompt sharing",
    "LLM",
    "Groq",
    "Next.js",
    "NextAuth",
    "MongoDB",
    "Snow Prompt Builder"
  ],
  authors: [{ name: "Dimitri Tedom", url: "https://github.com/DimitriTedom" }],
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "Snow Prompt Builder",
    description: "Discover, generate, and share AI‑powered prompts with community‑suggested tags.",
    url: "https://your-domain.com",
    siteName: "Snow Prompt Builder",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snow Prompt Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@DimitriTedom",
    creator: "@DimitriTedom",
    title: "Snow Prompt Builder",
    description: "Discover, generate, and share AI‑powered prompts with community‑suggested tags.",
    images: ["https://your-domain.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/og-image.png",
    apple: "/og-image.png",
  },
};


const RootLayout = ({ children }) => (
  <StyledComponentsRegistry>
    <LoadingProvider>
      <Provider>
        <html lang="en">
          <body>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              {children}
              <Footer />
            </main>
          </body>
        </html>
      </Provider>
    </LoadingProvider>
  </StyledComponentsRegistry>
);

export default RootLayout;
