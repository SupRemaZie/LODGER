"use client"
import React, {createContext, useContext, useState} from "react";
const FormDataContext = createContext<any>(null);
export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [formData, setFormData] = useState<any>({});


    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );

}

export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error('useFormData doit être utilisé à l’intérieur d’un FormProvider');
    }
    return context;
};
