"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import FormEntry from "@/app/ui/components/FormEntry";
import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";
import {Button} from "@heroui/react";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const [formData, setFormData] = useState({
        count: 0,
        number: 0,
        dropdown: new Set<string>(),
        yesno: null,
        choosed: "",
    });


    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = () => {

        console.log("Données envoyées:", formData);
    };

    return (
        <div className="max-h-screen w-full">
            <div className="font-[500] flex flex-col  min-h-screen py-2 scrollbar-hide">
                <div id="header" className="w-full flex flex-row justify-between  items-center">
                    <div className="flex flex-col">
                   <span id="page-title" className="text-[#02504D] font-">
                     {trans('header.title')}
                   </span>
                        <span className="font-bold text-xl">
                     {trans('header.question')}
                   </span>
                    </div>
                    <LodgerButton type="default" label={trans("actions.saveAndQuit")}></LodgerButton>
                </div>
                <section id="content" className="pt-8 text-[#02504D]">
                <span className="font-[700] text-sm">
                    {trans('content.title')}
                </span>
                    <div className="flex flex-row gap-4 mt-4 font-[600]">
                        <Button onPress={() => handleUpdate("choosed", "appartement")}
                                variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D] ${
                                    formData.choosed === "appartement" ? "border-2 border-[#02DB82]" : ""
                                }`}>
                            <Image src="/appartment_choice_picture.png" alt="appartment choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6 ">
                            Appartement
                        </span>
                        </Button>
                        <Button onPress={() => handleUpdate("choosed", "house")} variant="bordered" color="primary"
                                className={`flex flex-col w-1/4 h-1/4 bg-white text-[#02504D] ${formData.choosed === "house" ? "border-2 border-[#02DB82]" : ""}`}>

                            <Image src="/house_choice_picture.png" alt="house choice" width={174} height={174}
                                   className="w-2/3"/>
                            <span className="text-[#02504D] font-bold text-base mb-6">
                            Maison
                        </span>
                        </Button>
                    </div>
                </section>
            </div>
            <footer
                className="flex flex-row justify-between  w-full bg-white ">
                <LodgerButton onPress={() => handleSubmit()} isDisabled={!formData.choosed} label="retour"
                              type={"default"}></LodgerButton>
                <LodgerButton onPress={() => handleSubmit()} isDisabled={!formData.choosed} label="suivant"
                              type={"full-success"}></LodgerButton>
            </footer>
        </div>


    );
}
