import * as errorConstantType from "../constants/error.constant";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const whiteSpaceValidation = stringVal => {
    return /\s/g.test(stringVal);
};
const corporateEmailPattern = /^[a-zA-Z0-9._%+-]+@(noventiq\.com|[a-zA-Z0-9.-]+\.(com|org|net))$/i;
const publicEmailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|yopmail\.com|hotmail\.com)$/;


export const validateInfo = {

    email: (value) => {
        let error = "";
        if (!value) {
            error = errorConstantType.REQUIRED_EMAIL;
        } else if (!regex.test(value)) {
            error = errorConstantType.INVALID_EMAIL;
        }else if (publicEmailPattern.test(value)) {
            error = errorConstantType.REQUIRED_CORPORATE;
        } 
        return error;
    },

    password: (value) => {
        let error = "";
        if (!value) {
            error = errorConstantType.REQUIRED_PASSWORD;

        } 
        return error;
    },

    language: (value) => {
        console.log(value);
        let error = "";
        if (!value.length) {
            error = errorConstantType.REQUIRED_LANGUAGE;
        }
        return error;
    },

};

export const isFormValid = (errors) => {
    let hasError = false;
    for (let error in errors) {
        if (errors[error]) {
            hasError = true;
        }
    }
    return hasError;
}
export default validateInfo;
