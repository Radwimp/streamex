import { Input } from '@openware/components';
import * as React from 'react';

interface CustomInputProps {
    type: string;
    label: string;
    defaultLabel: string;
    handleChangeInput: (value: string) => void;
    inputValue: string;
    handleFocusInput: () => void;
    classNameLabel: string;
    classNameInput: string;
    placeholder: string;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

class CustomInput extends React.Component<CustomInputProps> {
    public render() {
        const {
            label,
            placeholder,
            defaultLabel,
            inputValue,
            classNameLabel,
            classNameInput,
            type,
            onKeyPress,
        } = this.props;

        return (
            <React.Fragment>
                <label className={classNameLabel}>
                    {inputValue && (label || defaultLabel)}
                </label>
                <Input
                    type={type}
                    value={inputValue}
                    placeholder={placeholder}
                    className={classNameInput}
                    onFocus={this.props.handleFocusInput}
                    onBlur={this.props.handleFocusInput}
                    onChangeValue={this.props.handleChangeInput}
                    onKeyPress={onKeyPress}
                />
            </React.Fragment>
        );
    }
}

export {
    CustomInput,
    CustomInputProps,
};
