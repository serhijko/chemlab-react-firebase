import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import useFormInput from '../../handlers/useFormInput';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBase = props => {
    const [username, setUsername] = useState(INITIAL_STATE.username);
    const [email, setEmail] = useState(INITIAL_STATE.email);
    const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
    const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
    const [error, setError] = useState(INITIAL_STATE.error);

    const onSubmit = event => {
        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                setUsername(INITIAL_STATE.username);
                setEmail(INITIAL_STATE.email);
                setPasswordOne(INITIAL_STATE.passwordOne);
                setPasswordTwo(INITIAL_STATE.passwordTwo);
                setError(INITIAL_STATE.error);
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    };

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                {...useFormInput(username, setUsername)}
                type="text"
                placeholder="Full Name"
            />
            <input
                {...useFormInput(email, setEmail)}
                type="text"
                placeholder="Email Address"
            />
            <input
                {...useFormInput(passwordOne, setPasswordOne)}
                type="password"
                placeholder="Password"
            />
            <input
                {...useFormInput(passwordTwo, setPasswordTwo)}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
                Sign Up
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
};

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };