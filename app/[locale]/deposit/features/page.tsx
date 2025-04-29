"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {usePathname, useRouter} from "next/navigation";
import LodgerButton from "@/app/ui/components/LodgerButton";
import FormEntry from "@/app/ui/components/FormEntry";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const {formData, setFormData} = useFormData()
    const router = useRouter()
    const pathName = usePathname()

    const handleNext =() =>{
        console.log(formData)
    }
    const handlePrevious=()=>{
        router.push(`dpe`)
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
        console.log(formData)
    };

    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-screen p-12 scrollbar-hide">
                <Header title={trans("stepTwo.stepTwo-subOne.title")} question={trans("stepTwo.stepTwo-subOne.question")} />
                <section id="content" className="flex justify-center items-center text-[#02504D] min-h-screen">
                    <h1 className="text-4xl font-bold">{trans("stepTwo.stepTwo-subOne.text")}</h1>
                </section>
            </div>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfProperty} step={2}/>
        </div>
    )
}