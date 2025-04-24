"use client";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@heroui/divider";
import { albert_sans } from "app/ui/fonts";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { LuBookmark } from "react-icons/lu";
import { useBreadcrumb } from "app/context/BreadcrumbContext"; // Importer le contexte
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Button } from "@heroui/react";
import LodgerButton from "./LodgerButton";

export default function SideNav() {
  const { currentStep, setCurrentStep } = useBreadcrumb(); // Utiliser le contexte
  const trans = useTranslations("PropertydepositPage");

  const setLanguage = (locale: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/${locale}`;
    }

  };

  // fonction pour récupérer la langue actuelle
  const getCurrentLanguage = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const segments = path.split("/");
      return segments[1]; // La langue est le premier segment après le "/"
    }

  };

  return (
    <div className="flex flex-col h-full">
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
          {trans("sidebar.title")}
        </p>

        <div className="pt-5">
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
            <BreadcrumbItem
              startContent={<HiOutlineHome />}
              key="Etape1"
              isCurrent={currentStep === "Etape1"}
            >
              {trans("sidebar.steps.stepOne")}
            </BreadcrumbItem>
            <BreadcrumbItem
              startContent={<LuBookmark />}
              key="Etape2"
              isCurrent={currentStep === "Etape2"}
            >
              {trans("sidebar.steps.stepTwo")}
            </BreadcrumbItem>
            <BreadcrumbItem
              startContent={<LuBookmark />}
              key="Etape3"
              isCurrent={currentStep === "Etape3"}
            >
              {trans("sidebar.steps.stepThree")}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div
        id="down-sidebar"
        className="flex flex-col h-full px-6 justify-end py-10"
      >
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="shadow"
              className="text-primary-100 font-semibold bg-white border-1 border-gray-200"
            >
              <Image
                src={"/icons/flag_" + getCurrentLanguage() + ".svg"}
                alt="Current Flag"
                width={20}
                height={15}
                className="inline-block mr-2  "
              />
              {trans("sidebar.languageSelect." + getCurrentLanguage())}
              <Image
                src="/icons/next-icon.svg"
                alt="Arrow Down"
                width={20}
                height={15}
                className="inline-block ml-2"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="fr" onPress={() => setLanguage("fr")}>
              <Image
                src="/icons/flag_fr.svg"
                alt="French Flag"
                width={20}
                height={15}
                className="inline-block mr-2"
              />
              <Link href="/" locale="fr">
                {trans("sidebar.languageSelect.fr")}
              </Link>
            </DropdownItem>
            <DropdownItem key="en" onPress={() => setLanguage("en")}>
              <Image
                src="/icons/flag_en.svg"
                alt="English Flag"
                width={20}
                height={15}
                className="inline-block mr-2"
              />
              <Link href="/" locale="en">
                {trans("sidebar.languageSelect.en")}
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="mt-4 flex flex-col">
          <Divider className="" />
          <div className="flex flex-col items-left mt-4">
            <Image
              src="/icons/support-icon.svg"
              width={40}
              height={40}
              alt="Footer Logo"
              className="mb-2"
            />
            <p
              className={`${albert_sans.className} text-md font-semibold text-gray-700`}
            >
              {trans("sidebar.footer.title")}
            </p>
            <p
              className={`${albert_sans.className} text-xs text-gray-500 text-left mt-1`}
            >
              {trans("sidebar.footer.description")}
            </p>
            <LodgerButton className="my-4 w-2/3" label={trans("sidebar.footer.help-button")}></LodgerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
