interface Errors {
    [key: string]: {
        message: string
    }
}

export const findFieldError = (errors: Errors, fieldName: string) => {
    return errors[fieldName] ? errors[fieldName] : null;
}