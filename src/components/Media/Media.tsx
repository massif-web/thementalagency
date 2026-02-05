import type React from "react";
import { ImageMedia } from "./ImageMedia";
import type { Props } from "./types";
import { VideoMedia } from "./VideoMedia";

export const Media: React.FC<Props> = (props) => {
  const { resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");

  return <>{isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}</>;
};
