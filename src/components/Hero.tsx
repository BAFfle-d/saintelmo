import { motion } from 'motion/react';
import { BauhausButton } from './BauhausUI';

interface HeroProps {
  onOpenModal: (id: string) => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
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
