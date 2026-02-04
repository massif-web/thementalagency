import { getServerSideURL } from "@/utilities/getURL";

type Params = {
  path: string | Promise<string> | null;
  preview: boolean;
};
export const generatePageURL = ({ path, preview }: Params) => {
  const serverUrl = getServerSideURL();
  return path && serverUrl
    ? `${serverUrl}${preview ? "/preview" : ""}${path}`
    : null;
};
