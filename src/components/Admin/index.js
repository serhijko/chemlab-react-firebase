import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin</h1>
            <p>The Admin Page is accessible by every signed in admin user.</p>

            <Switch>
                <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
                <Route exact path={ROUTES.ADMIN} component={UserList} />
            </Switch>
        </div>
    );
};

const UserListBase = props => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);

        props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            setUsers(usersList);
            setLoading(false);
        });

        return () => {
            props.firebase.users().off();
        }
    }, [props.firebase]);

    return (
        <div>
            <h2>Users</h2>
            {loading && <div>Loading ...</div>}
            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username.firstName + ' ' + user.username.lastName}
                        </span>
                        <span>
                            <Link
                                to={{
                                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                    state: { user },
                                }}
                            >
                                Details
                            </Link>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UserItemBase = props => {
    const [loading, setLoading] = useState(false);
    const initialUserState = { user: null, ...props.location.state };
    const [user, setUser] = useState(initialUserState.user);

    useEffect(() => {
        if (user) {
            return;
        }

        setLoading(true);

        props.firebase
            .user(props.match.params.id)
            .on('value', snapshot => {
                setUser(snapshot.val());
                setLoading(false);
            });

        return () => {
            props.firebase.user(props.match.params.id).off();
        }
    }, [user, props.firebase, props.match.params.id]);

    const onSendPasswordResetEmail = () => {
        props.firebase.doPasswordReset(user.email);
    };

    return (
        <div>
            <h2>User ({props.match.params.id})</h2>
            {loading && <div>Loading ...</div>}

            {user && (
                <div>
                    <span>
                        <strong>ID:</strong> {user.uid}
                    </span>
                    <span>
                        <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                        <strong>Username:</strong> {user.username.firstName + ' ' + user.username.lastName}
                    </span>
                    <span>
                        <button
                            type="button"
                            onClick={onSendPasswordResetEmail}
                        >
                            Send Password Reset
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AdminPage);