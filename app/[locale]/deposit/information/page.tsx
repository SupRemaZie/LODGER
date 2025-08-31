"use client"
import {useFormData} from "@/app/context/FormDataContext";
import Header from "@/app/ui/components/Header";
import {useTranslations} from "next-intl";
import Footer from "@/app/ui/components/Footer";
import {useRouter} from "next/navigation";
import FormEntry from "@/app/ui/components/FormEntry";
import {logementRequest} from "@/app/api/deposit/types/logementRequest";

export default function Page() {
    const trans = useTranslations('PropertydepositPage')
    const {formData, setFormData} = useFormData()
    const router = useRouter()

    const handleNext = () => {
        router.push(`dpe`)
    }
    const handlePrevious = () => {
        router.push(`localisation`)
    }
    const handleUpdate = (key: string, value: any) => {
        setFormData((prev: logementRequest) => {

            if (typeof value === 'object' && value !== null && 'index' in value && 'value' in value) {
                const currentArray = Array.isArray((prev as Record<string, any>)[key])
                    ? [...(prev as Record<string, any>)[key]]
                    : [];

                const val = Number(value.value);
                if (isNaN(val)) return prev;
                currentArray[value.index] = val;
                return {
                    ...prev,
                    [key]: currentArray,
                };
            }

            if (key === 'bedroomNumber') {
                const currentSurfaces = Array.isArray(prev.roomAreas) ? [...prev.roomAreas] : [];
                const resizedSurfaces = currentSurfaces.slice(0, value);
                return {
                    ...prev,
                    bedroomNumber: value,
                    'roomAreas': resizedSurfaces,
                };
            }
            if (key === 'spaceShare' && Array.isArray(value)) {
                return {
                    ...prev,
                    spaceShare: value,
                };
            }

            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const handleSaveAndQuit = () => {
        setFormData(prev => ({
            ...prev,
            stopProcess: "Information",
        }));
    };


    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Header */}
            <Header
                title={trans("stepOne.stepOne-subThree.title")}
                question={trans("stepOne.stepOne-subThree.question")}
                onSaveAndQuit={handleSaveAndQuit}
            />

            <main className="flex-1 px-16 pt-8 pb-8 overflow-y-auto text-[#02504D]">
                <FormEntry title={trans("formEntry.surface.title")} description={trans('formEntry.surface.description')}
                           logo="/icons/superficie-icon.svg" type="number"
                           onUpdate={(value: number) => handleUpdate('superficie', value)}/>
                {formData.typeOfProperty == "HABITANT" && (
                    <FormEntry title={trans("formEntry.bedrooms-surface.title")}
                               description={trans('formEntry.bedrooms-surface.description')}
                               logo="/icons/superficie-icon.svg"
                               type="number"
                               onUpdate={(value) => (handleUpdate('roomAreas', value))}/>
                )}
                <FormEntry title={trans("formEntry.rooms-number.title")}
                           description={trans('formEntry.rooms-number.description')} logo="/icons/superficie-icon.svg"
                           type="count" onUpdate={(value: number) => (handleUpdate('roomNumber', value))}/>
                {formData.typeOfProperty == "HABITANT" && (
                    <FormEntry title={trans("formEntry.shared-spaces.title")}
                               description={trans('formEntry.shared-spaces.description')}
                               logo="/icons/superficie-icon.svg"
                               type="dropdown"
                               onUpdate={(values: string[]) => (handleUpdate('spaceShare', values))}/>
                )}
                {formData.typeOfProperty != "HABITANT" && (
                    <>
                        <FormEntry title={trans("formEntry.bedrooms-number.title")}
                                   description={trans('formEntry.bedrooms-number.description')}
                                   logo="/icons/superficie-icon.svg" type="count"
                                   onUpdate={(value: number) => (handleUpdate('bedroomNumber', value))}/>
                        {Array.from({length: Number(formData.bedroomNumber)}).map((_, index) => (
                            <FormEntry
                                key={`bedroom-surface-${index}`}
                                title={`${trans("formEntry.bedrooms-surface.title")} ${index + 1}`}
                                description={trans("formEntry.bedrooms-surface.description")}
                                logo="/icons/superficie-icon.svg"
                                type="number"
                                onUpdate={(value: number) => {
                                    handleUpdate('roomAreas', {index, value})
                                }}
                            />
                        ))}
                        <FormEntry title={trans("formEntry.furnished.title")}
                                   description={trans('formEntry.furnished.description')}
                                   logo="/icons/superficie-icon.svg" type="yesno"
                                   onUpdate={(value: number) => (handleUpdate('furnished', value))}/>
                    </>
                )}
                <FormEntry title={trans("formEntry.bathrooms-number.title")}
                           description={trans('formEntry.bathrooms-number.description')}
                           logo="/icons/superficie-icon.svg" type="count"
                           onUpdate={(value: number) => (handleUpdate('bathRoomSpace', value))}/>
                <FormEntry title={trans("formEntry.showers-rooms-number.title")}
                           description={trans('formEntry.showers-rooms-number.description')}
                           logo="/icons/superficie-icon.svg" type="count"
                           onUpdate={(value: number) => (handleUpdate('powderRoomSpace', value))}/>
                {formData.typeOfLogement == "APPARTMENT" && (
                    <>
                        <FormEntry title={trans("formEntry.floor-number.title")}
                                   description={trans('formEntry.floor-number.description')}
                                   logo="/icons/superficie-icon.svg" type="count"
                                   onUpdate={(value: number) => (handleUpdate('appartmentFloor', value))}/>
                    </>
                )}
            </main>

            <Footer onPrevious={handlePrevious} onNext={handleNext} requiredField={['superficie', 'furnished']}
                    step={1}/>
        </div>
    )
}