export function isGreaterThanFiveChars(field){
    return function(value, instance, ValidationError){
        if(!value || value.length < 5){
            throw new ValidationError(field, 'This field must be greater than 5 characters')
        }
    }
}

export function startsWithB(field){
    return function(value, instance, ValidationError){
        if(!value.match(/^b/)){
            throw new ValidationError(field, 'This field must be start with a "B"')
        }
    }
}

export function isRequired(field){
    return function(value, instance, ValidationError){
        if(!value){
            throw new ValidationError(field, 'This field is required')
        }
    }
}
