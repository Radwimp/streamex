import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ProfileAccountActivity } from '../ProfileAccountActivity';
import { ProfileApiKeys } from '../ProfileApiKeys';
import { ProfileAuthDetails } from '../ProfileAuthDetails';
import { ProfileTwoFactorAuth } from '../ProfileTwoFactorAuth';
import { ProfileVerification } from '../ProfileVerification';
import { ReferralProgram } from '../ReferralProgram';

// import { ProfileTiers } from '../ProfileTiers';

class ProfileComponent extends React.Component<RouterProps> {
    public goBack = () => {
        this.props.history.goBack();
    };

    public render() {
        return (
            <div className="pg-container pg-profile-page">
                <div className="pg-profile-page__details">
                    <div className="pg-profile-page-header">
                        <h3 className="pg-profile-page__text-purple">
                            <FormattedMessage id="page.body.profile.header.account"/>
                        </h3>
                    </div>
                    <ProfileAuthDetails/>
                    <ReferralProgram/>
                </div>
                <ProfileVerification/>
                <ProfileTwoFactorAuth
                    is2faEnabled={false}
                    navigateTo2fa={this.foo}
                />
                <ProfileApiKeys/>
                <ProfileAccountActivity/>
            </div>
        );
    }

    private foo = () => {
        alert('potato');
    }
}

// tslint:disable-next-line:no-any
const Profile = withRouter(ProfileComponent as any);

export {
    Profile,
};
