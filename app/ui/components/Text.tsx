"use client";

import React from "react";

const Text = ({id, title, description, placeholder, value, onChange}: {
    id: string,
    title: string,
    description: string,
    placeholder: string,
    value?: string,
    onChange?: (value: string) => void;
}) => {

    return (
        <div className="w-3/5 mb-4 mt-4">
            <div className="mb-4">
                <div className="text-primary-100 font-bold">
                    {title}
                </div>
                <div className="text-gray-600">{description}</div>
            </div>
            <input
                id={id}
                value={value || ''}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="p-2 shadow rounded-xl w-full"
                style={{ border: '1px solid lightgray'}}
            />
        </div>
    );
}

export default Text;