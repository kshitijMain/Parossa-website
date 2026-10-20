import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal/90 active:bg-teal/80 shadow-sm shadow-teal/20",
  secondary:
    "border-2 border-indigo bg-transparent text-indigo hover:bg-indigo/5 active:bg-indigo/10",
  ghost: "bg-transparent text-indigo hover:bg-indigo/5 active:bg-indigo/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsRouterLink = CommonProps &
  Omit<LinkProps, keyof CommonProps | "className"> & {
    to: LinkProps["to"];
    href?: never;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    to?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return clsx(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  if ("to" in props && props.to !== undefined) {
    const { to, children, variant, size, className, ...rest } = props;
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        to={to}
        className={buttonClassName(variant, size, className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, children, variant, size, className, ...rest } = props;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        className={buttonClassName(variant, size, className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { type = "button", children, variant, size, className, ...rest } = props;

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      className={buttonClassName(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  );
});
