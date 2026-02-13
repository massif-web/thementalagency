import type React from "react";
import { ImageMedia } from "./ImageMedia";
import { SvgMedia } from "./SvgMedia";
import type { Props } from "./types";
import { VideoMedia } from "./VideoMedia";

export const Media: React.FC<Props> = ({ svgInline = true, ...props }) => {
  const { resource } = props;
  const mimeType = typeof resource === "object" ? resource?.mimeType : null;
  if (!mimeType) return null;
  switch (mimeType) {
    case "image/svg+xml":
      return svgInline ? <SvgMedia {...props} /> : <ImageMedia {...props} />;
    case "video/mp4":
    case "video/webm":
    case "video/ogg":
      return <VideoMedia {...props} />;
    default:
      return <ImageMedia {...props} />;
  }
};
