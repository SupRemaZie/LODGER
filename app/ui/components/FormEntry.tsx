"use client";
import { NumberInput } from "@heroui/react";

export default function FormEntry({ title, description, logo, type }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-1 w-full bg-red-400">
      <div className="flex flex-row items-start justify-center w-full max-w-6xl p-2 bg-white rounded-3xl shadow-md">
        <div className="flex flex-col items-start justify-center w-full mt-2 ml-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center">
              <img
                src={logo}
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <div className="text-primary-100 font-bold">{title}</div>
            </div>
            <div className="text-gray-600 ml-2">{description}</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center w-full max-w-lg m-3">
            <NumberInput type="number" placeholder="0 m²" className="w-2/6"/>
        </div>
      </div>
    </div>
  );
}
