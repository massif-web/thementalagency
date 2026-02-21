"use client";

export const Copyright: React.FC<{ siteName: string }> = ({ siteName }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      &copy; {currentYear} {siteName}
    </div>
  );
};
