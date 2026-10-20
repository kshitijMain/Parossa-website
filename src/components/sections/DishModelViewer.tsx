import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { IMAGES } from "@/config/images";

import { isGlbAvailable } from "@/lib/checkStaticAsset";



const DISH_GLB_SRC = "/models/dish-placeholder.glb";

const DISH_POSTER_SRC = `${IMAGES.dishPoster}.webp`;



type DishModelViewerProps = {

  className?: string;

  active: boolean;

};



function LoadingState() {

  return (

    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gold-from/20 via-cream to-indigo/5 px-4 text-center">

      <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 font-body text-xs font-semibold text-teal">

        View in 3D

      </span>

      <p className="font-body text-xs text-indigo/50">Loading 3D preview…</p>

    </div>

  );

}



function MissingState() {

  return (

    <div className="absolute inset-0 flex items-center justify-center bg-cream px-4 text-center">

      <p className="font-body text-sm text-indigo/60">

        TODO: Add {DISH_GLB_SRC} — interactive 3D preview will appear here.

      </p>

    </div>

  );

}



/**

 * In-browser interactive 3D dish viewer (rotate / zoom).

 * AR is intentionally NOT enabled in v1 — see commented block below.

 */

export function DishModelViewer({ className, active }: DishModelViewerProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"idle" | "checking" | "ready" | "error">(

    "idle",

  );



  useEffect(() => {

    if (!active || phase !== "idle") return;



    let cancelled = false;

    setPhase("checking");



    Promise.all([

      import("@google/model-viewer"),

      isGlbAvailable(DISH_GLB_SRC),

    ])

      .then(([, glbAvailable]) => {

        if (cancelled) return;

        setPhase(glbAvailable ? "ready" : "error");

      })

      .catch(() => {

        if (!cancelled) setPhase("error");

      });



    return () => {

      cancelled = true;

    };

  }, [active, phase]);



  useEffect(() => {

    if (phase !== "ready" || !containerRef.current) return;



    const host = containerRef.current;

    const viewer = document.createElement("model-viewer");

    viewer.setAttribute("src", DISH_GLB_SRC);

    viewer.setAttribute("poster", DISH_POSTER_SRC);

    viewer.setAttribute(

      "alt",

      "Interactive 3D preview of a signature dish — rotate and zoom before ordering",

    );

    viewer.setAttribute("camera-controls", "");

    viewer.setAttribute("auto-rotate", "");

    viewer.setAttribute("interaction-prompt", "none");

    viewer.setAttribute("shadow-intensity", "1");

    viewer.setAttribute("exposure", "1");

    viewer.setAttribute("tone-mapping", "commerce");

    viewer.setAttribute("environment-image", "neutral");

    viewer.setAttribute("touch-action", "pan-y");

    viewer.className = "dish-model-viewer h-full w-full";



    const onError = () => setPhase("error");

    viewer.addEventListener("error", onError);

    host.replaceChildren(viewer);



    return () => {

      viewer.removeEventListener("error", onError);

      host.replaceChildren();

    };

  }, [phase]);



  return (

    <div ref={containerRef} className={clsx("relative h-full w-full", className)}>

      {phase === "checking" ? <LoadingState /> : null}

      {phase === "error" ? <MissingState /> : null}



      {/*

        TODO(AR) — DISABLED IN v1. Do not enable for launch.



        To enable AR later:

        1. viewer.setAttribute("ar", "");

        2. viewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");

        3. viewer.setAttribute("ios-src", "/models/dish-placeholder.usdz");

      */}

    </div>

  );

}

