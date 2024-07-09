
import { useState } from 'react';

const UseValidatorForm = (validate, initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // const handleChange = (event) => {
    //     if (validate && validate[event.target.name]) {
    //         const error = validate[event.target.name](event.target.value);
    //         setValues(values => ({
    //             ...values,
    //             [event.target.name]: event.target.value,
    //         }));
    //         setErrors({
    //             ...errors,
    //             [event.target.name]: error
    //         });
    //     }
    // }


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

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     for (let val in values) {
    //         const error = validate[val](values[val]);
    //         setErrors(errors => ({ ...errors, [val]: error }));
    //     }
    //     if (!errors || Object.entries(errors).length === 0) {
    //         return;
    //     }



    //     for (const [key, value] of Object.entries(errors)) {
    //         if (key && value.length) {
    //             return;
    //         }
    //     }

    //     if (submitHandler) {
    //         submitHandler(values);
    //     }
    // }

    const handleUpdate = (event) => {

        event.preventDefault();
        for (let val in values) {
            if (validate[val]) {
                const error = validate[val](values[val]);
                setErrors(errors => ({ ...errors, [val]: error }));
            }

        }
        for (const [key, value] of Object.entries(values)) {
            setValues(values => ({ ...values, [key]: values[key] }));
        }
        if (!errors || Object.entries(errors).length === 0) {
            return;
        }
        for (const [key, value] of Object.entries(errors)) {
            if (key && value.length) {
                return;
            }
        }
        if (submitHandler) {
            submitHandler(values);
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
            // initialValues[key]
        }
    }

    return { handleUpdate, handleReset, handleChange, values, errors, handleSubmit, handleCustomChange };
};

export default UseValidatorForm;



