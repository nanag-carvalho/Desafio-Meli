import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function DropdownSelect({
  ariaLabel,
  defaultValue,
  options,
  placeholder = "Selecionar",
}) {
  const [value, setValue] = React.useState(defaultValue);
  const selected = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-slot="dropdown-trigger"
          className="dropdown-trigger"
          aria-label={ariaLabel}
        >
          <span>{selected?.label ?? placeholder}</span>
          <ChevronDownIcon aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-content" align="start">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
              {value === option.value && <CheckIcon aria-hidden="true" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DropdownSelect };
