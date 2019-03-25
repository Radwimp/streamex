import {
    Button,
} from '@openware/components';
import {
    CustomInput,
} from '../';

import * as React from 'react';
import {
    EMAIL_REGEX,
    PASSWORD_REGEX,
} from '../../helpers';

interface SignUpFormProps {
    siteKey?: string;
    isLoading?: boolean;
    title?: string;
    onSignUp: () => void;
    onSignIn?: () => void;
    className?: string;
    image?: string;
    captchaType: 'recaptcha' | 'geetest' | 'none';
    labelSignIn?: string;
    labelSignUp?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    referalCodeLabel?: string;
    termsMessage?: string;
    refId: string;
    password: string;
    email: string;
    confirmPassword: string;
    recaptcha_response: string;
    recaptchaConfirmed: boolean;
    recaptchaOnChange: (value: string) => void;
    handleChangeEmail: (value: string) => void;
    handleChangePassword: (value: string) => void;
    handleChangeConfirmPassword: (value: string) => void;
    handleChangeRefId: (value: string) => void;
    hasConfirmed?: boolean;
    clickCheckBox: () => void;
    validateForm: () => void;
    emailError: string;
    passwordError: string;
    confirmationError: string;
    handleFocusEmail: () => void;
    handleFocusPassword: () => void;
    handleFocusConfirmPassword: () => void;
    handleOpenRefId: () => void;
    confirmPasswordFocused: boolean;
    refIdOpened: boolean;
    emailFocused: boolean;
    passwordFocused: boolean;
}

class SignUpForm extends React.Component<SignUpFormProps> {
    public render() {
        const {
            email,
            password,
            confirmPassword,
            refId,
            isLoading,
            labelSignUp,
            emailLabel,
            passwordLabel,
            confirmPasswordLabel,
            referalCodeLabel,
            emailError,
            passwordError,
            confirmationError,
            refIdOpened,
        } = this.props;

        return (
            <form>
                <div className="cr-sign-up-form">
                    <span className={'cr-sign-up-form__headline'}>Create your account</span>
                    <div className="cr-sign-up-form__form-content" style={{ height: refIdOpened ? 490 : 360 }}>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="email"
                                label={emailLabel || 'Email'}
                                placeholder={emailLabel || 'Email'}
                                defaultLabel="Email"
                                handleChangeInput={this.props.handleChangeEmail}
                                inputValue={email}
                                handleFocusInput={this.props.handleFocusEmail}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                            />
                            {emailError && <div className="cr-sign-up-form__error">{emailError}</div>}
                        </div>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="password"
                                label={passwordLabel || 'Password'}
                                placeholder={passwordLabel || 'Password'}
                                defaultLabel="Password"
                                handleChangeInput={this.props.handleChangePassword}
                                inputValue={password}
                                handleFocusInput={this.props.handleFocusPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                            />
                            {passwordError && <div className={'cr-sign-up-form__error'}>{passwordError}</div>}
                        </div>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="password"
                                label={confirmPasswordLabel || 'Confirm Password'}
                                placeholder={confirmPasswordLabel || 'Confirm Password'}
                                defaultLabel="Confirm Password"
                                handleChangeInput={this.props.handleChangeConfirmPassword}
                                inputValue={confirmPassword}
                                handleFocusInput={this.props.handleFocusConfirmPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                            />
                            {confirmationError && <div className="cr-sign-up-form__error">{confirmationError}</div>}
                        </div>
                        <div className="cr-sign-up-form__ref" onClick={this.props.handleOpenRefId}>
                            Have an Invitation code?
                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M1.20711 1.20711C0.761653 0.761653 1.07714 0 1.70711 0H8.29289C8.92286 0 9.23835 0.761654 8.79289 1.20711L5.5 4.5C5.22386 4.77614 4.77614 4.77614 4.5 4.5L1.20711 1.20711Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="cr-sign-up-form__group" style={{ display: refIdOpened ? 'block' : 'none' }}>
                            <CustomInput
                                type="text"
                                label={referalCodeLabel || 'Referral code'}
                                placeholder={referalCodeLabel || 'Referral code'}
                                defaultLabel="Referral code"
                                handleChangeInput={this.props.handleChangeRefId}
                                inputValue={refId}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                            />
                        </div>
                        <div className="cr-sign-up-form__button-wrapper">
                            <Button
                                type="submit"
                                className="cr-sign-up-form__button"
                                label={isLoading ? 'Loading...' : (labelSignUp ? labelSignUp : 'Sign up')}
                                disabled={this.disableButton()}
                                onClick={this.handleClick}
                            />
                        </div>
                        <div className="cr-sign-up-form__footer">
                            <span>By clicking “Create Account”, you agree to the &nbsp;</span>
                            <a href="/">User Agreement</a>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    private disableButton = (): boolean => {
        const {
            email,
            password,
            confirmPassword,
            recaptchaConfirmed,
            isLoading,
            captchaType,
        } = this.props;

        if (isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword) {
            return true;
        }
        return captchaType !== 'none' && !recaptchaConfirmed;

    };

    private handleSubmitForm() {
        this.props.onSignUp();
    }

    private isValidForm() {
        const { email, password, confirmPassword } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return (email && isEmailValid) &&
            (password && isPasswordValid) &&
            (confirmPassword && isConfirmPasswordValid);
    }

    private handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }
        if (!this.isValidForm()) {
            this.props.validateForm();
        } else {
            this.handleSubmitForm();
        }
    };
}

export {
    SignUpForm,
    SignUpFormProps,
};
