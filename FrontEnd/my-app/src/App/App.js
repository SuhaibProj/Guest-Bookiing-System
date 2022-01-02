import Create from './Create'
import SiteHeader from '../Components/SiteHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Success from './Success'
import LeftSideMenu from '../Components/LeftSideMenu';

export default function App(){
    return(
        <Router>
            <LeftSideMenu />
            <div className='app-main'>
                <SiteHeader />
                    <Switch>
                        <Route exact path="/">
                            <Create />
                        </Route>
                        <Route path="/Success">
                            <Success />
                        </Route>
                    </Switch>  
            </div>
        </Router>
    )
}