"use client";

import {Switch} from "@heroui/react";
import React from "react";

const Toggle = ({title, description, value = true, onChange}: {
    title?: string;
    description?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}) =>  {
    return <div className="w-3/5 mb-4 mt-4">
        <div className="mb-4">
            <div className="text-primary-100 font-bold">
                {title}
            </div>
            <div className="text-gray-600">{description}</div>
        </div>
        <Switch
            color={"success"}
            defaultSelected aria-label="Automatic updates"
            checked={value}
            onChange={(e) => onChange?.(e.target.checked)}
        />
    </div>
}

export default Toggle;