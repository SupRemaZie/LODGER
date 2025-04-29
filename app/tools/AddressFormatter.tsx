
type AddressType = "city" | "house" | "street" | "district" | "other" | "locality";

interface AddressData {
    properties: {
        type: AddressType;
        postcode?: string;
        name?: string;
        country?: string;
        housenumber?: string;
        street?: string;
        city?: string;
        osm_value?: string;
    }
}

const formatStreetAndDistrictAndOther = (data: AddressData): string => {
    return [
        data.properties.name ?? '',
        data.properties.postcode ? ','  + data.properties.postcode : '',
        data.properties.city,
        ' - ' + data.properties.country
    ]
        .filter(Boolean)
        .join(' ');
}

const formatters: Record<AddressType, (data: AddressData) => string> = {
    city: (data) =>
        [data.properties.postcode ?? '', data.properties.name, ' - ', data.properties.country]
            .filter(Boolean)
            .join(' '),
    house: (data) =>
        [
            data.properties.housenumber ?? '',
            data.properties.street ? data.properties.street : '',
            data.properties.postcode ?? '',
            data.properties.city,
        ]
            .filter(Boolean)
            .join(' '),

    street: formatStreetAndDistrictAndOther,
    district: formatStreetAndDistrictAndOther,
    other: (data) =>
        [
            data.properties.osm_value + ' - ',
            data.properties.country
        ]
            .filter(Boolean)
            .join(' '),

    locality: (data) =>
        [
            "localité - ",
            data.properties.country
        ]
        .filter(Boolean)
        .join(' '),
}

export const formatSelectedAddress = (data: AddressData): string => {
    const formatter = formatters[data.properties.type];
    if (!formatter) {
        console.error("Error when formatting selected address");
        return "Error";
    }
    return formatter(data);
}
