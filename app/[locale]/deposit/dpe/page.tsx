"use client";
import { useFormData } from "@/app/context/FormDataContext";
import DPESelector from "@/app/ui/components/DPE_components";
import Footer from "@/app/ui/components/Footer";
import Header from "@/app/ui/components/Header";
import { useRouter} from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const { formData, setFormData } = useFormData();

  const handlePrevious = () => {
    router.push(`information`);
  };

  const handleNext = () => {
    router.push(`features`);
  };

  const handleUpdate = (key: string, value: any) => {
    setFormData((prev) => ({...prev, [key]: value}));
    console.log(formData)
};

  return (
    <>
      <div className="w-full">
        <div className="font-[500] flex flex-col min-h-screen p-12 scrollbar-hide">
          <Header
            question="Indiquer le DPE de votre bien"
            title="Etape 1 - Diagnostic"
          />
          <section className="flex flex-col pt-8 text-[#02504D] overflow-y-auto w-full">
            <DPESelector handleUpdate={handleUpdate} />
          </section>
        </div>
      </div>
      <Footer
            requiredField={formData.kWhEP}
            onNext={handleNext}
            onPrevious={handlePrevious}
            step={1}
          />
    </>
  );
}
