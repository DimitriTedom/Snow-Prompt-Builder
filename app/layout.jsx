import "../styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import StyledComponentsRegistry from "./registry";
import { LoadingProvider } from "@components/LoadingContext";
import Footer from "@components/Footer";
export const metadata = {
  title: "Snow Promt Builder",
  description: "Discover & Share AI Prompts",
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
