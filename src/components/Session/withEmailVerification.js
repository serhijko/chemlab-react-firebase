import React, { useContext, useState } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified;

const withEmailVerification = Component => {
    const WithEmailVerification = props => {
        const [isSent, setIsSent] = useState(false);
        const authUser = useContext(AuthUserContext);

        const onSendEmailVerification = () => {
            props.firebase
                .doSendEmailVerification()
                .then(() => setIsSent(true));
        };

        return (needsEmailVerification(authUser) ? (
                <div>
                    {isSent ? (
                        <p>
                            E-mail confirmation sent: Check your E-Mails (Spam
                            folder included) for a confirmation E-Mail.
                            Refresh this page once you confirmed your E-mail.
                        </p>
                    ) : (
                        <p>
                            Verify your E-mail: Check your E-Mails (Spam folder
                            included) for a confirmation E-Mail or send
                            another confirmation E-mail.
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={onSendEmailVerification}
                        disabled={isSent}
                    >
                        Send confirmation E-mail.
                    </button>
                </div>
            ) : (
                <Component {...props} />
            ));
    };

    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;