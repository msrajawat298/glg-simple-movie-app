import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.scss";

const MediaView = lazy(() => import("./views/media/MediaView").then((module) => ({ default: module.MediaView })));
const MediaDetailView = lazy(() =>
  import("./views/mediaDetail/MediaDetailView").then((module) => ({ default: module.MediaDetailView }))
);

const { VITE_MOCK_RESULTS } = import.meta.env;

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#141414">
    <CircularProgress color="secondary" />
  </Box>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <MediaView />
          </Suspense>
        </ErrorBoundary>
      ),
    },
    {
      path: "/:media_type/:id?",
      element: (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <MediaDetailView />
          </Suspense>
        </ErrorBoundary>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    } as any,
  }
);
async function enableMocking() {
  if (VITE_MOCK_RESULTS !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js", // Make sure this file exists in your public folder
      options: {
        // This is important: ensure the scope includes all paths
        scope: "/",
      },
    },
  });
  return;
}
const container = document.getElementById("root");
const root = createRoot(container!);
enableMocking().then(() => {
  root.render(<RouterProvider router={router} future={{ v7_startTransition: true }} />);
});
