import { NavbarNavigationScreens } from '@components/ui/navbar';
import React, { createContext, useState, useContext } from 'react';

type StudnetContextProps = {
    loading: boolean;
    previousScreen: NavbarNavigationScreens;
    setPreviousScreen: (screen: NavbarNavigationScreens) => void;
    setLoading: (loading: boolean) => void;
};

// Create the DataContext
export const GlobalContext = createContext<StudnetContextProps>({
    loading: true,
    previousScreen: 'Home',
    setPreviousScreen: () => {},
    setLoading: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [previousScreen, setPreviousScreen] = useState<NavbarNavigationScreens>('Home');

    return (
        <GlobalContext.Provider
            value={{
                loading: loading,
                previousScreen: previousScreen,
                setLoading,
                setPreviousScreen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
