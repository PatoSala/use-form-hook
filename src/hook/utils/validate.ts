import { validations } from "../validations/validations";

interface Errors {
    [key: string]: {
        message: string
    }
}

export const validate = (
    /* form data */
    formData: any,

    /* validations to apply to each field */
    fieldsValidations: any,

    /* fields to validate */
    fields: string[] | [] = [],
) : Errors | null => {
    let errors: Errors = {};
    fields.forEach(fieldName => {
        let fieldValue = formData[fieldName];
        let fieldError = null;

        if (fieldsValidations[fieldName]) {
            for (const validationType in fieldsValidations[fieldName]) {

                if (fieldValue === '' && (fieldsValidations[fieldName]["required"] == undefined || !fieldsValidations[fieldName]["required"].value)) {
                    continue;
                }

                const hasErrors = validations[validationType as keyof typeof validations](fieldValue, fieldsValidations[fieldName][validationType]);

                if (hasErrors) {
                    fieldError = {
                        message: fieldsValidations[fieldName][validationType].message
                    };
                    errors[fieldName] = fieldError;
                }
            }
        }
    })
    
    return Object.keys(errors).length > 0 ? errors : null;
}