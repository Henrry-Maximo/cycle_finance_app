import { Link, type LinkProps, useLocation } from 'react-router-dom';

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="group flex flex-row items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-all duration-300 hover:border-blue-600 active:scale-95 data-[current=true]:text-blue-600"
      {...props}
    />
  );
}
