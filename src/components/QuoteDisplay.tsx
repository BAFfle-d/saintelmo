import { motion } from 'motion/react';
import { Quote, Theme } from '../types';

interface QuoteDisplayProps {
  quote: Quote;
  theme: Theme;
}

export function QuoteDisplay({ quote, theme }: QuoteDisplayProps) {
  return (
    <motion.div
      key={quote.text}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-10 border-4 border-bauhaus-black bg-bauhaus-white/5 backdrop-blur-md relative overflow-hidden"
      style={{ borderColor: theme.black }}
    >
      <div className="absolute top-0 left-0 w-4 h-full bg-bauhaus-red" style={{ backgroundColor: theme.red }} />
      <div className="absolute top-0 right-0 w-4 h-full bg-bauhaus-blue" style={{ backgroundColor: theme.blue }} />
      <div className="absolute top-0 left-0 w-full h-4 bg-bauhaus-yellow" style={{ backgroundColor: theme.yellow }} />
      
      <p className="text-lg md:text-2xl font-display font-medium italic mb-6 whitespace-pre-line leading-tight">
        {quote.text}
      </p>
      <p className="text-base md:text-xl uppercase tracking-[0.3em] font-black opacity-80">
        {quote.source}
      </p>
    </motion.div>
  );
}
