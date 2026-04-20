import { Heart, Video, StickyNote, Info, Mail, FlaskConical } from 'lucide-react';

interface NavigationProps {
  onOpenModal: (id: string) => void;
}

export function Navigation({ onOpenModal }: NavigationProps) {
  const navItems = [
    { id: 'characters', label: 'Characters', icon: <Heart size={18} /> },
    { id: 'bts', label: 'Behind the Scenes', icon: <Video size={18} /> },
    { id: 'notes', label: 'Notes', icon: <StickyNote size={18} /> },
    { id: 'about', label: 'About', icon: <Info size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b-4 border-bauhaus-black bg-bauhaus-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-display font-black tracking-tighter uppercase">
          G<span className="text-bauhaus-red">&</span>M
        </div>
        <div className="flex gap-4 md:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onOpenModal(item.id);
              }}
              className="flex items-center gap-2 font-display font-black uppercase text-[10px] tracking-[0.2em] transition-colors hover:text-bauhaus-red"
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
