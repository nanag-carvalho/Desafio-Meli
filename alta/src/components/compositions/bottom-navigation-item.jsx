import * as React from "react";
import { cn } from "cn";
import { motion } from "motion/react";

function BottomNavigationItem({
  className,
  icon: Icon,
  label,
  active = false,
  ...props
}) {
  return (
    <motion.button
      data-slot="bottom-navigation-item"
      data-active={active || undefined}
      className={cn(
        "relative inline-flex min-h-13 min-w-14 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-navigation-item)] border border-transparent px-2 text-[length:var(--type-label-caption-size)] leading-[var(--type-label-caption-line)] [font-weight:var(--type-label-caption-weight)] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-active:text-primary [&_svg]:relative [&_svg]:z-10 [&_svg]:size-5",
        className,
      )}
      whileTap={{ scale: 0.94 }}
      {...props}
    >
      {active ? (
        <motion.span
          layoutId="bottom-navigation-active"
          className="absolute inset-0 rounded-[var(--radius-navigation-item)] bg-muted"
          transition={{ type: "spring", stiffness: 440, damping: 34 }}
          aria-hidden="true"
        />
      ) : null}
      <Icon aria-hidden="true" />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

export { BottomNavigationItem };
