import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './component/login/Login';
import Navbar from './component/comman/Navbar';
import Profile from './component/profile/Profile';
import Register from './component/register/Register';
import Edit from "./component/editUser/Edit";
import Home from "./component/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route exact path="/" component={Login}/>
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/editUser/:id" component={Edit}/>
                    <Route path="/home/:id" component={Home}/>


                </Switch>
            </div>
        </Router>
    );
}

export default App;
