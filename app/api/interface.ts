export interface LogementData {
    email: string;
    typeOfLogement: string;
    typeOfProperty: string;
    draft: boolean;
    stopProcess : string;
    logementType: string;
    propertyType: string;
    displayPreciseAddress: boolean;
    postalCode: string;
    city: string;
    streetNumber: string;
    streetName: string;
    numero: string;
    addressComplement:string;
    superficie: string;
    roomNumber: string;
    bedroomNumber: string;
    furnished: boolean;
    bathRoomSpace: string;
    powderRoomSpace: string;
    appartmentFloor: string;
    kWhEP: string;
    kgCO2: string;
    roomAreas: { area: string }[];
    spaceShare: { type: string }[];
}