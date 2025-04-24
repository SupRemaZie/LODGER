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
    street: string;
    numero: string;
    addressComplement:string;
    superficie: string;
    roomNumber: string;
    bedroomNumber: string;
    furnished: boolean;
    bathRoomSpace: bigint;
    powderRoomSpace: bigint;
    appartmentFloor: bigint;
    kWhEP: bigint;
    kgCO2: bigint;
}