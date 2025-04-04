"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // ici on va recupérere les données dont on a besoin
                await new Promise(resolve => setTimeout(resolve, 1500));

                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? (
                // Logo scintillant (loader)
                <div className={"flex flex-col loader-animation text-center"}>
                <Image
                    src="/logo_lodger.png"
                    width={147}
                    height={32}
                    className=""
                    alt="lodger logo"
                />
                <p>Loading ... </p>
                </div>
            ) : (
                // Contenu final après chargement
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Bienvenue sur Lodger !</h1>
                    <p className="text-gray-600">Le contenu est maintenant affiché.</p>
                </div>
            )}



        </div>
    );
}
