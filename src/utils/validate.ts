import { validations as defaultValidations } from "../validations/validations";
import { FormData, Errors, Validations } from "../interfaces/index";

export const validate = (
    /* form data */
    formData: FormData,

    /* validations to apply to each field */
    fieldsValidations: Validations,

    /* fields to validate */
    fields: (keyof FormData)[] = [],
    customValidations = {}
) => {
    let errors = {};
    fields.forEach((fieldName: keyof FormData) => {
        let fieldValue = formData[fieldName];
        let fieldError = {};
        const validations = { ...defaultValidations, ...customValidations };

        if (fieldsValidations[fieldName]) {
            for (const validationType in fieldsValidations[fieldName]) {

                if (fieldValue === '' && (fieldsValidations[fieldName]["required"] == undefined || !fieldsValidations[fieldName]["required"].value)) {
                    continue;
                }

                const hasErrors = validations[validationType](fieldValue, fieldsValidations[fieldName][validationType]);

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