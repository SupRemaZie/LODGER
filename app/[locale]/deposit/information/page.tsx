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
        router.push(`${pathName}/DPE`)
        console.log(formData)
    }
    const handlePrevious=()=>{
        router.push(`localisation`)
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({...prev, [key]: value}));
        console.log(formData)
    };

    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-screen p-12 scrollbar-hide">
                <Header title={trans("stepOne.stepOne-subThree.title")} question={trans("stepOne.stepOne-subThree.question")} />
                <section id="content" className="flex flex-col pt-8 text-[#02504D] overflow-y-auto">
                    <FormEntry title={trans("formEntry.surface.title")} description={trans('formEntry.surface.description')} logo="/icons/superficie-icon.svg" type="number" onUpdate={(value)=>handleUpdate('superficie',value )}/>
                    <FormEntry title={trans("formEntry.rooms-number.title")} description={trans('formEntry.rooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value)=>(handleUpdate('roomNumber', value))}/>
                    <FormEntry title={trans("formEntry.bedrooms-number.title")} description={trans('formEntry.bedrooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value)=>(handleUpdate('bedroomNumber', value))}/>




                </section>
            </div>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfProperty} />

        </div>
    )
}