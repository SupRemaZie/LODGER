import Image from "next/image";
import LodgerButton from "@/app/ui/components/LodgerButton";
import {useTranslations} from "next-intl";
import {useState} from "react";

export default function Footer({onPrevious,onNext, requiredField}:{
    onPrevious: ()=>void
    onNext: () => void
    requiredField: string
}) {
    const trans = useTranslations('PropertydepositPage')

    return(
        <footer className=" fixed bottom-0 w-4/5 bg-white ">
            <div className="flex flex-row items-center gap-x-2 ">
                <Image src="/images/line-full.svg" alt="line full" width={100} height={0} className="w-1/3"/>
                <Image src="/images/line-empty.svg" alt="line empty" width={100} height={50} className="w-1/3"/>
                <Image src="/images/line-empty.svg" alt="line empty" width={100} height={50} className="w-1/3"/>
            </div>

            <div className="flex justify-between items-center w-full px-14 py-9">
                <LodgerButton
                    onPress={() => onPrevious()}
                    label={trans("actions.back")}
                    className="text-[#02504D] bg-white stroke-1 stroke-[#CAC6C6] font-[700]"
                    type="no-border"
                />

                <LodgerButton
                    onPress={() => onNext()}
                    isDisabled={!requiredField}
                    label={trans("actions.next")}
                    className="text-white bg-[#02DB82] stroke-1 stroke-[#CAC6C6] font-[700]"
                    type="full-success"
                />
            </div>
        </footer>
    )
}