import { createContext, useContext, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ConfirmModal } from './ConfirmModalRenderer';

interface ConfirmModalContextProps {
    confirmIsOpen: boolean;
    setConfirmIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOnConfirm: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const defaultConfirmModalContext: ConfirmModalContextProps = {
    confirmIsOpen: false,
    setConfirmIsOpen: () => {},
    setMessage: () => {},
    setOnConfirm: () => {},
};

const ConfirmModalContext: React.Context<ConfirmModalContextProps> =
    createContext(defaultConfirmModalContext);

export const useConfirmModal = () => useContext(ConfirmModalContext);

export const ConfirmModalProvider = ({ children }: React.PropsWithChildren) => {
    const [confirmIsOpen, setConfirmIsOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
    const [message, setMessage] = useState<string>(
        'Czy na pewno chcesz potwierdzić akcję?',
    );
    return (
        <ConfirmModalContext.Provider
            value={{
                confirmIsOpen,
                setConfirmIsOpen,
                setOnConfirm,
                setMessage,
            }}
        >
            {confirmIsOpen && onConfirm && (
                <ConfirmModal
                    message={message}
                    onConfirm={onConfirm}
                    onCancel={() => setConfirmIsOpen(false)}
                />
            )}
            {children}
        </ConfirmModalContext.Provider>
    );
};
