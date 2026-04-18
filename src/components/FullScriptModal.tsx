import { Music } from 'lucide-react';
import { Modal, BauhausButton } from './BauhausUI';
import { Scene } from '../types';

interface FullScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: Scene | null;
  onBackToReader: () => void;
}

export function FullScriptModal({
  isOpen,
  onClose,
  currentScene,
  onBackToReader
}: FullScriptModalProps) {
  if (!currentScene) return null;

  const openLyrics = (scene: Scene) => {
    if (scene.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${scene.youtubeId}`, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FULL SCRIPT">
      <div className="space-y-12 text-bauhaus-black max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
        <div className="text-center space-y-4 border-b-8 border-bauhaus-black pb-8">
          <h2 className="text-6xl font-display font-black uppercase">{currentScene.title}</h2>
          <p className="text-xl font-display font-bold uppercase tracking-widest opacity-40">Scene {currentScene.id}</p>
        </div>

        <div className="space-y-8 font-sans text-lg">
          {currentScene.script?.map((line, i) => (
            <div key={i} className={`flex ${line.type === 'stage-direction' || line.type === 'musical-number' ? 'justify-center italic opacity-60 py-4' : 'flex-col'}`}>
              {line.type === 'dialogue' && (
                <span className="font-display font-black uppercase text-sm mb-1 text-bauhaus-red">{line.speaker}</span>
              )}
              {line.type === 'musical-number' ? (
                <button 
                  onClick={() => openLyrics(currentScene)}
                  className="text-bauhaus-red font-display font-black uppercase hover:underline flex items-center gap-2"
                >
                  <Music size={16} />
                  {line.text}
                </button>
              ) : (
                <p className={line.type === 'stage-direction' ? 'max-w-xl text-center' : 'pl-4 border-l-4 border-bauhaus-black/10'}>
                  {line.text}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-12 flex justify-center">
          <BauhausButton onClick={onBackToReader} variant="black">Back to Reader</BauhausButton>
        </div>
      </div>
    </Modal>
  );
}
