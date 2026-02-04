import clsx from "clsx";
import NextImage from "next/image";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <NextImage
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("w-full max-w-37.5 h-auto", className)}
      unoptimized
      src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
    />
  );
};
