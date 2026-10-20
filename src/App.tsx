import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PageShell } from "@/components/layout";

const Home = lazy(() => import("./pages/Home"));
const Demo = lazy(() => import("./pages/Demo"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Security = lazy(() => import("./pages/Security"));
const Styleguide = lazy(() => import("./pages/Styleguide"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div
      className="mx-auto min-h-[40vh] max-w-6xl px-5 py-16"
      aria-busy="true"
      aria-label="Loading page"
    />
  );
}

export default function App() {
  return (
    <PageShell>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageShell>
  );
}
