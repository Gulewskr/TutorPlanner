import { setLoadingPage } from "@contexts/NavbarReducer";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

export const useViewLoaded = () => {
    const isFocused = useIsFocused();
    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }, [isFocused]);
}