import { createContext, useContext, useState } from 'react';
import { ConfirmModal, ConfirmModalProps } from './ConfirmModalRenderer';

type OpenModalProps = Omit<ConfirmModalProps, 'onCancel' | 'hideModal'>;

interface ConfirmModalContextProps {
    openModal: (data: OpenModalProps) => void;
}

const defaultConfirmModalContext: ConfirmModalContextProps = {
    openModal: (data: OpenModalProps) => {},
};

const ConfirmModalContext: React.Context<ConfirmModalContextProps> =
    createContext(defaultConfirmModalContext);

export const useConfirmModal = () => useContext(ConfirmModalContext);

export const ConfirmModalProvider = ({ children }: React.PropsWithChildren) => {
    const [confirmIsOpen, setConfirmIsOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
    const [message, setMessage] = useState<string>(
        'Czy na pewno chcesz potwierdzić akcję?',
    );

    const openModal = (data: OpenModalProps) => {
        setConfirmIsOpen(true);
        setOnConfirm(data.onConfirm);
        setMessage(data.message);
    };

    return (
        <ConfirmModalContext.Provider
            value={{
                openModal,
            }}
        >
            {confirmIsOpen && (
                <ConfirmModal
                    message={message}
                    onConfirm={onConfirm}
                    onCancel={() => setConfirmIsOpen(false)}
                    hideModal={() => setConfirmIsOpen(false)}
                />
            )}
            {children}
        </ConfirmModalContext.Provider>
    );
};
