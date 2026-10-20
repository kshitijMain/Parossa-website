import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";

const fieldClass =
  "w-full rounded-xl border border-indigo/15 bg-white px-4 py-3 font-body text-base text-ink transition-colors placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 disabled:opacity-50";

type FieldProps = {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

export function Field({
  label,
  id,
  error,
  hint,
  required,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-indigo"
      >
        {label}
        {required ? (
          <span className="text-indigo/70" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div aria-describedby={describedBy}>{children}</div>
      {hint ? (
        <p id={hintId} className="font-body text-xs text-ink/45">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="font-body text-sm text-indigo"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, hasError, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={clsx(fieldClass, hasError && "border-indigo/40", className)}
      {...rest}
    />
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, hasError, children, ...rest }, ref) {
    return (
      <select
        ref={ref}
        className={clsx(fieldClass, hasError && "border-indigo/40", className)}
        {...rest}
      >
        {children}
      </select>
    );
  },
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, hasError, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={clsx(
          fieldClass,
          "min-h-[7rem] resize-y",
          hasError && "border-indigo/40",
          className,
        )}
        {...rest}
      />
    );
  },
);
