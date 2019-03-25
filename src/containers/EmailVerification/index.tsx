import {Button, Loader} from '@openware/components';
import cr from 'classnames';
import { History } from 'history';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CustomInput } from '../../components/CustomInput';
import {
    emailVerificationFetch,
    RootState,
    selectCurrentLanguage,
    selectSendEmailVerificationLoading,
} from '../../modules';

interface OwnProps {
    history: History;
    location: {
        state: {
            email: string;
        };
    };
}

interface DispatchProps {
    emailVerificationFetch: typeof emailVerificationFetch;
}

interface ReduxProps {
    emailVerificationLoading: boolean;
}

type Props = DispatchProps & ReduxProps & OwnProps & InjectedIntlProps;

class EmailVerificationComponent extends React.Component<Props> {
    public readonly state = {
        timer: 60,
        code: '',
        isFocused: false,
    };

    public componentDidMount() {
        if (!this.props.location.state || !this.props.location.state.email) {
            this.props.history.push('/signin');
        }
        this.startTimer();
    }

    public render() {
        const { emailVerificationLoading } = this.props;

        const button = this.props.intl.formatMessage({ id: 'page.resendConfirmation' });
        const title = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' });
        const text = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' });
        // const timer = `Please wait ${this.state.timer}s before requesting another code`;
        const timer = (
                <div>
                    <span>Please wait </span>
                    <b>{this.state.timer}s </b>
                    <span>before requesting another code</span>
                </div>
        );
        const codeGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': this.state.isFocused,
        });

        return (
            <div className="pg-emailverification-container">
                <div className="pg-emailverification">
                    <div className="pg-emailverification-title">{title}</div>
                    <div className="pg-emailverification-body">
                        <div className="pg-emailverification-body-text">We sent email with the secure code to {this.props.location.state.email}</div>
                        <div className="pg-emailverification-body-text-opacity">{text}</div>
                        <div className={codeGroupClass}>
                            <CustomInput
                                type="email"
                                label="Verification Code"
                                placeholder="Enter your verification code"
                                defaultLabel="Verification code"
                                handleChangeInput={this.handleChangeCode}
                                inputValue={this.state.code}
                                handleFocusInput={this.handleFocusCode}
                                classNameLabel="pg-emailverification-body__label"
                                classNameInput="cr-sign-up-form__input"
                            />
                            {/*{place for error && <div className={'cr-sign-up-form__error'}>{Error}</div>}*/}
                        </div>
                        <Button
                            type="submit"
                            className="cr-sign-up-form__button"
                            label={emailVerificationLoading ? 'Loading...' : 'Confirm'}
                            disabled={this.disableButton()}
                            onClick={this.handleClick}
                        />
                        <div className="pg-emailverification-body-container">
                            {emailVerificationLoading ? <Loader /> : !!this.state.timer ? timer : <button className="pg-emailverification-body-container-button" onClick={this.handleResendClick}>{button}</button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private disableButton = () => {
        return this.state.code === '';
    };

    private startTimer = () => {
        this.setState({ timer: 60 });
        const interval = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState({ timer: this.state.timer - 1 });
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    private handleChangeCode = (value: string) => {
        this.setState({
            code: value,
        });
    };

    private handleFocusCode = () => {
        this.setState({
            isFocused: !this.state.isFocused,
        });
    };

    private handleResendClick = () => {
        this.props.emailVerificationFetch({
          email: this.props.location.state.email,
          lang: this.props.i18n.toUpperCase(),
        });
        this.startTimer();
    };

    private handleClick = () => {
        this.props.history.push('/signin');
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    emailVerificationLoading: selectSendEmailVerificationLoading(state),
    i18n: selectCurrentLanguage(state),
});

const mapDispatchProps = {
    emailVerificationFetch,
};

//tslint:disable-next-line:no-any
export const EmailVerification = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(EmailVerificationComponent) as any));
