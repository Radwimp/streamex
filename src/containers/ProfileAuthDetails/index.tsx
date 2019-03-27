import {
    Button,
    Modal,
} from '@openware/components';
import cr from 'classnames';
import { History } from 'history';
import * as React from 'react';
import {
    FormattedMessage,
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  CustomInput,
} from '../../components';
import {
    PASSWORD_REGEX,
} from '../../helpers';
import {
  RootState,
  selectUserInfo,
  User,
} from '../../modules';
import {
    changePasswordFetch,
    selectChangePasswordSuccess,
} from '../../modules/user/profile';
import {ReferralProgram} from '../ReferralProgram';
// import { ProfileTwoFactorAuth } from '../ProfileTwoFactorAuth';

interface ReduxProps {
    user: User;
    passwordChangeSuccess?: boolean;
}

interface RouterProps {
    history: History;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface DispatchProps {
    changePassword: typeof changePasswordFetch;
    clearPasswordChangeError: () => void;
}

interface ProfileProps {
    showModal: boolean;
}

interface State {
    showChangeModal: boolean;
    showModal: boolean;
    oldPassword: string;
    newPassword: string;
    confirmationPassword: string;
    oldPasswordFocus: boolean;
    newPasswordFocus: boolean;
    confirmPasswordFocus: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & ProfileProps & InjectedIntlProps & OnChangeEvent;

class ProfileAuthDetailsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showChangeModal: false,
            showModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            oldPasswordFocus: false,
            newPasswordFocus: false,
            confirmPasswordFocus: false,
        };
    }

    public componentWillReceiveProps(next: Props) {
        if (next.passwordChangeSuccess) {
            this.setState({
                showChangeModal: false,
                oldPassword: '',
                newPassword: '',
                confirmationPassword: '',
            });
        }
    }

    public render() {
        const {
            user,
        } = this.props;
        const {
            oldPasswordFocus,
            newPasswordFocus,
            confirmationPassword,
            oldPassword,
            newPassword,
            confirmPasswordFocus,
        } = this.state;

        const oldPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': oldPasswordFocus,
        });

        const newPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': newPasswordFocus,
        });

        const confirmPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': confirmPasswordFocus,
        });

        const changeModalBody = (
            <div className="cr-email-form__form-content">
                <div className={oldPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.old'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.old'})}
                        defaultLabel="Old password"
                        handleChangeInput={this.handleOldPassword}
                        inputValue={oldPassword}
                        handleFocusInput={this.handleFieldFocus('oldPassword')}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className={newPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        defaultLabel="New password"
                        handleChangeInput={this.handleNewPassword}
                        inputValue={newPassword}
                        handleFocusInput={this.handleFieldFocus('newPassword')}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className={confirmPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        defaultLabel="Password confirmation"
                        handleChangeInput={this.handleConfPassword}
                        inputValue={confirmationPassword}
                        handleFocusInput={this.handleFieldFocus('confirmationPassword')}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className="cr-email-form__button-wrapper">
                    <Button
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.button.change'})}
                        className={this.isValidForm() ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled'}
                        disabled={!this.isValidForm()}
                        onClick={this.handleChangePassword}
                    />
                </div>
            </div>
        );

        const modal = this.state.showChangeModal ? (
            <div className="cr-modal">
              <div className="cr-email-form">
                <div className="pg-change-password-screen">
                  {this.renderChangeModalHeader()}
                  {changeModalBody}
                </div>
              </div>
            </div>
        ) : null;

        return (
            <div className="pg-profile-page__details-box">
                <div className="pg-profile-page__left-col">
                    <div className="pg-profile-page__left-col__box">
                        <div>
                            <div className="pg-profile-page__left-col__box-image">
                                <img src="https://pbs.twimg.com/profile_images/1276117006/rubikcatavatar_400x400.JPG" alt="image" />
                            </div>
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34Z" fill="url(#paint0_linear)"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.6254 15.9731C21.5752 15.9228 21.523 15.8707 21.4728 15.8204C21.4322 15.7799 21.3916 15.7393 21.353 15.7007C20.6091 14.9568 19.8652 14.2129 19.1213 13.469C18.8489 13.1966 18.5745 12.9242 18.3021 12.6498C18.2094 12.5571 18.1166 12.4643 18.0258 12.3716C17.935 12.2808 17.8442 12.19 17.7534 12.0992C17.4172 12.4353 17.0791 12.7735 16.7429 13.1097C16.256 13.5966 15.7691 14.0835 15.2822 14.5704C14.7257 15.1268 14.1712 15.6813 13.6167 16.2359C13.0622 16.7904 12.5076 17.3449 11.9531 17.8994L10.5079 19.3447C10.1698 19.6828 9.83163 20.0209 9.4935 20.359C9.40076 20.4518 9.30802 20.5445 9.21528 20.6373C9.10901 20.7435 9.01627 20.8285 9.01047 21.0024C8.99115 21.5048 9.01047 22.011 9.0124 22.5134C9.0124 23.1703 9.01433 23.8253 9.01433 24.4822C9.01433 24.5209 9.01433 24.5614 9.01433 24.6001C9.01433 24.8087 9.19016 24.9865 9.40076 24.9865C9.90119 24.9865 10.4016 24.9865 10.902 24.9884C11.5609 24.9884 12.2178 24.9904 12.8767 24.9904C12.9366 24.9904 12.9926 24.9923 13.0506 24.9846C13.1472 24.971 13.2264 24.9227 13.294 24.857C13.3578 24.7933 13.4215 24.7295 13.4853 24.6658C13.779 24.3721 14.0707 24.0803 14.3644 23.7866C14.8185 23.3326 15.2725 22.8785 15.7266 22.4245C16.2695 21.8816 16.8124 21.3386 17.3573 20.7938C17.9196 20.2315 18.4799 19.6712 19.0421 19.1089C19.5503 18.6008 20.0604 18.0907 20.5685 17.5826C20.953 17.1981 21.3375 16.8136 21.722 16.4291C21.7819 16.3692 21.8437 16.3073 21.9055 16.2474C21.8089 16.1566 21.7181 16.0658 21.6254 15.9731Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.6588 11.9079C24.5081 11.7572 24.3574 11.6064 24.2048 11.4538C23.6715 10.9205 23.1402 10.3892 22.6069 9.85593C22.4427 9.6917 22.2765 9.52747 22.1123 9.3613C22.0137 9.26277 21.9036 9.17389 21.7761 9.11592C21.436 8.96135 21.0129 8.96522 20.6979 9.18355C20.526 9.30334 20.383 9.46564 20.2342 9.61248C19.985 9.86173 19.7357 10.111 19.4865 10.3602C19.1812 10.6655 18.874 10.9688 18.5687 11.2741L22.1741 14.8795C22.2649 14.9703 22.3557 15.0611 22.4465 15.1519L22.719 15.4243C22.8484 15.2949 22.9798 15.1635 23.1092 15.0341C23.5324 14.6109 23.9555 14.1878 24.3787 13.7646C24.4733 13.67 24.5661 13.5772 24.6608 13.4826C24.6646 13.4787 24.6704 13.4729 24.6743 13.469C24.6801 13.4632 24.6839 13.4594 24.6897 13.4536C25.1013 13.013 25.0858 12.3368 24.6588 11.9079Z" fill="white"/>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="0" y1="34" x2="33.9999" y2="34" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#21F9F9"/>
                                        <stop offset="1" stopColor="#6048BC"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="pg-profile-page__left-col__box-incognito">
                            123
                        </div>
                    </div>
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                UID
                            </div>
                            <div className="pg-profile-page__element-text">
                                {user.uid}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pg-profile-page__right-col">
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                Account email
                            </div>
                            <div className="pg-profile-page__element-text">
                                {user.email.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password'})}
                            </div>
                            <div className="pg-profile-page__element-text">
                                ************
                            </div>
                        </div>
                        <Button
                            className="pg-profile-page__btn-secondary-change"
                            onClick={this.showChangeModal}
                            label={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change'})}
                        />
                        {modal}
                    </div>
                    <ReferralProgram/>
                    {/*<div className="pg-profile-page__row">*/}
                    {/*<ProfileTwoFactorAuth*/}
                    {/*is2faEnabled={user.otp}*/}
                    {/*navigateTo2fa={this.handleNavigateTo2fa}*/}
                    {/*/>*/}
                    {/*</div>*/}
                    <Modal
                        show={this.state.showModal}
                        header={this.renderModalHeader()}
                        content={this.renderModalBody()}
                        footer={this.renderModalFooter()}
                    />
                </div>
            </div>
        );
    }

    private renderModalHeader = () => {
        return (
            <div className="pg-exchange-modal-submit-header">
                <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.modalHeader"/>
            </div>
        );
    };

    private renderModalBody = () => {
        return (
            <div className="pg-exchange-modal-submit-body">
                <h2>
                    <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.modalBody"/>
                </h2>
            </div>
        );
    };

    private renderModalFooter = () => {
        return (
            <div className="pg-exchange-modal-submit-footer">
                <Button
                    className="pg-exchange-modal-submit-footer__button-inverse"
                    label="OK"
                    onClick={this.closeModal}
                />
            </div>
        );
    };

    private renderChangeModalHeader = () => (
        <div className="cr-email-form__options-group">
            <div className="cr-email-form__option">
              <div className="cr-email-form__option-inner">
                  <FormattedMessage id="page.body.profile.header.account.content.password.change"/>
                  <div className="cr-email-form__cros-icon" onClick={this.handleCancel}>
                      <img src={require('./close.svg')}/>
                  </div>
              </div>
            </div>
        </div>
    );

    private handleChangePassword = () => {
        this.props.changePassword({
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confirmationPassword,
        });
    };

    private closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    private showChangeModal = () => {
        this.setState({
            showChangeModal: true,
        });
    }

    // private handleNavigateTo2fa = (enable2fa: boolean) => {
    //     if (enable2fa) {
    //         this.props.history.push('/security/2fa', { enable2fa });
    //     } else {
    //         this.setState({
    //             showModal: !this.state.showModal,
    //         });
    //     }
    // }

    private handleOldPassword = (value: string) => {
        this.setState({
            oldPassword: value,
        });
    }

    private handleConfPassword = (value: string) => {
        this.setState({
            confirmationPassword: value,
        });
    }

    private handleNewPassword = (value: string) => {
        this.setState({
            newPassword: value,
        });
    }

    private handleCancel = () => {
        this.setState({
            showChangeModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
        });
    }

    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'oldPassword':
                    this.setState({
                        oldPasswordFocus: !this.state.oldPasswordFocus,
                    });
                    break;
                case 'newPassword':
                    this.setState({
                        newPasswordFocus: !this.state.newPasswordFocus,
                    });
                    break;
                case 'confirmationPassword':
                    this.setState({
                        confirmPasswordFocus: !this.state.confirmPasswordFocus,
                    });
                    break;
                default:
                    break;
            }
        };
    }

    private isValidForm() {
        const {
            confirmationPassword,
            oldPassword,
            newPassword,
        } = this.state;
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;

        return oldPassword && isNewPasswordValid && isConfirmPasswordValid;
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    passwordChangeSuccess: selectChangePasswordSuccess(state),
});

const mapDispatchToProps = dispatch => ({
    changePassword: ({ old_password, new_password, confirm_password }) =>
        dispatch(changePasswordFetch({ old_password, new_password, confirm_password })),
});

const ProfileAuthDetailsConnected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileAuthDetailsComponent));
// tslint:disable-next-line:no-any
const ProfileAuthDetails = withRouter(ProfileAuthDetailsConnected as any);

export {
    ProfileAuthDetails,
};
