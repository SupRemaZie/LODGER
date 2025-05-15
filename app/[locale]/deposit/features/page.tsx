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
        <div className="flex flex-col min-h-screen w-full">
            <Header title={trans("stepTwo.stepTwo-subOne.title")} question={trans("stepTwo.stepTwo-subOne.question")} />
            <main className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">
                <section id="content" className="">
                    <h1 className="text-4xl font-bold">{trans("stepTwo.stepTwo-subOne.text")}</h1>
                </section>
            </main>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={[]} step={2}/>
        </div>
    )
}