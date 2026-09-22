import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/components/ui/item";

function TitleRow({ thumbnail, title, metadata, access, onClick }) {
  return (
    <Item
      thumbnail={thumbnail}
      title={title}
      supporting={metadata}
      trailing={
        access ? <Badge variant="secondary">{access}</Badge> : undefined
      }
      onClick={onClick}
    />
  );
}

export { TitleRow };
