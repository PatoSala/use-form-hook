export function findInputError(errors: any, name: string) {
    if (errors[name]) {
        return errors[name].message
    }
}