import Image from "next/image";
import Link from "next/link";

import cx from "classnames";

interface MenuItemProps {
  title: string;
  icon:
    | "ic-menu-overview"
    | "ic-menu-card"
    | "ic-menu-logout"
    | "ic-menu-messages"
    | "ic-menu-rewards"
    | "ic-menu-settings"
    | "ic-menu-transactions";
  active?: boolean;
  href: string;
}

function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active = false, href = "/" } = props;

  const classMenuItem = cx({
    "item": true,
    "mb-30": true,
    "active": active,
  });

  return (
    <div className={classMenuItem}>
      <div className="icon me-3 d-flex align-items-center">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} />
      </div>

      <p className="item-title m-0">
        <Link href={href}>
          <a className="text-lg text-decoration-none">{title}</a>
        </Link>
      </p>
    </div>
  );
}

export default MenuItem;
