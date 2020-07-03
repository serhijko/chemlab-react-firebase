import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
  </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

const PasswordForgetFormBase = props => {
    const [email, setEmail] = useState(INITIAL_STATE.email);
    const [error, setError] = useState(INITIAL_STATE.error);

    const onSubmit = event => {
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail(INITIAL_STATE.email);
                setError(INITIAL_STATE.error);
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    };

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                {...useFormInput(email, setEmail)}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
};

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
    </p>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

const PasswordForgetFormBase = props => {
    const [email, setEmail] = useState(INITIAL_STATE.email);
    const [error, setError] = useState(INITIAL_STATE.error);

    const onSubmit = event => {
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail(INITIAL_STATE.email);
                setError(INITIAL_STATE.error);
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    }

    const onChange = event => {
        setEmail(event.target.value);
    };

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
};

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };