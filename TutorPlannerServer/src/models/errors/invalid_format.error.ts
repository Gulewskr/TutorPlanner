import { GeneralError } from "./general.error"

export interface InvalidFormatError extends GeneralError {
    errors: {
        path: string,
        message: string,
        code: string
    }[]
}

