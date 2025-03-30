"use client"
import Link from 'next/link';
import Image from 'next/image';
import {Divider} from "@heroui/divider";
import { albert_sans} from 'app/ui/fonts';
import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";
import React from 'react';
import { HiOutlineHome } from "react-icons/hi2";
import { LuBookmark } from "react-icons/lu";
import { useBreadcrumb } from "app/context/BreadcrumbContext"; // Importer le contexte
import { useTranslations } from 'next-intl';




export default function SideNav() {
  const { currentStep, setCurrentStep } = useBreadcrumb(); // Utiliser le contexte
  const trans = useTranslations('PropertydepositPage')

  return (
    <div className="flex h-full flex-col m-4  md:px-2">
      <Link
        className="flex flex-col h-fit items-start pt-8 pb-4 rounded-md   "
        href="/"
      >
        <Image
        src="/logo_lodger.png"
        width={147}
        height={32}
        className="md:block mb-4"
        alt="lodger logo"
        />
        <Divider />
      </Link>
      <p className={`${albert_sans.className} text-sm text-[#8D8D8D]`}>
        {trans('sidebar.title')}
      </p>

      <div className='pt-5'>
      <Breadcrumbs
          classNames={{
            list: "gap-1 flex flex-col text-center",
          }}
          itemClasses={{
            item: [
              `flex rounded-large w-[244px] h-[46px] px-2 py-0.5 ${albert_sans.className} text-[#02504D]`,
              "data-[current=true]:border-small data-[current=true]:border-[#02DB82] data-[current=true]:bg-[#EFFDF3]",
              "data-[disabled=true]:bg-wite data-[disabled=true]:border-none ",
            ],
            separator: "hidden",
          }}
          size="lg"
        
        >
          <BreadcrumbItem startContent={<HiOutlineHome />} key="Etape1" isCurrent={currentStep === "Etape1"}>
          {trans('sidebar.steps.stepOne')}
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<LuBookmark />} key="Etape2" isCurrent={currentStep === "Etape2"}>
          {trans('sidebar.steps.stepTwo')}
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<LuBookmark />} key="Etape3" isCurrent={currentStep === "Etape3"}>
          {trans('sidebar.steps.stepThree')}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  );
}
