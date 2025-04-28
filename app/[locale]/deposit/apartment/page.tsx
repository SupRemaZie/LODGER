"use client"
import {useFormData} from "@/app/context/FormDataContext";

export default function Page() {
    const {formData, setFormData} = useFormData()
    console.log(formData)
    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-content p-14 scrollbar-hide">
                <h1>Page</h1>
            </div>
        </div>
    )
}