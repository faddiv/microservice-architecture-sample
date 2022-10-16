import { FunctionComponent } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Layout: FunctionComponent = () => {
  return (
    <>
      <Header />

      <div className="container">
        <main role="main" className="pb-3">
          {<Outlet />}
        </main>
      </div>

      <Footer />
    </>
  );
};
