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
    // lógica aqui
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={closeModal}>Fechar</button>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginModal;
