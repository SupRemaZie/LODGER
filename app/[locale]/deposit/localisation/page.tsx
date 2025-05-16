"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {usePathname, useRouter} from "next/navigation";
import LodgerButton from "@/app/ui/components/LodgerButton";
import AddressMap from "@/app/ui/components/AddressMap";
import Text from "@/app/ui/components/Text";

export default function Page() {
    const trans = useTranslations('PropertydepositPage.stepOne.stepOne-subTwo')
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
        <div className="flex flex-col min-h-screen w-full">
            <Header title={trans("title")} question={trans("question")} />
            <main className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">
                <section id="content" className="text-[#02504D] flex flex-col">
                    <AddressMap
                        title={trans('fieldTitles.addressMap')}
                        description=""
                        targetInputIds={{city: "cityField", postcode: "postcodeField", street: "streetField"}}
                        onAddressSelected={(address) => {
                            handleUpdate('city', address.city);
                            handleUpdate('postalCode', address.postcode);
                            handleUpdate('street', address.street);
                        }}
                    />
                    <Text
                        id="cityField"
                        title={trans('fieldTitles.cityField')}
                        description=""
                        placeholder={trans('fieldPlaceholder.cityField')}
                        value={formData.city}
                        onChange={(value) => handleUpdate('city', value)}/>
                    <Text
                        id="postcodeField"
                        title={trans('fieldTitles.postalCodeField')}
                        description=""
                        placeholder={trans('fieldPlaceholder.postalCodeField')}
                        value={formData.postalCode}
                        onChange={(value) => handleUpdate('postalCode', value)}/>
                    <Text
                        id="streetField"
                        title={trans('fieldTitles.streetField')}
                        description=""
                        placeholder={trans('fieldPlaceholder.streetField')}
                        value={formData.street}
                        onChange={(value) => handleUpdate('street', value)}/>
                    <Text
                        id="detailsField"
                        title={trans('fieldTitles.addressDetailsField')}
                        description=""
                        placeholder={trans('fieldPlaceholder.addressDetailsField')}
                    />
                </section>
            </main>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={['city', 'postalCode', 'street']} step={1}/>

        </div>
    )
}