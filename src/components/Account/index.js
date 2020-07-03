import React, { useContext } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
    const authUser = useContext(AuthUserContext);

    return (
        <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);