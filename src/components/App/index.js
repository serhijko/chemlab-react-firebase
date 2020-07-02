import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const App = props => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listener = props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? setAuthUser(authUser)
                : setAuthUser(null);
        });
        return () => listener();
    }, [props.firebase.auth]);

    return (
        <Router>
            <div>
                <Navigation authUser={authUser} />

                <hr />

                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            </div>
        </Router>
    );
}

export default withFirebase(App);