import type { MouseEvent } from "react";

import { NAME } from "@/config/site";

import { DEMO_HREF } from "@/config/navigation";

import { Body, Button, ImagePlaceholder, TextLink } from "@/components/ui";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";



export function WhatsNext() {

  const { scrollTo } = useSmoothScroll();



  const goToDemo = (event: MouseEvent<HTMLAnchorElement>) => {

    event.preventDefault();

    scrollTo(DEMO_HREF);

  };



  return (

    <section

      aria-labelledby="whats-next-heading"

      className="border-y border-indigo/5 bg-cream/60 py-10 sm:py-12"

    >

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10">

        <div className="min-w-0 flex-1">

          <p

            id="whats-next-heading"

            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/40"

          >

            What&apos;s next

          </p>

          <Body className="mt-2 text-sm leading-relaxed text-ink/65 sm:text-base">

            On the roadmap: a hyperlocal delivery marketplace — {NAME} grows

            with you so local carts and restaurants reach nearby guests inside

            their own delivery radius, on the same platform you adopt today.

          </Body>

        </div>



        <div className="w-full shrink-0 sm:max-w-[11rem] lg:max-w-[9.5rem]">

          <ImagePlaceholder

            aspectRatio="square"

            alt="Roadmap illustration placeholder — hyperlocal delivery radius"

            caption="TODO: Roadmap visual — delivery radius / local marketplace mockup"

          />

        </div>



        <div className="flex shrink-0 flex-col gap-3 lg:items-start">

          <Button

            size="md"

            href={DEMO_HREF}

            onClick={goToDemo}

            className="w-full shadow-md shadow-teal/25 sm:w-auto"

          >

            Book a demo

          </Button>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

            <TextLink href={DEMO_HREF} onClick={goToDemo} className="text-sm">

              See the roadmap

            </TextLink>

            <TextLink href={DEMO_HREF} onClick={goToDemo} className="text-sm">

              Talk to us

            </TextLink>

          </div>

        </div>

      </div>

    </section>

  );

}

