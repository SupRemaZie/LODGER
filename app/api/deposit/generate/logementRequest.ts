import {logementRequest} from "@/app/api/deposit/types/logementRequest";

export function generateDefaultLogementRequest(): logementRequest {
    return {
        email: "test@gmail.com",
        typeOfLogement: "",
        typeOfProperty: "",
        showAddress: true,
        streetNumber: "",
        streetName: "",
        city: "",
        postalCode: "",
        addressComplement: "",
        superficie: "",
        roomNumber: "0",
        bedroomNumber: "0",
        roomAreas: [],
        furnished: false,
        bathRoomSpace: "0",
        powderRoomSpace: "0",
        spaceShare: [],
        floorNumber: "",
        kWhEP: "0",
        kgCO2: "0",
        draft: true,
        stopProcess: ""
    };
}