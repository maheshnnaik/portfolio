import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";
import componentMap from "./componentMap";

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {data?.sections?.map((route) => {
              const Component = componentMap[route.component];
              if (!Component) return null;

              return (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  element={<Component header={route.headerTitle} />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
