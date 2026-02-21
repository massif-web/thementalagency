export const LogoLink = ({
  children,
  draft = false,
}: {
  children: React.ReactNode;
  draft: boolean;
}) => {
  if (draft) {
    return <span className="pointer-events-none">{children}</span>;
  }
  return (
    <a href="/#home" className="inline-flex items-center">
      {children}
    </a>
  );
};
