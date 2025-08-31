"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { logementRequest } from "@/app/api/deposit/types/logementRequest";
import {generateDefaultLogementRequest} from "@/app/api/deposit/generate/logementRequest";

interface FormDataContextType {
    formData: logementRequest;
    setFormData: React.Dispatch<React.SetStateAction<logementRequest>>;
}

const defaultFormData: logementRequest = generateDefaultLogementRequest();

const FormDataContext = createContext<FormDataContextType>({
    formData: defaultFormData,
    setFormData: () => {},
});

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
    const [formData, setFormData] = useState<logementRequest>(defaultFormData);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const stored = localStorage.getItem("formData");
            if (stored) {
                const parsed = safeParse(stored);
                setFormData({...defaultFormData, ...parsed});
            }
        } catch (e) {
            console.error("Erreur parsing formData:", e);
        } finally {
            setIsHydrated(true);
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("formData", safeStringify(formData));
        }
    }, [formData, isHydrated]);

    if (!isHydrated) return null;

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
