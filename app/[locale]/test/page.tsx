"use client";
import DPESelector from "@/app/ui/components/DPE_components";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex h-full flex-row m-4  md:px-2">
        <DPESelector />
      </div>
    </div>
  );
}
