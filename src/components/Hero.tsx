import { motion } from 'motion/react';
import { BauhausButton } from './BauhausUI';

interface HeroProps {
  onOpenModal: (id: string) => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8 relative">
      {/* Bauhaus-inspired Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Animated Gradient Shell */}
        <motion.div 
          className="absolute inset-0 opacity-15 mix-blend-multiply"
          animate={{
            background: [
              'radial-gradient(circle at 10% 20%, var(--bauhaus-red) 0%, transparent 60%)',
              'radial-gradient(circle at 90% 20%, var(--bauhaus-blue) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 90%, var(--bauhaus-yellow) 0%, transparent 60%)',
              'radial-gradient(circle at 10% 20%, var(--bauhaus-red) 0%, transparent 60%)',
            ]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(100px)" }}
        />

        {/* Shifting Shapes */}
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-bauhaus-red/10 blur-[100px]"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-bauhaus-blue/10 blur-[120px]"
          animate={{
            x: [0, -180, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(var(--bauhaus-black) 1px, transparent 1px), linear-gradient(90deg, var(--bauhaus-black) 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 w-full"
      >
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-6xl md:text-9xl font-display font-black uppercase leading-none tracking-tighter flex justify-between w-full">
            {"GEOFF".split('').map((c, i) => <span key={i}>{c}</span>)}
            <span className="text-bauhaus-red">&</span>
            {"MAXIE".split('').map((c, i) => <span key={i}>{c}</span>)}
          </h1>
          <div className="bg-bauhaus-black text-bauhaus-white py-4 px-6">
            <p className="text-xs md:text-2xl font-display font-bold uppercase tracking-[0.4em] flex justify-between w-full">
              {"A NEW MUSICAL PARODY ABOUT AN ISLAND".split('').map((c, i) => (
                <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </p>
          </div>
          <p className="text-[10px] md:text-lg font-display font-medium uppercase tracking-[0.5em] italic opacity-60 flex justify-between w-full mt-2">
            {"(AND THE MONSTERS THAT LIVE ON IT)".split('').map((c, i) => (
              <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </p>
        </div>

        <div className="w-full h-48 md:h-80 overflow-hidden border-4 border-bauhaus-black relative mb-8">
          <img 
            src="https://drive.google.com/thumbnail?id=1hHeHXi3Y-um24IOq2B5K8-fT9t7OwivD&sz=w1600" 
            alt="Geoff & Maxie Banner" 
            className="w-full h-[200%] object-cover object-top"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/geoffmaxie/1600/600";
            }}
          />
          <div className="absolute inset-0 bg-bauhaus-red/5 mix-blend-multiply" />
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 mb-8 w-full">
        <BauhausButton 
          onClick={() => onOpenModal('listen')}
          variant="yellow"
          className="flex-[1.4] py-8 !text-3xl md:!text-5xl"
        >
          Listen
        </BauhausButton>
        <BauhausButton 
          onClick={() => onOpenModal('act1')}
          variant="red"
          className="flex-1 py-8 !text-3xl md:!text-5xl"
        >
          Act 1
        </BauhausButton>
        <BauhausButton 
          onClick={() => onOpenModal('act2')}
          variant="blue"
          className="flex-1 py-8 !text-3xl md:!text-5xl"
        >
          Act 2
        </BauhausButton>
      </div>
    </div>
  );
}
