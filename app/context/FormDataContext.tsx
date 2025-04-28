"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LogementData } from "@/app/api/interface";

interface FormDataContextType {
    formData: LogementData;
    setFormData: React.Dispatch<React.SetStateAction<LogementData>>;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

const defaultFormData: LogementData = {
    email: "",
    typeOfLogement: "",
    typeOfProperty: "",
    draft: false,
    stopProcess: "",
    logementType: "",
    propertyType: "",
    displayPreciseAddress: false,
    postalCode: "",
    city: "",
    street: "",
    numero: "",
    addressComplement: "",
    superficie: "",
    roomNumber: "",
    bedroomNumber: "",
    furnished: false,
    bathRoomSpace: BigInt(0),
    powderRoomSpace: BigInt(0),
    appartmentFloor: BigInt(0),
    kWhEP: BigInt(0),
    kgCO2: BigInt(0),
    roomAreas: [],
    spaceShare: [],
};

// 🔥 Serialize safely BigInt
function safeStringify(obj: any) {
    return JSON.stringify(obj, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    );
}

// 🔥 Parse safely and restore BigInt
function safeParse(str: string) {
    return JSON.parse(str, (_, value) => {
        if (typeof value === "string" && /^\d+$/.test(value)) {
            try {
                return BigInt(value);
            } catch {
                return value;
            }
        }
        return value;
    });
}

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<LogementData>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("formData");
            if (stored) {
                try {
                    const parsed = safeParse(stored);
                    return {
                        ...defaultFormData,
                        ...parsed,
                    };
                } catch (e) {
                    console.error("Erreur parsing formData:", e);
                    return defaultFormData;
                }
            }
        }
        return defaultFormData;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("formData", safeStringify(formData));
        }
    }, [formData]);

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (context === undefined) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }
    return context;
};
