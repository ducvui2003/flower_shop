import { NavLink as RRNavLink } from "react-router-dom";

type NavLinkProps = {
  to: string; // only valid paths allowed
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ to, children, className }: NavLinkProps) {
  return (
    <RRNavLink to={to} className={className}>
      {children}
    </RRNavLink>
  );
}
