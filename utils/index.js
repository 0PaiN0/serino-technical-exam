import {Users} from "../model/user.model";

export const userExist = (email) => {
    return Users.findOne({where: {email}})
}

export const checkRequiredFields = (requiredFields, fields) => {
    let errorFound = [];
    for (let field of requiredFields) {
        if (!fields[field])
            errorFound.push(field)
    }
    return errorFound;
}

export const distanceValueValid = (distance) => {
    distance = distance.replace(/[^0-9\.]+/g, ""); //remove string if there is one (km?)
    if (distance % 1 !== 0 || !(parseInt(distance) === 1 || parseInt(distance) === 10)) //make sure the distance is whole number and is 1km/10km only
        return { error: true, message: 'Invalid Distance please enter only (1km/10km)...'};
    return {error: false}
}

export const priceValueValid = (price) => {
    price = price.replace(/[^0-9\.]+/g, ""); //remove string if there is one ($?)
    if (price % 1 !== 0)
        return { error: true, message: 'Prize not whole number..'};
    if (price >= 10 && price <= 30)
        return {error: false};
    return { error: true, message: 'Prize not in range, please select only from $10 - 30$'};
}
