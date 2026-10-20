import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = {
  src?: string;
  poster?: string;
  alt?: string;
  exposure?: string | number;
  "camera-controls"?: boolean | string;
  "auto-rotate"?: boolean | string;
  "interaction-prompt"?: "auto" | "when-focused" | "none" | string;
  "shadow-intensity"?: string | number;
  "tone-mapping"?: "auto" | "aces" | "commerce" | "neutral" | string;
  "environment-image"?: string;
  "touch-action"?: string;
  "ar"?: boolean | string;
  "ar-modes"?: string;
  "ios-src"?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & ModelViewerAttributes,
        HTMLElement
      >;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": DetailedHTMLProps<
          HTMLAttributes<HTMLElement> & ModelViewerAttributes,
          HTMLElement
        >;
      }
    }
  }
}

export {};
