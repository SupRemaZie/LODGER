"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import FormEntry from "@/app/ui/components/FormEntry";
import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";
import {Button} from "@heroui/react";
import Footer from "@/app/ui/components/Footer";
import Header from "@/app/ui/components/Header";
import { useFormData } from '../../context/FormDataContext';
import {usePathname, useRouter} from "next/navigation";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const router = useRouter();
    const pathname = usePathname();
    const {formData, setFormData} = useFormData()



    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = () => {

        if(formData.choosed){
            router.push(`${pathname}/${formData.choosed}`);
        }
    };


    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-content p-14 scrollbar-hide">
                <Header title={trans("header.title")} question={trans("header.question")} />
                <section id="content" className="pt-8 text-[#02504D]">
                <span className="font-[700] text-sm">
                    {trans('content.title')}
                </span>
                    <div className="flex flex-row gap-4 mt-4 font-[600] ">
                        <Button onPress={() => handleUpdate("choosed", "appartement")}
                                variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D]  ${
                                    formData.choosed === "appartement" ? "border-2 border-[#02DB82]" : ""
                                }`}>
                            <Image src="/images/appartment_choice_picture.png" alt="appartment choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6 ">
                            {trans('propertyType.apartment')}
                        </span>
                        </Button>
                        <Button onPress={() => handleUpdate("choosed", "house")} variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D] ${formData.choosed === "house" ? "border-2 border-[#02DB82]" : ""}`}>

                            <Image src="/images/house_choice_picture.png" alt="house choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6">
                            {trans('propertyType.house')}
                        </span>
                        </Button>
                    </div>
                </section>
            </div>
        <Footer onSubmit={handleSubmit} formData={formData} />
        </div>


    );
}
