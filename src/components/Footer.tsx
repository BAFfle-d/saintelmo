import { Heart } from 'lucide-react';
import { Charity } from '../types';

interface FooterProps {
  charity: Charity;
  onOpenModal: (id: string) => void;
  theme: any;
}

export function Footer({ charity, onOpenModal, theme }: FooterProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 py-6 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border-t-4"
      style={{ 
        backgroundColor: theme.black, 
        color: theme.white,
        borderColor: theme.type === 'dark' ? theme.red : theme.black
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2 w-full md:w-auto">
          <a
            href={charity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 hover:text-bauhaus-yellow transition-colors shrink-0"
          >
            <div className="p-3 border-2 border-bauhaus-white group-hover:border-bauhaus-yellow transition-all group-hover:rotate-12">
              <Heart size={20} className="group-hover:fill-bauhaus-yellow" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest">{charity.name}</p>
              <p className="text-[9px] opacity-40 uppercase tracking-widest">{charity.msg}</p>
            </div>
          </a>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            © 2026 BARRY FLOORE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <button onClick={() => onOpenModal('notes')} className="text-[10px] font-black uppercase tracking-widest hover:text-bauhaus-yellow transition-colors">Notes</button>
            <button onClick={() => onOpenModal('about')} className="text-[10px] font-black uppercase tracking-widest hover:text-bauhaus-yellow transition-colors">About</button>
            <button onClick={() => onOpenModal('contact')} className="text-[10px] font-black uppercase tracking-widest hover:text-bauhaus-yellow transition-colors">Contact</button>
            <button onClick={() => onOpenModal('beta')} className="text-[10px] font-black uppercase tracking-widest hover:text-bauhaus-yellow transition-colors">Beta</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
