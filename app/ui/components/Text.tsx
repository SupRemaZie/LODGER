"use client";

import React, {useState} from "react";

const Text = ({id, title, description, placeholder}: {
    id: string,
    title: string,
    description: string,
    placeholder: string
}) => {

    const [query, setQuery] = useState('');

    const handleInput = async (e: any) => {
        const value = e.target.value;
        setQuery(value);
    }

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
                value={query}
                onChange={handleInput}
                placeholder={placeholder}
                className="p-2 shadow rounded-xl w-full"
                style={{ border: '1px solid lightgray'}}
            />
        </div>
    );
}

export default Text;