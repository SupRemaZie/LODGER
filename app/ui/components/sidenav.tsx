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
import { Accordion, AccordionItem } from "@heroui/react";
import { Link as HeroLink } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

export default function SideNav() {
  const { currentStep, setCurrentStep } = useBreadcrumb(); // Utiliser le contexte
  const router = useRouter();
  const pathname = usePathname();
  const trans = useTranslations("PropertydepositPage");



  const setLanguage = (locale: string) => {
    const segments = pathname.split("/");

    if (segments.length > 1) {
      segments[1] = locale; // changer la langue dans l'URL
      const newPath = segments.join("/") || "/";
      router.replace(newPath); // remplace l'URL sans reload
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
          <Accordion variant="splitted" defaultSelectedKeys={["1"]} disabledKeys={["2", "3"]}>
            <AccordionItem key="1" aria-label="Accordion 1" title={trans("sidebar.steps.stepOne")} startContent={<HiOutlineHome />} classNames={{base: "bg-green-50 border-1 border-green-400", title: "text-primary-100 font-semibold"}}>
                <div className="flex flex-col gap-2">
                <ValidateSubstep label={trans("sidebar.steps.stepOneSubOne")} isValid={true} />
                <ValidateSubstep label={trans("sidebar.steps.stepOneSubTwo")} isDisabled isValid={false} />
                <ValidateSubstep label={trans("sidebar.steps.stepOneSubThree")} isDisabled isValid={false} />
                <ValidateSubstep label={trans("sidebar.steps.stepOneSubFour")} isDisabled isValid={false} />
                </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title={trans("sidebar.steps.stepTwo")}
              startContent={<LuBookmark />}
            ></AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title={trans("sidebar.steps.stepThree")}
              startContent={<LuBookmark />}
            ></AccordionItem>
          </Accordion>
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
              <Image src="/icons/flag_fr.svg" alt="French Flag" width={20} height={15} className="inline-block mr-2" />
              {trans("sidebar.languageSelect.fr")}
            </DropdownItem>
            <DropdownItem key="en" onPress={() => setLanguage("en")}>
              <Image src="/icons/flag_en.svg" alt="English Flag" width={20} height={15} className="inline-block mr-2" />
              {trans("sidebar.languageSelect.en")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="mt-4 flex flex-col">
          <Divider className="" />
          <div className="flex flex-col items-left mt-4 gap-y-2">
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
            <LodgerButton type="no-border" className="m-2 w-4/5" label={trans("sidebar.footer.help-button")}></LodgerButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ValidateSubstep({ isValid, label, isDisabled }: { isValid?: boolean, label?: string, isDisabled?: boolean }) {
  return (
    <>
      <HeroLink isDisabled={isDisabled} className="text-primary-100">
        <Image
          src={"/icons/" + (isValid || false ? "filled" : "empty") + "-circle-icon.svg"}
          width={16}
          height={16}
          className="mr-1"
          alt="lodger logo"
        />
        {label || "Etape ?"}
      </HeroLink>
    </>
  );
}
