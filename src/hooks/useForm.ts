import { useState, useEffect, useRef } from "react"
import { validations } from "../validations/validations"

interface FormData {
    [key: string]: any
}

interface Errors {
    [key: keyof FormData]: {
        message: string
    }
}

interface RegisterValidations {
    [key: keyof FormData]: Validations
}

interface Validations {
    required?: {
        value: boolean,
        message: string
    },
    maxLength?: {
        value: number,
        message: string
    },
    minLength?: {
        value: number,
        message: string
    }
}

export function useForm() {
    /**
     *  When register() is called, it sets a field to register
     */
    const fieldsToRegister = useRef<FormData>({})
    const fieldsValidations = useRef<RegisterValidations>({})

    useEffect(() => {
        setFormData(fieldsToRegister.current)
    }, [fieldsToRegister.current])

    /**
     * 
     */
    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})

    const validateField = (name: string) => {
        const fieldValue = formData[name];

        if (fieldsValidations.current[name]) {
            const validationsToApply = fieldsValidations.current[name];

            for (const validationName in validationsToApply) {
                const hasErrors = validations[validationName](fieldValue, validationsToApply[validationName])

                if (hasErrors) {
                    setErrors({
                        ...errors,
                        [name]: {
                            message: validationsToApply[validationName].message
                        }
                    })
                    return;
                }
            }

            /* if no errors where found for the field we clear any previous error */
            let copyOfErrors = { ...errors };
            delete copyOfErrors[name];
            setErrors(copyOfErrors);
        }
    }

    const register = (
        name: string,
        options?: {
            initialValue?: any,
            validations?: Validations
        }
    ) => {
        /* set initial field value */
        fieldsToRegister.current[name] = options?.initialValue || '';
        fieldsValidations.current[name] = options?.validations || {};

        return {
            name: name,
            value: formData[name],
            onChange: (e: any) => {
                setFormData({
                    ...formData,
                    [name]: e.target.value
                })
            },
            onBlur: () => {
                validateField(name)
            }
        }
    }

    const handleSubmit = (onSubmit: (formData: FormData) => any) => {
        let errorsBeforeSubmit = errors;

        Object.keys(fieldsValidations.current).forEach(fieldToValidate => {
            const fieldValue = formData[fieldToValidate];
            const validationsToApply = fieldsValidations.current[fieldToValidate];
            
            for (const validationName in validationsToApply) {
                const hasErrors = validations[validationName](fieldValue, validationsToApply[validationName])

                if (hasErrors) {
                    errorsBeforeSubmit = {
                        ...errorsBeforeSubmit,
                        [fieldToValidate]: {
                            message: validationsToApply[validationName].message
                        }
                    }
                }
            }

            setErrors(errorsBeforeSubmit)
        })

        if (Object.keys(errorsBeforeSubmit).length > 0) {
            return;
        }

        onSubmit(formData)
    }

    return {
        register,
        errors,
        handleSubmit
    }
}