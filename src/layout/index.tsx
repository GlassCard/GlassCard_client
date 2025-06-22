import { Outlet } from "react-router-dom";
import * as _ from './style';


const Layout = () => {
    return(
        <>
            <_.Container>
                This is Layout
                <Outlet />
            </_.Container>
        </>
    );
}

export default Layout;