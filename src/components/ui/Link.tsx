import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import clsx from "clsx";

const linkClasses =
  "font-body font-medium text-teal underline-offset-4 transition-colors hover:text-teal/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

type CommonProps = {
  className?: string;
  children: ReactNode;
};

type TextLinkAsRouter = CommonProps &
  Omit<RouterLinkProps, keyof CommonProps | "className"> & {
    to: RouterLinkProps["to"];
    href?: never;
  };

type TextLinkAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    to?: never;
  };

export type TextLinkProps = TextLinkAsRouter | TextLinkAsAnchor;

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  function TextLink(props, ref) {
    if ("to" in props && props.to !== undefined) {
      const { to, children, className, ...rest } = props;
      return (
        <RouterLink
          ref={ref}
          to={to}
          className={clsx(linkClasses, className)}
          {...rest}
        >
          {children}
        </RouterLink>
      );
    }

    const { href, children, className, ...rest } = props;

    return (
      <a
        ref={ref}
        href={href}
        className={clsx(linkClasses, className)}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
