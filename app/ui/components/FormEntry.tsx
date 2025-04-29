"use client";
import { NumberInput, cn } from "@heroui/react";
import { Button } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

export default function FormEntry({ title, description, logo, type, onUpdate }: { 
    title: string, 
    description: string, 
    logo: string, 
    type: string, 
    onUpdate: (value: any) => void 
}) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
    const [isYesNo, setIsYesNo] = React.useState(false);
    const [counting, setCounting] = React.useState(0);
    const [number, setNumber] = React.useState(0);

    React.useEffect(() => {
        if (type === "count") onUpdate(counting);
        if (type === "number") onUpdate(number);
        if (type === "dropdown") onUpdate(selectedKeys);
        if (type === "yesno") onUpdate(isYesNo);
    }, [counting, number, selectedKeys, isYesNo]);

    return (
        <div className="flex flex-col items-center justify-center py-1 w-full">
            <div className="flex flex-row items-start justify-center w-full max-w-6xl bg-white rounded-3xl shadow-md p-3 h-30">
                <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex flex-col items-start">
                        <div className="flex flex-row items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                width={32}
                                height={32}
                                className="mr-2"
                            />
                            <div className="text-primary-100 font-bold text-center">
                                {title}
                            </div>
                        </div>
                        <div className="text-gray-600 ml-4 text-center">{description}</div>
                    </div>
                </div>
                {type === "number" && (
                    <div className="flex flex-row justify-end w-full max-w-lg">
                        <NumberInput
                            type="number"
                            placeholder="0 m²"
                            className="w-2/6"
                            min={0}
                            max={999}
                            onChange={(value) => setNumber(Number(value))}
                        />
                    </div>
                )}
                {type === "count" && (
                    <div className="flex flex-row justify-end w-full max-w-lg self-center">
                        <Button isIconOnly className="rounded-full mx-2" onPress={() => {
                            const newValue = counting === 0 ? 0 : counting - 1;
                            setCounting(newValue);
                            onUpdate(newValue);
                        }}>

                        <img
                                src="/icons/minus-icon.svg"
                                alt="Retirer"
                                width={24}
                                height={24}
                            />
                        </Button>
                        <div className="text-primary-100 font-bold text-center align-middle m-2">
                            {counting}
                        </div>
                        <Button isIconOnly className="rounded-full mx-2" onPress={() =>{
                            const newCount = counting + 1;
                            setCounting(newCount);
                            onUpdate(newCount);
                        }}>

                            <img
                                src="/icons/add-icon.svg"
                                alt="Ajouter"
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                )}
                {type === "dropdown" && (
                    <div className="flex flex-row justify-end w-full max-w-lg self-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">Choisir une / des pièces</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectedKeys={selectedKeys}
                                selectionMode="multiple"
                                onSelectionChange={(keys) =>
                                    setSelectedKeys(new Set(Array.from(keys).map(String)))
                                }
                            >
                                <DropdownItem key="salon">Salon</DropdownItem>
                                <DropdownItem key="cuisine">Cuisine</DropdownItem>
                                <DropdownItem key="salledebain">Salle de bain</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )}
                {type === "yesno" && (
                    <div className="flex flex-row justify-end w-full max-w-lg self-center">
                        <RadioGroup orientation="horizontal">
                            <CustomRadio
                                value="yes"
                                className="data-[selected=true]:border-success"
                                color="success"
                                onChange={() => setIsYesNo(true)}
                            >
                                Oui
                            </CustomRadio>
                            <CustomRadio
                                value="no"
                                className="data-[selected=true]:border-danger"
                                color="danger"
                                onChange={() => setIsYesNo(false)}
                            >
                                Non
                            </CustomRadio>
                        </RadioGroup>
                    </div>
                )}
            </div>
        </div>
    );
}

export const CustomRadio = (props: any) => {
    const {children, ...otherProps} = props;

    return (
        <Radio
          {...otherProps}
          classNames={{
            base: cn(
              "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
              "flex-row-reverse max-w-[300px] cursor-pointer rounded-full gap-4 p-2 border-2",
            ),
          }}
        >
          {children}
        </Radio>
    );
};