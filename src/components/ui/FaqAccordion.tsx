import { useId, useRef, useState, type KeyboardEvent } from "react";

import clsx from "clsx";

import { Body } from "./Typography";



export type FaqItem = {

  question: string;

  answer: string;

};



type FaqAccordionProps = {

  items: FaqItem[];

  className?: string;

};



export function FaqAccordion({ items, className }: FaqAccordionProps) {

  const baseId = useId();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);



  const focusButton = (index: number) => {

    buttonRefs.current[index]?.focus();

  };



  const handleKeyDown = (

    event: KeyboardEvent<HTMLButtonElement>,

    index: number,

  ) => {

    const lastIndex = items.length - 1;



    switch (event.key) {

      case "ArrowDown":

        event.preventDefault();

        focusButton(index < lastIndex ? index + 1 : 0);

        break;

      case "ArrowUp":

        event.preventDefault();

        focusButton(index > 0 ? index - 1 : lastIndex);

        break;

      case "Home":

        event.preventDefault();

        focusButton(0);

        break;

      case "End":

        event.preventDefault();

        focusButton(lastIndex);

        break;

      default:

        break;

    }

  };



  return (

    <div className={clsx("divide-y divide-indigo/10 rounded-2xl border border-indigo/10 bg-white/70", className)}>

      {items.map((item, index) => {

        const isOpen = openIndex === index;

        const panelId = `${baseId}-panel-${index}`;

        const buttonId = `${baseId}-button-${index}`;



        return (

          <div key={item.question}>

            <h3>

              <button

                id={buttonId}

                ref={(element) => {

                  buttonRefs.current[index] = element;

                }}

                type="button"

                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-indigo/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal sm:px-6 sm:py-5"

                aria-expanded={isOpen}

                aria-controls={panelId}

                onClick={() => setOpenIndex(isOpen ? null : index)}

                onKeyDown={(event) => handleKeyDown(event, index)}

              >

                <span className="font-display text-base font-semibold text-indigo sm:text-lg">

                  {item.question}

                </span>

                <span

                  className={clsx(

                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo/15 text-indigo transition-transform",

                    isOpen && "rotate-45 bg-indigo/5",

                  )}

                  aria-hidden="true"

                >

                  +

                </span>

              </button>

            </h3>

            <div

              id={panelId}

              role="region"

              aria-labelledby={buttonId}

              hidden={!isOpen}

              className={clsx(!isOpen && "hidden")}

            >

              <Body className="px-5 pb-5 sm:px-6 sm:pb-6">{item.answer}</Body>

            </div>

          </div>

        );

      })}

    </div>

  );

}

