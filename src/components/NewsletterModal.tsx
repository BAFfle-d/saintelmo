import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Modal, BauhausButton, BauhausInput } from './BauhausUI';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    localStorage.setItem('newsletter_signed_up', 'true');
    onClose();
    setEmail('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="JOIN THE MOVEMENT">
      <div className="py-8 text-bauhaus-black">
        <div className="mb-8">
          <h3 className="text-4xl font-display font-black uppercase leading-none mb-4">
            Stay <span className="text-bauhaus-red">Informed</span>.
          </h3>
          <p className="font-sans text-lg leading-relaxed opacity-80">
            Subscribe to our newsletter for exclusive updates on new scenes, original tracks, 
            and behind-the-scenes production notes. Be the first to know when the curtain rises.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <BauhausInput
              type="email"
              placeholder="YOUR.EMAIL@EXAMPLE.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-bauhaus-blue">
              <Mail size={24} />
            </div>
          </div>

          <BauhausButton
            onClick={() => {}} // Form handles submit
            variant="blue"
            className="w-full py-6 text-2xl"
          >
            Subscribe Now
          </BauhausButton>

          <p className="text-center text-xs uppercase tracking-widest opacity-40">
            No spam. No noise. Just the truth.
          </p>
        </form>
      </div>
    </Modal>
  );
}
