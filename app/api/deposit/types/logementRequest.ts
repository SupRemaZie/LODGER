export interface logementRequest {
    email: string;
    typeOfLogement: string;
    typeOfProperty?: string;
    showAddress: boolean;
    streetNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
    addressComplement?: string;
    superficie: string;
    roomNumber: string;
    bedroomNumber: string;
    roomAreas?: number[];
    furnished: boolean;
    bathRoomSpace: string;
    powderRoomSpace: string;
    spaceShare?: string[];
    floorNumber: string;
    kWhEP: string;
    kgCO2: string;
    draft: boolean;
    stopProcess?: string;
}