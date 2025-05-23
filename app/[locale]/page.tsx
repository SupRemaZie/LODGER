"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/deposit/home"); // Redirige vers la page de dépôt
  }, []);

  return null; 
}

