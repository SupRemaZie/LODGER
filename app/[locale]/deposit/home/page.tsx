"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import FormEntry from "@/app/ui/components/FormEntry";
import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";
import {Button} from "@heroui/react";
import Footer from "@/app/ui/components/Footer";
import Header from "@/app/ui/components/Header";
import { useFormData } from '@/app/context/FormDataContext';
import {usePathname, useRouter} from "next/navigation";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const router = useRouter();
    const pathname = usePathname();
    const {formData, setFormData} = useFormData()



    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };
    const handlePrevious = () =>{
        router.push(`${pathname}`)
    }
    const handleNext = () => {

        if(formData.typeOfLogement == "MAISON"){
            router.push(`localisation`);
        }
        else {
            router.push(`apartment`);
        }
        console.log(formData)
    };


    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header title={trans("stepOne.stepOne-subOneLogement.title")} question={trans("stepOne.stepOne-subOneLogement.title")} />
            <main className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">

                <section id="content" className="pt-8 text-[#02504D]">
                <span className="font-[700] text-sm">
                    {trans('stepOne.content.title')}
                </span>
                    <div className="flex flex-row gap-4 mt-4 font-[600] ">
                        <Button onPress={() => handleUpdate("typeOfLogement", "APPARTEMENT")}
                                variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D]  ${
                                    formData.typeOfLogement === "APPARTEMENT" ? "border-2 border-[#02DB82]" : ""
                                }`}>
                            <Image src="/images/appartment_choice_picture.png" alt="appartment choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6 ">
                            {trans('stepOne.content.propertyType.apartment')}
                        </span>
                        </Button>
                        <Button onPress={() => handleUpdate("typeOfLogement", "MAISON")} variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D] ${formData.typeOfLogement === "MAISON" ? "border-2 border-[#02DB82]" : ""}`}>

                            <Image src="/images/house_choice_picture.png" alt="house choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6">
                            {trans('stepOne.content.propertyType.house')}
                        </span>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfLogement} step={1}/>
        </div>


    );
}
