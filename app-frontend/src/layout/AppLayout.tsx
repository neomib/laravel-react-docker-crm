import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { SidebarProvider } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";

const LayoutContent: React.FC = () => {

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out `}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken)
  return (
    accessToken ? <SidebarProvider>
      <LayoutContent />
    </SidebarProvider> : <Navigate to='/signin' />
  )

};

export default AppLayout;
