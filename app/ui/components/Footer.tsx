import Image from "next/image";
import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import {useFormData} from "@/app/context/FormDataContext";

export default function Footer({onPrevious,onNext, requiredField, step}:{
    onPrevious: ()=> void
    onNext: () => void
    requiredField: string[]
    step : number
}) {
    const trans = useTranslations('PropertydepositPage')
    const {formData} = useFormData();

    const isNextDisabled =  useMemo(() => {
        return requiredField.some((field) => {
            const value = formData[field as keyof typeof formData];
            return !value || value.toString().trim() === '';
        });
    }, [formData, requiredField]);

    return(
        <footer className="w-full bg-white ">
            <div className="flex flex-row items-center gap-x-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Image
                        key={index}
                        src={index < step ? "/images/line-full.svg" : "/images/line-empty.svg"}
                        alt={index < step ? "line full" : "line empty"}
                        width={100}
                        height={50}
                        className="w-1/3"
                    />
                ))}
            </div>

            <div className="flex justify-between items-center w-full px-14 py-9">
                <LodgerButton
                    onPress={() => onPrevious()}
                    label={trans("actions.back")}
                    className="text-[#02504D] bg-white stroke-1 stroke-[#CAC6C6] font-[700]"
                    type="no-border"
                />

                <LodgerButton
                    onPress={() => onNext()}
                    isDisabled={isNextDisabled}
                    label={trans("actions.next")}
                    className="text-white bg-[#02DB82] stroke-1 stroke-[#CAC6C6] font-[700]"
                    type="full-success"
                />
            </div>
        </footer>
    )
}