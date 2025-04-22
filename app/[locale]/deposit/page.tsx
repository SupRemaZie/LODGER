"use client"
import { Input } from "@heroui/input";
import React from "react";
import Image from 'next/image'


export default function Page() {
   

    return (
        <Input
        label="Email"
        labelPlacement="outside"
        placeholder="you@example.com"
        startContent={
          <Image
            src="/images/icons/email.svg"
            alt="email"
            width={20}
            height={20}
            className="absolute top-1/2 left-3 -translate-y-1/2"
            />
        }
        type="email"
      />
    );
}

