"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {usePathname, useRouter} from "next/navigation";
import LodgerButton from "@/app/ui/components/LodgerButton";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const {formData, setFormData} = useFormData()
    const router = useRouter()
    const pathName = usePathname()

    const handleNext =() =>{
        router.push(`localisation`)
    }
    const handlePrevious=()=>{
        router.push(`home`)
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header title={trans("stepOne.stepOne-subOneBiens.title")} question={trans("stepOne.stepOne-subOneBiens.question")} />
            <div className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">

                <section id="content" className="pt-8 text-[#02504D]">
                    <span className="font-[700] text-sm">
                        {trans('stepOne.content.title')}
                    </span>
                    <div className="flex flex-col gap-4 mt-4 font-[600] min-h-full ">
                        <LodgerButton onPress={() =>handleUpdate("typeOfProperty", "ENTIER")} className={`w-1/3 h-24 ${formData.typeOfProperty === "ENTIER" ? "border-2 border-[#02DB82]" : ""}`} label={trans("stepOne.content.logementType.full")}/>
                        <LodgerButton onPress={() =>handleUpdate("typeOfProperty", "COLOCATION")} className={`w-1/3 h-24 ${formData.typeOfProperty === "COLOCATION" ? "border-2 border-[#02DB82]" : ""}`} label={trans("stepOne.content.logementType.shared")}/>
                        <LodgerButton onPress={() =>handleUpdate("typeOfProperty", "HABITANT")} className={`w-1/3 h-24 ${formData.typeOfProperty === "HABITANT" ? "border-2 border-[#02DB82]" : ""}`} label={trans("stepOne.content.logementType.room-apart")}/>
                    </div>
                </section>
            </div>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfProperty} step={1}/>
        </div>
    )
}