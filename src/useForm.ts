import {
    useEffect,
    useRef,
    useState } from "react";
import { validate } from "./utils/validate";
import {
    FormData,
    CustomValidations } from "./interfaces/index";

export function useForm(
    defaultValues: FormData = {},
    customValidations: CustomValidations = {}
) {
    /**
     *  When register() is called, it sets a field to register
     */
    const fieldsToRegister = useRef(defaultValues)
    const fieldsValidations = useRef({})

    useEffect(() => {
        setFormData(fieldsToRegister.current)
    }, [fieldsToRegister.current])

    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState({});

    const register = (
        name,
        validations
    ) => {
        /* set initial field value */
        if (defaultValues[name] === undefined) fieldsToRegister.current[name] = "";
        if (validations) fieldsValidations.current[name] = validations;
        console.log(validations)
        return {
            name: name,
            value: formData[name],
            onChange: (e) => {
                setFormData({
                    ...formData,
                    [name]: e.target.value
                })
            },
            onBlur: () => {
                let fieldErrors = validate(formData, fieldsValidations.current, [name], customValidations);
                
                if (fieldErrors) {
                    setErrors({
                        ...errors,
                        [name]: fieldErrors[name]
                    })
                } else {
                    let copyOfErrors = { ...errors };
                    delete copyOfErrors[name];
                    setErrors(copyOfErrors);
                }
            }
        };
    }

    const handleSubmit = (onSubmit: Function) => {
        let errorsBeforeSubmit = validate(formData, fieldsValidations.current, Object.keys(formData), customValidations);

        if (errorsBeforeSubmit) {
            setErrors(errorsBeforeSubmit)
            return;
        }

        onSubmit(formData)

        setErrors({});
    }

    return {
        register,
        errors,
        data: formData,
        handleSubmit
    }
}