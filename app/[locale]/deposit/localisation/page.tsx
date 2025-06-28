"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {usePathname, useRouter} from "next/navigation";
import LodgerButton from "@/app/ui/components/LodgerButton";
import AddressMap from "@/app/ui/components/AddressMap";
import Text from "@/app/ui/components/Text";
// import Toggle from "@/app/ui/components/Toggle";

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
                        targetInputIds={{city: "cityField", postcode: "postcodeField", streetNumber: "streetNumber", streetName: "streetName"}}
                        onAddressSelected={(address) => {
                            handleUpdate('city', address.city);
                            handleUpdate('postalCode', address.postcode);
                            handleUpdate('streetNumber', address.streetNumber);
                            handleUpdate('streetName', address.streetName);
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
                        id="streetNumber"
                        title={trans('fieldTitles.streetNumber')}
                        description=""
                        placeholder={trans('fieldPlaceholder.streetNumber')}
                        value={formData.streetNumber}
                        onChange={(value) => handleUpdate('streetNumber', value)}/>
                    <Text
                        id="streetName"
                        title={trans('fieldTitles.streetName')}
                        description=""
                        placeholder={trans('fieldPlaceholder.streetName')}
                        value={formData.streetName}
                        onChange={(value) => handleUpdate('streetName', value)}/>
                    <Text
                        id="detailsField"
                        title={trans('fieldTitles.addressDetailsField')}
                        description=""
                        placeholder={trans('fieldPlaceholder.addressDetailsField')}
                    />
                </section>
            </main>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={['city', 'postalCode', 'streetNumber', 'streetName']} step={1}/>

        </div>
    )
}

/*
<Toggle
                        title={trans('fieldTitles.showAdress')}
                        value={formData.showAddress}
                        onChange={(value) => handleUpdate('showAddress', value)}
                    />
 */