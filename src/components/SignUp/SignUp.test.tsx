import * as React from 'react';
import { SignUpForm, SignUpFormProps } from './';

import { shallow } from 'enzyme';

const defaults: SignUpFormProps = {
    onSignUp: jest.fn(),
    captchaType: 'none',
    refId: '',
    password: '',
    email: '',
    confirmPassword: '',
    recaptcha_response: '',
    recaptchaConfirmed: false,
    recaptchaOnChange: jest.fn(),
    handleChangeEmail: jest.fn(),
    handleChangePassword: jest.fn(),
    handleChangeConfirmPassword: jest.fn(),
    handleChangeRefId: jest.fn(),
    hasConfirmed: false,
    clickCheckBox: jest.fn(),
    validateForm: jest.fn(),
    emailError: '',
    passwordError: '',
    confirmationError: '',
    handleFocusEmail: jest.fn(),
    handleFocusPassword: jest.fn(),
    handleFocusConfirmPassword: jest.fn(),
    handleFocusRefId: jest.fn(),
    confirmPasswordFocused: false,
    refIdFocused: false,
    emailFocused: false,
    passwordFocused: false,
};

const setup = (props: Partial<SignUpFormProps> = {}) =>
    shallow(<SignUpForm {...{ ...defaults, ...props }} />);

describe('SignUp component', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders without crashing', () => {
        const wrapper = setup();
        expect(wrapper).toBeDefined();
    });

    it('should render logo block', () => {
        let wrapper = setup();
        const firstState = wrapper.find('.cr-sign-up-form__title').children();
        expect(firstState).toHaveLength(0);
        wrapper = setup({ image: 'image'});
        const secondState = wrapper.find('.cr-sign-up-form__title').children();
        expect(secondState).toHaveLength(1);
    });

    it('should render captcha block', () => {
        const wrapper = setup({hasConfirmed: true, captchaType: 'recaptcha'});
        expect(wrapper.find('.cr-sign-up-form__recaptcha').exists()).toBe(true);
    });

    it('should have correct labels', () => {
        const wrapper = setup({ labelSignIn: 'label sign in', labelSignUp: 'label sign up'});
        expect(wrapper.find('.cr-sign-up-form__option-inner').first().text()).toBe('label sign in');
        expect(wrapper.find('.__selected').text()).toBe('label sign up');
    });

    it('should render error blocks', () => {
        const wrapper = setup({
            emailError: 'error email',
            passwordError: 'error password',
            confirmationError: 'error refid',
        });
        expect(wrapper.find('.cr-sign-up-form__error').first().text()).toBe('error email');
        expect(wrapper.find('.cr-sign-up-form__error').at(1).text()).toBe('error password');
        expect(wrapper.find('.cr-sign-up-form__error').last().text()).toBe('error refid');
    });

    it('should send request', () => {
        const spyOnValidateForm = jest.fn();
        const spyOnSignUp = jest.fn();
        const wrapper = setup({
            email: 'email@email.com',
            password: 'Qwerty123',
            confirmPassword: 'Qwerty123',
            validateForm: spyOnValidateForm,
            onSignUp: spyOnSignUp,
        });
        const button = wrapper.find('.cr-sign-up-form__button').last();
        button.simulate('click');
        expect(spyOnValidateForm).toHaveBeenCalledTimes(0);
        expect(spyOnSignUp).toHaveBeenCalled();
        expect(spyOnSignUp).toHaveBeenCalledTimes(1);
    });

    it('should validate form', () => {
        const spyOnValidateForm = jest.fn();
        const spyOnSignUp = jest.fn();
        let wrapper = setup({
            email: 'email',
            password: 'Qwerty123',
            confirmPassword: 'Qwerty123',
            validateForm: spyOnValidateForm,
            onSignUp: spyOnSignUp,
        });
        const button = wrapper.find('.cr-sign-up-form__button').last();
        button.simulate('click');
        expect(spyOnValidateForm).toHaveBeenCalled();
        expect(spyOnValidateForm).toHaveBeenCalledTimes(1);
        expect(spyOnSignUp).toHaveBeenCalledTimes(0);
        spyOnValidateForm.mockClear();
        spyOnSignUp.mockClear();

        wrapper = setup({
            email: 'email@email.com',
            password: 'Qwerty123',
            confirmPassword: 'Qwerty',
            validateForm: spyOnValidateForm,
            onSignUp: spyOnSignUp,
        });
        button.simulate('click');
        expect(spyOnValidateForm).toHaveBeenCalled();
        expect(spyOnValidateForm).toHaveBeenCalledTimes(1);
        expect(spyOnSignUp).toHaveBeenCalledTimes(0);
    });
});
