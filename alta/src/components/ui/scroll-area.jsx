import * as React from "react";
import { cn } from "cn";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

function ScrollArea({
  className,
  children,
  orientation = "vertical",
  dragToScroll = orientation === "horizontal",
  ...props
}) {
  const viewportRef = React.useRef(null);
  const gesture = React.useRef({ active: false, moved: false, x: 0, left: 0 });
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    if (orientation === "horizontal" && viewportRef.current) {
      viewportRef.current.scrollLeft = 0;
    }
  }, [orientation]);

  const dragProps = dragToScroll
    ? {
        "data-dragging": dragging || undefined,
        onPointerDownCapture: (event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          gesture.current = {
            active: true,
            moved: false,
            x: event.clientX,
            left: viewportRef.current?.scrollLeft ?? 0,
          };
        },
        onPointerMoveCapture: (event) => {
          if (!gesture.current.active || !viewportRef.current) return;
          const delta = event.clientX - gesture.current.x;
          if (Math.abs(delta) > 5) {
            if (!gesture.current.moved) {
              viewportRef.current.setPointerCapture?.(event.pointerId);
            }
            gesture.current.moved = true;
            setDragging(true);
          }
          if (gesture.current.moved) {
            viewportRef.current.scrollLeft = gesture.current.left - delta;
            event.preventDefault();
          }
        },
        onPointerUpCapture: (event) => {
          if (!gesture.current.active) return;
          gesture.current.active = false;
          setDragging(false);
          if (viewportRef.current?.hasPointerCapture?.(event.pointerId)) {
            viewportRef.current.releasePointerCapture(event.pointerId);
          }
        },
        onPointerCancelCapture: () => {
          gesture.current.active = false;
          gesture.current.moved = false;
          setDragging(false);
        },
        onClickCapture: (event) => {
          if (!gesture.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          gesture.current.moved = false;
        },
      }
    : {};

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        data-drag-scroll={dragToScroll || undefined}
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
        {...dragProps}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner className="bg-transparent" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none bg-transparent opacity-55 transition-opacity select-none hover:opacity-100 data-horizontal:h-1 data-horizontal:flex-col data-vertical:h-full data-vertical:w-1",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-foreground/25 transition-colors hover:bg-foreground/45"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
