import React, { useContext, useState } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified;

const DefaultComponent = ({
    buttonTitle = 'Send confirmation E-mail.',
    children,
    onClick,
    disabled,
}) => (
    <div>
        <p>{children}</p>
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {buttonTitle}
        </button>
    </div>
);

const MESSAGE_IF_EMAIL_IS_SENT = `
    E-mail confirmation sent: Check your E-Mails (Spam
    folder included) for a confirmation E-Mail.
    Refresh this page once you confirmed your E-mail.
`;

const MESSAGE_IF_EMAIL_IS_NOT_SENT = `
    Verify your E-mail: Check your E-Mails (Spam folder
    included) for a confirmation E-Mail or send
    another confirmation E-mail.
`;

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
            <DefaultComponent
                onClick={onSendEmailVerification}
                disabled={isSent}
            >
                {isSent ? (
                    MESSAGE_IF_EMAIL_IS_SENT
                ) : (
                    MESSAGE_IF_EMAIL_IS_NOT_SENT
                )}
            </DefaultComponent>
        ) : (
            <Component {...props} />
        ));
    };

    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;