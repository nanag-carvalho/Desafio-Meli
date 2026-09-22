import * as React from "react";
import { Heart, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActionTile } from "@/components/compositions/action-tile";
import { cn } from "cn";

const ratingOptions = [
  { value: "not-for-me", label: "Não é para mim", icon: ThumbsDown },
  { value: "liked", label: "Gostei", icon: ThumbsUp },
  { value: "loved", label: "Amei", icon: Heart },
];

function RatingAction({
  className,
  value: controlledValue,
  onValueChange,
  withinContext = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const selected = ratingOptions.find((option) => option.value === value);
  const SelectedIcon = selected?.icon ?? Star;

  const select = (nextValue) => {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ActionTile
          icon={SelectedIcon}
          label={selected ? "Avaliado" : "Avaliar"}
          aria-label={
            selected
              ? `Avaliado: ${selected.label}. Alterar avaliação`
              : "Avaliar título"
          }
          className={cn(
            selected && "text-foreground [&_svg]:text-primary",
            className,
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        className="rating-action-popover w-[264px] flex-row gap-1 p-2"
        sideOffset={8}
        portalled={!withinContext}
      >
        {ratingOptions.map(({ value: optionValue, label, icon: Icon }) => (
          <button
            type="button"
            key={optionValue}
            data-selected={value === optionValue || undefined}
            onClick={() => select(optionValue)}
            className="flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg border-0 bg-transparent p-2 text-center text-[length:var(--type-label-caption-size)] leading-[var(--type-label-caption-line)] [font-weight:var(--type-label-caption-weight)] text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/35 data-selected:bg-muted [&_svg]:size-5"
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { RatingAction, ratingOptions };
