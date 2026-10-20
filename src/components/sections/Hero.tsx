import { lazy, Suspense, useCallback, useState } from "react";

import type { MouseEvent } from "react";

import { valueProposition } from "@/config/site";

import { IMAGES } from "@/config/images";

import { DEMO_HREF } from "@/config/navigation";

import { Body, Button, Eyebrow, Heading, Lead, OptimizedPicture } from "@/components/ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

import { useHeroCapability } from "@/hooks/useHeroCapability";

import { DemoVideoModal } from "./DemoVideoModal";



/** Lazy-load R3F so three.js never blocks first paint. */

const HeroCanvas = lazy(() => import("@/three/HeroCanvas"));



const TRUST_LINE = "TODO: Built for live orders and payments.";



function HeroPoster() {

  return (

    <div

      className="absolute inset-0 bg-gradient-to-br from-gold-from/30 via-cream to-indigo/10"

      aria-hidden="true"

    />

  );

}



function StaticHeroImage() {

  const [failed, setFailed] = useState(false);



  return (

    <>

      <HeroPoster />

      {!failed ? (

        <OptimizedPicture

          basePath={IMAGES.heroFallback}

          alt="A premium table moment with a digital menu and dish presentation"

          width={960}

          height={1200}

          sizes="(max-width: 1024px) 100vw, 50vw"

          className="absolute inset-0 h-full w-full"

          imgClassName="h-full w-full object-cover"

          onError={() => setFailed(true)}

        />

      ) : (

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">

          <Body className="max-w-xs text-sm text-indigo/60">
            TODO: Add public/img/hero-fallback (AVIF, WebP, JPG) — a still of the
            table / dish moment for mobile and reduced-motion.
          </Body>

        </div>

      )}

    </>

  );

}



function HeroVisual() {

  const { staticHero, ready } = useHeroCapability();



  // Until capability is known, show a lightweight poster (no three.js).

  if (!ready || staticHero) {

    return (

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-indigo/10 bg-cream sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[calc(100vh-4.25rem)] lg:rounded-none lg:border-0">

        {ready ? <StaticHeroImage /> : <HeroPoster />}

      </div>

    );

  }



  return (

    <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[calc(100vh-4.25rem)]">

      <HeroPoster />

      <Suspense fallback={<HeroPoster />}>

        <ErrorBoundary>

          <HeroCanvas className="absolute inset-0 h-full w-full" />

        </ErrorBoundary>

      </Suspense>

    </div>

  );

}



export function Hero() {

  const { scrollTo } = useSmoothScroll();

  const [videoOpen, setVideoOpen] = useState(false);

  const closeVideo = useCallback(() => setVideoOpen(false), []);



  return (

    <section

      id="top"

      className="relative overflow-hidden border-b border-indigo/5"

      aria-labelledby="hero-heading"

    >

      <div className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-6xl lg:grid-cols-2 lg:items-center">

        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          <Eyebrow>{valueProposition.eyebrow}</Eyebrow>

          <Heading level={1} id="hero-heading" className="mt-4 max-w-xl">

            {valueProposition.headline}

          </Heading>

          <Lead className="mt-6 max-w-lg">{valueProposition.subhead}</Lead>



          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">

            <Button

              size="lg"

              href={DEMO_HREF}

              onClick={(event: MouseEvent<HTMLAnchorElement>) => {

                event.preventDefault();

                scrollTo(DEMO_HREF);

              }}

            >

              Book a demo

            </Button>

            <Button

              variant="secondary"

              size="lg"

              type="button"

              onClick={() => setVideoOpen(true)}

            >

              Watch the 2-min demo

            </Button>

          </div>



          <Body className="mt-5 text-sm text-ink/55">{TRUST_LINE}</Body>

        </div>



        <div className="relative px-5 pb-12 sm:px-8 lg:h-full lg:px-0 lg:pb-0">

          <HeroVisual />

        </div>

      </div>



      <DemoVideoModal open={videoOpen} onClose={closeVideo} />

    </section>

  );

}

