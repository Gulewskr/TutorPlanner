import React, { createContext, useContext, useMemo, useState } from 'react';
import { ModalRendererSchema } from './model';
import { Text, View } from 'react-native';
import { ModalRenderer } from './ModalRenderer';

interface ModalContextProps {
    modalBody: React.ReactNode;
    setModalBody: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultModalContext: ModalContextProps = {
    modalBody: null,
    setModalBody: () => {},
    isOpen: false,
    setIsOpen: () => {},
};

const ModalContext: React.Context<ModalContextProps> =
    createContext(defaultModalContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
    const [modalBody, setModalBody] = useState<React.ReactNode>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <ModalContext.Provider
            value={{ modalBody, setModalBody, isOpen, setIsOpen }}
        >
            {isOpen && (
                <ModalRenderer
                    modalBody={modalBody}
                    onCancel={() => setIsOpen(false)}
                />
            )}

            {children}
        </ModalContext.Provider>
    );
};
