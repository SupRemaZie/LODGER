"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import FormEntry from "@/app/ui/components/FormEntry";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        count: 0,
        number: 0,
        dropdown: new Set<string>(),
        yesno: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ici on va recupérer les données dont on a besoin
                await new Promise(resolve => setTimeout(resolve, 1500));
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
        // Vous pouvez envoyer les données au serveur ici
        // fais un mock de l'envoi de données en affichant les données dans la console
        alert("Données envoyées avec succès !");
        console.log("Données envoyées:", formData);
        
    };

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
                <div className="text-center w-full flex flex-col">
                    <h1 className="text-2xl font-bold">Bienvenue sur Lodger !</h1>
                    <p className="text-gray-600">Le contenu est maintenant affiché.</p>
                    <FormEntry
                        title="Nombre de chambres"
                        description="Renseigner le nombre de chambres :"
                        logo="/icons/bed-icon.svg"
                        type="count"
                        onUpdate={(value) => handleUpdate("count", value)}
                    />
                    <FormEntry
                        title="Superficie"
                        description="Renseigner la superficie de votre bien :"
                        logo="/icons/superficie-icon.svg"
                        type="number"
                        onUpdate={(value) => handleUpdate("number", value)}
                    />
                    <FormEntry
                        title="Espaces Partagés"
                        description="Sélectionner les espaces partagés :"
                        logo="/icons/matter-icon.svg"
                        type="dropdown"
                        onUpdate={(value) => handleUpdate("dropdown", value)}
                    />
                    <FormEntry
                        title="Meublé"
                        description="Le bien est-il meublé ?"
                        logo="/icons/sofa-icon.svg"
                        type="yesno"
                        onUpdate={(value) => handleUpdate("yesno", value)}
                    />
                    <Button onPress={handleSubmit} className="mt-4">
                        Soumettre
                    </Button>
                </div>
            )}
        </div>
    );
}

