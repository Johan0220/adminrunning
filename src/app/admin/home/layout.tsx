import Sidebar from "@/components/home/sideBar";
import Navbar from "@/components/home/navBar";
import LoadingLogin from "@/components/home/loadingLogin";
import { ReactNode } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

type Props = {
    children: ReactNode
}
const Layout = (props : Props) => {
    return(
        <div className="mx-auto w-full">      
            <main className="none relative">
                <LoadingLogin/>
                <Sidebar/>
                {props.children}
            </main>
        </div>
    )
}
export default Layout;