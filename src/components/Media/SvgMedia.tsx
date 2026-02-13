import { getMediaUrl } from "@/utilities/getMediaUrl";
import type { Props as MediaProps } from "./types";

export const SvgMedia: React.FC<MediaProps> = async ({
  className = "size-5",
  resource,
}) => {
  let src: string = "";
  if (!src && resource && typeof resource === "object") {
    const cacheTag = resource.updatedAt;
    const url = resource.url;
    src = getMediaUrl(url || "", cacheTag);
  }
  const res = await fetch(src);
  let svg = await res.text();
  if (className) {
    svg = svg
      .replace(/class="[^"]*"/, "")
      .replace("<svg", `<svg class="${className}"`);
  }

  return (
    // biome-ignore lint: this is necessary to render the svg properly
    <div className="contents" dangerouslySetInnerHTML={{ __html: svg }} />
  );
};
