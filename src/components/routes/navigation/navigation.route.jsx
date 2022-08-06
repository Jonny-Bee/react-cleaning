
import {Outlet} from 'react-router-dom';
import { Fragment } from "react";
import MainFooter from "../../footer/footer.component";
import TopNav from '../../navigation/navigation-bar';
const NavigationBar = () =>{
    return(
        <Fragment>
            <TopNav />
            <Outlet/>
            <MainFooter />
        </Fragment>
    )
}
export default NavigationBar;