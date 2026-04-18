import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bauhaus-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl bg-bauhaus-white border-8 border-bauhaus-black shadow-[16px_16px_0px_0px_var(--bauhaus-red)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ borderColor: 'var(--bauhaus-black)', backgroundColor: 'var(--bauhaus-white)' }}
          >
            <div className="flex justify-between items-center p-6 border-b-8 border-bauhaus-black bg-bauhaus-white">
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-bauhaus-black">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bauhaus-red hover:text-bauhaus-white transition-colors border-4 border-bauhaus-black"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface BauhausButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'red' | 'blue' | 'yellow' | 'black' | 'white';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function BauhausButton({ 
  onClick, 
  children, 
  variant = 'white', 
  className = '', 
  disabled = false,
  type = 'button'
}: BauhausButtonProps) {
  const variants = {
    red: 'bg-bauhaus-red text-bauhaus-white hover:bg-bauhaus-black',
    blue: 'bg-bauhaus-blue text-bauhaus-white hover:bg-bauhaus-black',
    yellow: 'bg-bauhaus-yellow text-bauhaus-black hover:bg-bauhaus-black hover:text-bauhaus-white',
    black: 'bg-bauhaus-black text-bauhaus-white hover:bg-bauhaus-red',
    white: 'bg-bauhaus-white text-bauhaus-black hover:bg-bauhaus-yellow',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 border-4 border-bauhaus-black font-display font-black uppercase tracking-widest transition-all
        shadow-[4px_4px_0px_0px_var(--bauhaus-black)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none
        disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface BauhausInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function BauhausInput({ type = 'text', placeholder, value, onChange, className = '' }: BauhausInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-6 py-4 border-4 border-bauhaus-black bg-bauhaus-white font-display font-bold uppercase tracking-widest
        focus:outline-none focus:ring-4 focus:ring-bauhaus-yellow transition-all
        ${className}
      `}
    />
  );
}
