import * as React from 'react';
import { Button as _Button } from 'react-native';
import styles from './Button.scss';

interface ButtonProps {
    secondary: boolean;
    key: string;
    title: string;
    handleClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ key, title, handleClick }) => {
    return <_Button key={key} title={title} onPress={handleClick} />;
};
