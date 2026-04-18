import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Music, ArrowLeft, ArrowRight, RotateCcw, RotateCw } from 'lucide-react';
import { Modal, BauhausButton } from './BauhausUI';
import { Scene, ScriptCard, Track } from '../types';
import { getLatestVersion } from '../lib/utils';

interface SceneReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: Scene | null;
  currentAct: 1 | 2;
  currentSceneIndex: number;
  scriptCards: ScriptCard[];
  currentLineIndex: number;
  onNextLine: () => void;
  onPrevLine: () => void;
  onNextScene: () => void;
  onPrevScene: () => void;
  onOpenFullScript: () => void;
  onBackToAct: () => void;
  totalScenes: number;
  youtubeTracks: Track[];
  canGoBackHistory: boolean;
  canGoForwardHistory: boolean;
  onBackHistory: () => void;
  onForwardHistory: () => void;
}

export function SceneReaderModal({
  isOpen,
  onClose,
  currentScene,
  currentAct,
  currentSceneIndex,
  scriptCards,
  currentLineIndex,
  onNextLine,
  onPrevLine,
  onNextScene,
  onPrevScene,
  onOpenFullScript,
  onBackToAct,
  totalScenes,
  youtubeTracks,
  canGoBackHistory,
  canGoForwardHistory,
  onBackHistory,
  onForwardHistory,
}: SceneReaderModalProps) {
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});

  if (!currentScene) return null;

  const trackInfo = youtubeTracks.find(t => 
    t.act === `Act ${currentAct}` && 
    (t.scene === currentScene.id || t.scene === currentScene.title || (currentScene.id === '02-Finale' && t.scene === 'Finale'))
  );

  const versionKeys = trackInfo ? Object.keys(trackInfo.versions) : [];
  
  // Get latest version as default if not already selected
  const activeVer = trackInfo 
    ? (selectedVersions[currentScene.id] || getLatestVersion(trackInfo.versions)) 
    : '';
  const currentVideoId = trackInfo ? trackInfo.versions[activeVer] : '';

  const openLyrics = () => {
    if (currentVideoId) {
      window.open(`https://www.youtube.com/watch?v=${currentVideoId}`, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SCENE READER">
      <div className="flex flex-col gap-6 text-bauhaus-black">
        <div className="flex justify-between items-center border-b-4 border-bauhaus-black pb-4">
          <div className="flex items-center gap-4">
            <span className={`text-3xl font-display font-black ${currentAct === 1 ? 'text-bauhaus-red' : 'text-bauhaus-blue'}`}>
              {currentScene.id}
            </span>
            <span className="uppercase font-black tracking-[0.3em] text-xs opacity-40">{currentScene.title}</span>
          </div>
          <div className="flex gap-4 items-center">
            {currentScene.hasMusic && (
              <div className="flex gap-2 items-center bg-bauhaus-yellow/20 p-1 border-2 border-bauhaus-black">
                <button 
                  onClick={openLyrics}
                  className="text-[10px] font-black uppercase tracking-widest px-4 py-1 bg-bauhaus-yellow hover:bg-bauhaus-black hover:text-bauhaus-white transition-all"
                >
                  Lyrics
                </button>
                {versionKeys.length > 1 && (
                  <div className="flex gap-1 border-l-2 border-bauhaus-black pl-2">
                    {versionKeys.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVersions(prev => ({ ...prev, [currentScene.id]: v }))}
                        className={`px-2 py-0.5 text-[8px] font-black border-2 border-bauhaus-black uppercase transition-all ${
                          activeVer === v ? 'bg-bauhaus-black text-bauhaus-white' : 'bg-bauhaus-white text-bauhaus-black hover:bg-bauhaus-yellow'
                        }`}
                      >
                        v{v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button 
              onClick={onOpenFullScript}
              className="text-[10px] font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all"
            >
              Full Script
            </button>
            <button 
              onClick={onBackToAct}
              className="text-[10px] font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all"
            >
              Back to Act
            </button>
          </div>
        </div>

        <div 
          className="h-[50vh] flex flex-col justify-center items-center p-8 bg-bauhaus-white cursor-pointer select-none relative border-4 border-bauhaus-black"
          onClick={onNextLine}
        >
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-3xl"
          >
            {scriptCards[currentLineIndex] ? (
              <div className="space-y-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className={`text-sm md:text-base font-display font-black uppercase tracking-[0.3em] px-3 py-1 border-2 border-bauhaus-black ${
                    scriptCards[currentLineIndex].type === 'stage-direction' ? 'bg-bauhaus-yellow' : 'bg-bauhaus-red text-bauhaus-white'
                  }`}>
                    {scriptCards[currentLineIndex].type === 'stage-direction' ? 'STAGE DIRECTION' : scriptCards[currentLineIndex].speaker}
                  </span>
                </div>
                <div className="space-y-4 max-h-[35vh] overflow-y-auto custom-scrollbar px-4">
                  {scriptCards[currentLineIndex].lines.map((line, i) => (
                    <p 
                      key={i} 
                      className={`
                        ${scriptCards[currentLineIndex].type === 'stage-direction' ? 'text-lg md:text-xl italic opacity-60 font-sans' : 'text-xl md:text-3xl font-display font-black uppercase leading-tight'}
                      `}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <p className="text-3xl font-display font-black uppercase">End of Scene</p>
                <BauhausButton onClick={onNextScene} variant="red">Next Scene</BauhausButton>
              </div>
            )}
          </motion.div>

          <div className="absolute bottom-6 left-6 flex gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onBackHistory(); }}
              className="text-[10px] items-center flex gap-1 font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-20"
              disabled={!canGoBackHistory}
              title="Back to Previous Scene in History"
            >
              <RotateCcw size={12} /> Back
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onForwardHistory(); }}
              className="text-[10px] items-center flex gap-1 font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-20"
              disabled={!canGoForwardHistory}
              title="Forward to Next Scene in History"
            >
              Forward <RotateCw size={12} />
            </button>
            <div className="w-px h-6 bg-bauhaus-black opacity-20 mx-2" />
            <button 
              onClick={(e) => { e.stopPropagation(); onPrevScene(); }}
              className="text-[10px] font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-20"
              disabled={currentSceneIndex === 0}
            >
              Prev Scene
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onNextScene(); }}
              className="text-[10px] font-black uppercase tracking-widest border-2 border-bauhaus-black px-4 py-1 hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-20"
              disabled={currentSceneIndex === totalScenes - 1}
            >
              Next Scene
            </button>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
              CARD {currentLineIndex + 1} / {scriptCards.length}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); onPrevLine(); }}
                className="w-12 h-12 border-4 border-bauhaus-black flex items-center justify-center hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-10"
                disabled={currentLineIndex === 0}
              >
                <ChevronRight className="rotate-180" size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onNextLine(); }}
                className="w-12 h-12 border-4 border-bauhaus-black flex items-center justify-center hover:bg-bauhaus-black hover:text-bauhaus-white transition-all disabled:opacity-10"
                disabled={currentLineIndex === scriptCards.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
