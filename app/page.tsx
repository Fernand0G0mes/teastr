"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToNutritionForm = () => {
    router.push("/nutrition-form");
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#fffde7] to-[#fcdbb5] flex flex-col items-center justify-between text-center px-6 font-sans overflow-hidden">
      {/* Conteúdo principal */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto py-10">
        {/* Logo */}
        <img
          src="/LogoNutrana.svg"
          alt="Logo de Nutrana"
          className="w-[200px] md:w-[500px] h-auto mb-2"
        />

        {/* Títulos */}
        <div className="flex flex-col gap-y-[-10px]">
          <h1 className="text-3xl md:text-3xl font-extrabold text-[#9c7800] -mb-1 md:-mb-2">
            COME MEJOR,
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-[#9c7800] mb-10">
            Obtén Resultados
          </h2>

          {/* Subtítulo */}
          <p className="mb-8 text-[#9c7800]/90 max-w-md font-medium text-sm md:text-base">
            Plan nutricional personalizado en <strong>2 minutos</strong>.<br />
            Descubre tu plan alimenticio ideal basado en
            <br /> tu cuerpo, metas y estilo de vida.
          </p>

          {/* Botão principal */}
          <button
            className="bg-white text-[#06e96c] px-6 py-3 rounded-xl hover:bg-[#ecff83] mb-4 font-semibold transition-all"
            onClick={goToNutritionForm}
          >
            Comenzar Ahora
          </button>
        </div>

        {/* Link de login */}
        <button
          className="text-sm text-[#9c7800]/80 hover:underline font-normal bg-transparent border-none p-0 cursor-pointer"
          onClick={openModal}
          aria-haspopup="dialog"
        >
          ¿Ya tienes una cuenta? <strong>Inicia sesión</strong>
        </button>
      </div>

      {/* Imagens */}
      <div className="relative w-full mt-8 mb-12 px-4">
        <div className="relative max-w-[280px] md:max-w-[400px] lg:max-w-[700px] mx-auto aspect-square">
          <img 
            src="/Model_Fruit_COLOR.png" 
            alt="Fruit Model Color" 
            className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-700"
          />
          <img 
            src="/Model_Fruit_BW.png" 
            alt="Fruit Model Black and White" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-8 w-full">
        <div className="container mx-auto px-4">
          {/* ... (mantenha o mesmo conteúdo do footer) ... */}
        </div>
      </footer>

      {/* Modal de Login */}
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </main>
  );
}