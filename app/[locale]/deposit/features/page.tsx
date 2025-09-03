"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {useRouter} from "next/navigation";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const {formData} = useFormData()
    const router = useRouter()

    const handleNext = () => {
        console.log(formData)
    }
    const handlePrevious = () => {
        router.push(`dpe`)
    }

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header
                title={trans("stepTwo.stepTwo-subOne.title")}
                question={trans("stepTwo.stepTwo-subOne.question")}
                onSaveAndQuit={() => {}}
            />
            <main className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">
                <section id="content" className="">
                    <h1 className="text-4xl font-bold">{trans("stepTwo.stepTwo-subOne.text")}</h1>
                </section>
            </main>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={[]} step={2}/>
        </div>
    )
}