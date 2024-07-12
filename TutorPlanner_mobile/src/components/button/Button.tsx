import * as React from 'react';
import { Button } from 'react-native';
import styles from './Button.scss';

interface ButtonProps {
    secondary: boolean;
    key: string;
    title: string;
    handleClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ key, title, handleClick }) => {
    return <Button key={key} title={title} onPress={handleClick} />;
};

CustomButton.displayName = 'Button';

export default CustomButton;