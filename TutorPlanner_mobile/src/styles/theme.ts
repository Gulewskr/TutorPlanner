import { TextStyle, ViewStyle } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet"
import { $color_error_button, black, disabled, error_color, error_color_shadow, primary, primary_shadow, secondary, secondary_shadow, success_color, success_color_shadow, warning_color, warning_color_shadow } from "./colors";
import { error } from "console";

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
    },
    border: {
        width: {
            s: 1,
            m: 2,
            l: 3,
        },
        color: black
    },
    height: {
        s: 20,
        m: 30,
        l: 40,
    },
    boxShadow: {
        none: 'none',
        primary: {
            default: `-5 -5 1 0 ${primary_shadow} inset`,
            pressed: `5 5 1 0 ${primary_shadow} inset`,
        },
        secondary: {
            default: `-5 -5 1 0 ${secondary_shadow} inset`,
            pressed: `5 5 1 0 ${secondary_shadow} inset`,
        },
        error: {
            default: `-5 -5 1 0 ${error_color_shadow} inset`,
            pressed: `5 5 1 0 ${error_color_shadow} inset`,
        },
        success: {
            default: `-5 -5 1 0 ${success_color_shadow} inset`,
            pressed: `5 5 1 0 ${success_color_shadow} inset`,
        },
        warning: {
            default: `-5 -5 1 0 ${warning_color_shadow} inset`,
            pressed: `5 5 1 0 ${warning_color_shadow} inset`,
        }
    },
    navbar: {
        background: primary,
        activePageColor: primary_shadow,
        activePageColorShadow: `-6 -10 1 0 #8F3A5D inset`,
        disabledColor: disabled,
    }
}

type Styles = {
  text_styles: {
    boldbody: TextStyle;
  }
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  text: TextStyle;
  list: ViewStyle;
  fullWidthContainer: ViewStyle;
  fullWidthRow: ViewStyle;
  border: ViewStyle;
  primary_bg: ViewStyle;
};

export const STYLES = EStyleSheet.create({
    text_styles: {
        boldbody: {
            fontWeight: DEFAULT.fontWeight.bold,
            fontSize: DEFAULT.fonsSize.body,
        }
    },
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
        alignItems: 'center',
        gap: DEFAULT.SPACING.M
    },
    border: {
        borderWidth: DEFAULT.border.width.m,
        borderColor: black
    },
    primary_bg: {
        backgroundColor: primary,
        boxShadow: `-5 -5 1 0 ${primary_shadow} inset`
    },
    secondary_bg: {
        backgroundColor: secondary,
        boxShadow: `-5 -5 1 0 ${secondary_shadow} inset`
    },
    success_bg: {
        backgroundColor: success_color,
        boxShadow: `-5 -5 1 0 ${success_color_shadow} inset`
    },
    error_bg: {
        backgroundColor: error_color,
        boxShadow: `-5 -5 1 0 ${error_color_shadow} inset`
    },
    warning_bg: {
        backgroundColor: warning_color,
        boxShadow: `-5 -5 1 0 ${warning_color_shadow} inset`
    }
}) as Styles;
