import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "danger";
type Size = "md" | "sm";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.15em] transition disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
  outline: "border border-primary text-primary hover:bg-secondary",
  danger: "bg-destructive text-white shadow-md hover:bg-destructive/90",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

function getButtonClasses(variant: Variant, size: Size, className: string) {
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses(variant, size, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={getButtonClasses(variant, size, className)} {...props} />
  );
}
