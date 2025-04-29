"use client";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@heroui/divider";
import { albert_sans } from "app/ui/fonts";
import React, { useEffect, useState } from "react";
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
import { useRef } from "react";

export default function SideNav() {
  const { currentStep, setCurrentStep } = useBreadcrumb();
  const router = useRouter();
  const pathname = usePathname();
  const trans = useTranslations("PropertydepositPage");
  
  const validatedSubSteps = [
    { step: "home", values: [0, 0, 0, 0] },
    { step: "apartment", values: [0, 0, 0, 0] },
    { step: "localisation", values: [1, 0, 0, 0] },
    { step: "information", values: [1, 1, 0, 0] },
    { step: "dpe", values: [1, 1, 1, 0] }
  ]

  const actualStep = () => {
    const segments = pathname.split("/");
    return segments[segments.length - 1] === "features" ? ["2"] : ["1"];
  };

  const otherSteps = () => {
    const steps = ["1", "2", "3"];
    const currentStep = actualStep();
    return steps.filter((step) => !currentStep.includes(step));
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>(actualStep());
  const [disabledKeys, setDisabledKeys] = useState<string[]>(otherSteps());

  // Mettre à jour les clés sélectionnées et désactivées lorsque le chemin change
  useEffect(() => {
    setSelectedKeys(actualStep());
    setDisabledKeys(otherSteps());
  }, [pathname]);

  return (
    <div className="hidden md:flex flex-col h-full">
      <div className="flex h-full flex-col m-4 md:px-2">
        <Link
          className="flex flex-col h-fit items-start pt-8 pb-4 rounded-md"
          href="/"
        >
          <Image
            src="/images/logo_lodger.png"
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
          <Accordion
            variant="splitted"
            selectedKeys={selectedKeys} // Utilisation des clés contrôlées
            disabledKeys={disabledKeys} // Utilisation des clés contrôlées
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title={trans("sidebar.steps.stepOne")}
              startContent={<HiOutlineHome />}
              classNames={{
                base: "bg-green-50 border-1 border-green-400",
                title: "text-primary-100 font-semibold",
              }}
            >
              <div className="flex flex-col gap-2">
                {validatedSubSteps.map((step) => {
                  const segments = pathname.split("/");
                  const lastSegment = segments[segments.length - 1];
                  if (lastSegment === step.step) {
                    return step.values.map((value, index) => (
                      <ValidateSubstep
                        key={index}
                        label={trans(`sidebar.steps.stepOneSub${index + 1}`)}
                        isDisabled={value === 0}
                        isValid={value === 1}
                      />
                    ));
                  }
                  return null;
                })}
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title={trans("sidebar.steps.stepTwo")}
              startContent={<LuBookmark />}
            >
              <div className="flex flex-col gap-2">
                <ValidateSubstep
                  label={trans("sidebar.steps.stepTwoSubOne")}
                  isValid={false}
                />
                <ValidateSubstep
                  label={trans("sidebar.steps.stepTwoSubTwo")}
                  isDisabled
                  isValid={false}
                />
                <ValidateSubstep
                  label={trans("sidebar.steps.stepTwoSubThree")}
                  isDisabled
                  isValid={false}
                />
              </div>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title={trans("sidebar.steps.stepThree")}
              startContent={<LuBookmark />}
            ></AccordionItem>
          </Accordion>
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
