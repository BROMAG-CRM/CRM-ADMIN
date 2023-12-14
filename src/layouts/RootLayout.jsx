import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import AdminNavbar from "./AdminNavbar";
import { useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();
  console.log(location.pathname.split("/").includes("login"), "lll");
  return (
    <div>
      {location.pathname.split("/").includes("login") ? (
        ""
      ) : (
        <div className="flex flex-col">
          <div>
            <AdminNavbar />
          </div>
          <div>
            <SideNavbar />
          </div>
        </div>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
