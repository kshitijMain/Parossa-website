import { useEffect, useId, useRef } from "react";

import { Body, Heading } from "@/components/ui";

import { useFocusTrap } from "@/hooks/useFocusTrap";



type DemoVideoModalProps = {

  open: boolean;

  onClose: () => void;

};



export function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {

  const titleId = useId();

  const closeRef = useRef<HTMLButtonElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);



  useFocusTrap(open, panelRef);



  useEffect(() => {

    if (!open) return;



    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeRef.current?.focus();



    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === "Escape") onClose();

    };



    document.addEventListener("keydown", onKeyDown);

    return () => {

      document.body.style.overflow = prev;

      document.removeEventListener("keydown", onKeyDown);

    };

  }, [open, onClose]);



  if (!open) return null;



  return (

    <div

      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"

      role="dialog"

      aria-modal="true"

      aria-labelledby={titleId}

    >

      <button

        type="button"

        className="absolute inset-0 bg-indigo/50 backdrop-blur-sm"

        aria-label="Close demo video"

        onClick={onClose}

      />



      <div

        ref={panelRef}

        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-indigo/10 bg-cream shadow-xl shadow-indigo/20"

      >

        <div className="flex items-start justify-between gap-4 border-b border-indigo/10 px-5 py-4 sm:px-6">

          <div>

            <Heading level={3} id={titleId} className="text-xl sm:text-2xl">

              Watch the 2-min demo

            </Heading>

            <Body className="mt-1 text-sm text-ink/60">

              TODO: Embed product demo video.

            </Body>

          </div>

          <button

            ref={closeRef}

            type="button"

            onClick={onClose}

            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo transition-colors hover:bg-indigo/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"

            aria-label="Close"

          >

            <span aria-hidden="true" className="text-2xl leading-none">

              ×

            </span>

          </button>

        </div>



        <div className="p-5 sm:p-6">

          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-indigo/20 bg-gradient-to-br from-gold-from/20 via-cream to-indigo/10">

            <div className="px-6 text-center">

              <div

                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-white"

                aria-hidden="true"

              >

                <svg

                  viewBox="0 0 24 24"

                  className="h-6 w-6 translate-x-0.5"

                  fill="currentColor"

                >

                  <path d="M8 5v14l11-7L8 5z" />

                </svg>

              </div>

              <Body className="text-indigo/70">

                TODO: Drop a short demo video here (compressed MP4/WebM, poster

                frame in AVIF/WebP).

              </Body>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

