import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";

export default function Header({title , question} : {
    title: string,
    question: string
}) {
    const trans = useTranslations('PropertydepositPage')
    return(
        <div id="header" className="w-full px-16 pt-12 flex flex-row justify-between  items-center">
            <div className="flex flex-col">
                   <span id="page-title" className="text-[#02504D] font-xl">
                     {title}
                   </span>
                <span className="font-bold text-xl">
                     {question}
                   </span>
            </div>
            <LodgerButton type="default" label={trans("actions.saveAndQuit")}></LodgerButton>
        </div>
    )
}