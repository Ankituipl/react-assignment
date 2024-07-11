
import { useState } from 'react';
// import * as errorConstants from './errorConstants';

const UseValidatorForm = (validate, initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        if (validate && validate[name]) {
            const error = validate[name](newValue);
            setValues(values => ({
                ...values,
                [name]: newValue,
            }));
            setErrors({
                ...errors,
                [name]: error
            });
        } else {
            setValues(values => ({
                ...values,
                [name]: newValue,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate) {
            let valid = true;
            const newErrors = {};
            for (const key in values) {
                const error = validate[key] ? validate[key](values[key]) : '';
                newErrors[key] = error;
                if (error) {
                    valid = false;
                }
            }
            if (!valid) {
                console.log(newErrors);
                setErrors(newErrors);
                return;
            }
        }
        setErrors({});
        if (submitHandler) {
            submitHandler();
        }
    }


    const handleCustomChange = (name, value) => {
        setValues(values => ({
            ...values,
            [name]: value,
        }));
    };


    const handleReset = () => {

        for (const [key, value] of Object.entries(values)) {
            setValues(values => ({ ...values, [key]: '' }));
        }
    }

    return {handleReset, handleChange, values, errors, handleSubmit, handleCustomChange };
};

export default UseValidatorForm;



