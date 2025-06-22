import { Outlet } from "react-router-dom";
import * as _ from './style';


const Layout = () => {
    return(
        <>
            <_.Container>
                <Outlet />
            </_.Container>
        </>
    );
}

export default Layout;