import { FC } from "react";
import Cookies from "js-cookie";
import { NextRouter, useRouter } from "next/router";
import Footer from "./Footer";
import Profile from "./Profile";
import MenuItem from "./MenuItem";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
}

const SideBar: FC<SideBarProps> = ({ activeMenu }) => {
  const router: NextRouter = useRouter();

  const onLogout = (): void => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Overview"
            icon="ic-menu-overview"
            active={activeMenu === "overview"}
            href="/member"
          />
          <MenuItem
            title="Transactions"
            icon="ic-menu-transactions"
            href="/member/transactions"
            active={activeMenu === "transactions"}
          />
          <MenuItem title="Messages" icon="ic-menu-messages" href="/member" />
          <MenuItem title="Card" icon="ic-menu-card" href="/member" />
          <MenuItem title="Rewards" icon="ic-menu-rewards" href="/member" />
          <MenuItem
            title="Settings"
            icon="ic-menu-settings"
            href="/member/edit-profile"
            active={activeMenu === "settings"}
          />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogout} />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default SideBar;
