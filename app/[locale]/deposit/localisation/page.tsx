"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {usePathname, useRouter} from "next/navigation";
import LodgerButton from "@/app/ui/components/LodgerButton";
import AddressMap from "@/app/ui/components/AddressMap";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const {formData, setFormData} = useFormData()
    const router = useRouter()

    const handleNext =() =>{
        router.push(`information`)
    }
    const handlePrevious=()=>{
        if (formData.typeOfLogement === 'MAISON') {
            router.push(`home`)
        } else {
            router.push(`apartment`)
        }
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };
    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-screen p-12 scrollbar-hide">
                <Header title={trans("stepOne.stepOne-subTwo.title")} question={trans("stepOne.stepOne-subTwo.question")} />
                <section id="content" className="pt-8 text-[#02504D]">
                    <span className="font-[700] text-sm">
                        {trans('stepOne.stepOne-subTwo.subtitle')}
                    </span>
                    <AddressMap/>
                </section>
            </div>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfProperty} />

        </div>
    )
}