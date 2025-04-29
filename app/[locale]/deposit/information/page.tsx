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
        router.push(`dpe`)
        console.log(formData)
    }
    const handlePrevious=()=>{
        router.push(`localisation`)
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => {
            // Cas: mise à jour d'un tableau avec index (ex: { index: 1, value: 20 })
            if (typeof value === 'object' && value !== null && 'index' in value && 'value' in value) {
                const currentArray = Array.isArray((prev as Record<string, any>)[key])
                    ? [...(prev as Record<string, any>)[key]]
                    : [];

                const val = Number(value.value);
                if (isNaN(val)) return prev; // ignore les valeurs non numériques
                currentArray[value.index] = val;
                return {
                    ...prev,
                    [key]: currentArray,
                };
            }

            // Cas spécial : adapter taille d’un tableau à un nombre (ex: nombre de chambres)
            if (key === 'bedroomNumber') {
                const currentSurfaces = Array.isArray(prev['bedroom-surface']) ? prev['bedroom-surface'] : [];
                const resizedSurfaces = currentSurfaces.slice(0, value);
                return {
                    ...prev,
                    bedroomNumber: value,
                    'bedroom-surface': resizedSurfaces,
                };
            }
            if (key === 'spaceShare' && Array.isArray(value)) {
                return {
                    ...prev,
                    spaceShare: value,
                };
            }

            // Cas simple : champ de base
            return {
                ...prev,
                [key]: value,
            };
        });
        console.log(formData)
    };




    const test = (key: string, value: number) => {
        handleUpdate(key, value);
    }

    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-screen p-12 scrollbar-hide">
                <Header title={trans("stepOne.stepOne-subThree.title")} question={trans("stepOne.stepOne-subThree.question")} />
                <section id="content" className="flex flex-col pt-8 gap-2 text-[#02504D] overflow-y-auto h-96">
                    <FormEntry title={trans("formEntry.surface.title")} description={trans('formEntry.surface.description')} logo="/icons/superficie-icon.svg" type="number" onUpdate={(value : number)=>handleUpdate('superficie',value )}/>
                    {formData.typeOfProperty == "HABITANT" && (
                        <FormEntry title={trans("formEntry.bedrooms-surface.title")}
                                   description={trans('formEntry.bedrooms-surface.description')}
                                   logo="/icons/superficie-icon.svg"
                                   type="number"
                                   onUpdate={(value)=>(handleUpdate('bedroom-surface', value))}
                        />
                    )}
                    <FormEntry title={trans("formEntry.rooms-number.title")} description={trans('formEntry.rooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value : number)=>(handleUpdate('roomNumber', value))}/>
                    {formData.typeOfProperty == "HABITANT" && (
                        <FormEntry title={trans("formEntry.shared-spaces.title")}
                                   description={trans('formEntry.shared-spaces.description')}
                                   logo="/icons/superficie-icon.svg"
                                   type="dropdown"
                                   onUpdate={(values: string[] ) => (handleUpdate('spaceShare',  values) )}
                        />
                    )}
                    {formData.typeOfProperty != "HABITANT" && (
                        <>
                            <FormEntry title={trans("formEntry.bedrooms-number.title")} description={trans('formEntry.bedrooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value :number)=>(handleUpdate('bedroomNumber', value))}/>
                            {Array.from({ length: Number(formData.bedroomNumber) }).map((_, index) => (
                                <FormEntry
                                    key={`bedroom-surface-${index}`}
                                    title={`${trans("formEntry.bedrooms-surface.title")} ${index + 1}`}
                                    description={trans("formEntry.bedrooms-surface.description")}
                                    logo="/icons/superficie-icon.svg"
                                    type="number"
                                    onUpdate={(value: number) => {
                                        handleUpdate('bedroom-surface', { index, value })
                                    }}
                                />
                            ))}
                            <FormEntry title={trans("formEntry.furnished.title")} description={trans('formEntry.furnished.description')} logo="/icons/superficie-icon.svg" type="yesno" onUpdate={(value : number)=>(handleUpdate('furnished', value))}/>
                        </>
                    )}

                    <FormEntry title={trans("formEntry.bathrooms-number.title")} description={trans('formEntry.bathrooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value : number)=>(handleUpdate('bathRoomSpace', value))}/>
                    <FormEntry title={trans("formEntry.showers-rooms-number.title")} description={trans('formEntry.showers-rooms-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value : number)=>(handleUpdate('powderRoomSpace', value))}/>
                    <FormEntry title={trans("formEntry.floor-number.title")} description={trans('formEntry.floor-number.description')} logo="/icons/superficie-icon.svg" type="count" onUpdate={(value : number)=> (handleUpdate('appartmentFloor', value))}/>

                </section>
            </div>
            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={formData.typeOfProperty} step={1}/>

        </div>
    )
}