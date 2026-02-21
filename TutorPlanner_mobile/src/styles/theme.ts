import { TextStyle, ViewStyle } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet"

//TODO
export const DEFAULT = { 
    SPACING: {
        NONE: 0,
        XS: 5,
        S: 10,
        M: 15,
    },
    fonsSize: {
        h4: 22,
        h3: 20,
        h2: 18,
        h1: 16,
        body: 12
    },
    fontWeight: {
        bold: 'bold',
        body: 'normal'
    }
}

type Styles = {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  text: TextStyle;
  list: ViewStyle;
  fullWidthContainer: ViewStyle;
  fullWidthRow: ViewStyle;
};

export const STYLES = EStyleSheet.create({
    h1: {
        fontWeight: DEFAULT.fontWeight.bold,
        fontSize: DEFAULT.fonsSize.h1,
    },
    h2: {
        fontWeight: DEFAULT.fontWeight.bold,
        fontSize: DEFAULT.fonsSize.h2,
    },
    h3: {
        fontWeight: DEFAULT.fontWeight.bold,
        fontSize: DEFAULT.fonsSize.h3,
    },
    h4: {
        fontWeight: DEFAULT.fontWeight.bold,
        fontSize: DEFAULT.fonsSize.h4,
    },
    text: {
        fontWeight: DEFAULT.fontWeight.body,
        fontSize: DEFAULT.fonsSize.body,
    },
    list: {
        paddingVertical: DEFAULT.SPACING.S,
        paddingHorizontal: DEFAULT.SPACING.XS,
        gap: DEFAULT.SPACING.XS,
    },
    fullWidthContainer: {
        paddingVertical: DEFAULT.SPACING.NONE,
        paddingHorizontal: DEFAULT.SPACING.M,
        width: '100%',
        alignItems: 'center'
    },
    fullWidthRow: {
        paddingVertical: DEFAULT.SPACING.NONE,
        paddingHorizontal: DEFAULT.SPACING.M,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
}) as Styles;
