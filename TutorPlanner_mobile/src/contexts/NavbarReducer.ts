import { NavbarNavigationScreens } from '@components/ui/navbar';
import { Action, configureStore, PayloadAction  } from '@reduxjs/toolkit'

interface NavbarState {
    currentRoute: NavbarNavigationScreens;
    previousRoute: NavbarNavigationScreens;
    isLoading: boolean;
    isPageLoading: boolean;
}

const initialState: NavbarState = {
    currentRoute: 'Home',
    previousRoute: 'Home',
    isLoading: true,
    isPageLoading: true
}

const ACTIONS = {
    NAVIGATE: 'NAVIGATE',
    LOADING: 'LOADING',
    PAGE_LOADING: 'PAGE_LOADING'
};

const routeReducer = (state = initialState, action: Action) => {
    if (action.type === ACTIONS.NAVIGATE) {
        const act = action as PayloadAction<NavbarNavigationScreens>;
        if (!act.payload) {
            console.log('Error - missing payload.');
        }
        if (act.payload !== state.currentRoute) {
            return {
                ...state,
                currentRoute: act.payload,
                previousRoute: state.currentRoute,
                isPageLoading: true
            }
        } 
    }

    if (action.type === ACTIONS.LOADING) {
        const act = action as PayloadAction<boolean>;
        return {
            ...state,
            isLoading: act.payload
        };
    }


    if (action.type === ACTIONS.PAGE_LOADING) {
        const act = action as PayloadAction<boolean>;
        return {
            ...state,
            isPageLoading: act.payload
        };
    }

    return state;
  }

export const store = configureStore({ reducer: routeReducer})

export const updateCurrentRoute = (route: NavbarNavigationScreens) => store.dispatch({
    type: ACTIONS.NAVIGATE,
    payload: route
});

export const setLoadingScreen = (isLoading: boolean) => store.dispatch({
    type: ACTIONS.LOADING,
    payload: isLoading
});

export const setLoadingPage = (isLoading: boolean) => store.dispatch({
    type: ACTIONS.PAGE_LOADING,
    payload: isLoading
});

export const getNavbarState = () => store.getState();

export type RootState = ReturnType<typeof store.getState>;
