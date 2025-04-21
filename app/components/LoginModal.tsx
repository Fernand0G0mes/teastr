'use client';

import React from 'react';

type LoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const LoginModal = ({ isOpen, closeModal }: LoginModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione sua lógica de login aqui
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: 'url(/BACK_Login.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div
        className="bg-white rounded-[25px] w-full max-w-[330px] min-h-[200px] p-8 shadow-lg relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Fechar modal"
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={closeModal}
        >
          &times;
        </button>

        <h2 id="modal-title" className="text-2xl font-semibold mb-4 text-center">
          ¡Tu plan está listo!
        </h2>

        <button 
          type="button"
          className="w-full mb-4 bg-[#9c7800] text-white py-2 rounded-lg flex justify-center items-center"
        >
          <span className="mr-2">🔒</span> INICIAR CON GOOGLE
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Your email address"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              id="password"
              required
              minLength={6}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#06e96c] text-white py-2 rounded-[20px] hover:bg-[#85f89e] transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
