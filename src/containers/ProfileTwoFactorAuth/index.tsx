/* tslint:disable jsx-no-lambda  jsx-no-multiline-js */
// import { Checkbox } from '@openware/components';
// import cn from 'classnames';
import { Button } from '@openware/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface ProfileTwoFactorAuthProps {
    is2faEnabled: boolean;
    navigateTo2fa: (enable2fa: boolean) => void;
}

interface ProfileTwoFactorAuthState {
    is2faEnabled: boolean;
}

type Props = ProfileTwoFactorAuthProps;

class ProfileTwoFactorAuthComponent extends React.Component<Props, ProfileTwoFactorAuthState> {
    constructor(props: ProfileTwoFactorAuthProps) {
        super(props);

        this.state = {
          is2faEnabled: props.is2faEnabled,
        };
    }

    public render() {
        const { is2faEnabled } = this.state;
        // const className = is2faEnabled ? 'pg-profile-page__label-value__enabled'
        //                                : 'pg-profile-page__label-value__disabled';
        // const titleClassName = cn('');

        return (
            <div className="pg-profile-page__authentification">
                <div className="pg-profile-page-header">
                    <h2 className="pg-profile-page__authentification-header">
                        <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication" />
                    </h2>
                </div>
                <div className="pg-profile-page__authentification-box">
                    <div className="pg-profile-page__authentification-box__google-auth">
                        {/*{this.renderVerificationLevel('page.body.profile.header.account.profile.email', userLevel, targetLevel)}*/}
                        {this.getIcon(is2faEnabled)}
                        <div className="pg-profile-page__authentification-box__google-auth-name">
                            <div>Email</div>
                            <div>ved****@maxxo.com</div>
                        </div>
                        <div className="pg-profile-page__authentification-box__google-auth-description">
                            Used to withdraw, retrieve password, change security settings and for verification while managing API.
                        </div>
                        <div className="pg-profile-page__authentification-box__google-auth-button-wrapper">
                            <Button
                                label={is2faEnabled ? 'Turn off' : 'Link'}
                                disabled={false}
                                onClick={() => this.handleToggle2fa()}
                            />
                        </div>
                    </div>
                    {/*{this.getIcon(userLevel, targetLevel)}*/}
                </div>
                {/*<label className="pg-profile-page__label">*/}
                    {/*<div>*/}
                        {/*<FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication" />*/}
                    {/*</div>*/}
                    {/*<span className={className}>*/}
                    {/*{is2faEnabled ? <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.message.enable" />*/}
                                  {/*: <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.message.disable" />}*/}
                    {/*</span>*/}
                {/*</label>*/}
                {/*<Checkbox*/}
                    {/*checked={is2faEnabled}*/}
                    {/*className={'pg-profile-page__switch'}*/}
                    {/*onChange={() => this.handleToggle2fa()}*/}
                    {/*label={''}*/}
                    {/*slider={true}*/}
                {/*/>*/}
            </div>
        );
    }

    private handleToggle2fa = () => {
        this.props.navigateTo2fa(!this.state.is2faEnabled);
    }

    private getIcon(otp: boolean) {
        const success = (
            <svg width="20" height="45" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7 1.7L6.7 12.7C6.5 12.9 6.3 13 6 13C5.7 13 5.5 12.9 5.3 12.7L0.3 7.7C-0.1 7.3 -0.1 6.7 0.3 6.3C0.7 5.9 1.3 5.9 1.7 6.3L6 10.6L16.3 0.3C16.7 -0.1 17.3 -0.1 17.7 0.3C18.1 0.7 18.1 1.3 17.7 1.7Z" fill="#05AA81"/>
            </svg>
        );
        const failure = (
            <svg width="16" height="45" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7 12.3C14.1 12.7 14.1 13.3 13.7 13.7C13.5 13.9 13.3 14 13 14C12.7 14 12.5 13.9 12.3 13.7L7 8.4L1.7 13.7C1.5 13.9 1.3 14 1 14C0.7 14 0.5 13.9 0.3 13.7C-0.1 13.3 -0.1 12.7 0.3 12.3L5.6 7L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L7 5.6L12.3 0.3C12.7 -0.1 13.3 -0.1 13.7 0.3C14.1 0.7 14.1 1.3 13.7 1.7L8.4 7L13.7 12.3Z" fill="red"/>
            </svg>
        );

        return otp ? success : failure;
    }
}

export const ProfileTwoFactorAuth = ProfileTwoFactorAuthComponent;
