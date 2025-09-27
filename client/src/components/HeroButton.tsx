export const HeroButton = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) => (
  <a href={href} className={`btn px-6 py-2 font-bold ${className}`}>
    {children}
  </a>
);
