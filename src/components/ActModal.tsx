import { useState, useEffect } from 'react';
import { Music, ChevronRight, Search, X } from 'lucide-react';
import { Modal, BauhausButton } from './BauhausUI';
import { Scene, Track } from '../types';
import { getLatestVersion } from '../lib/utils';

interface ActModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  scenes: Scene[];
  actNumber: 1 | 2;
  onReadScript: (scene: Scene, act: 1 | 2, index: number) => void;
  youtubeTracks: Track[];
}

export function ActModal({ 
  isOpen, 
  onClose, 
  title, 
  scenes, 
  actNumber, 
  onReadScript,
  youtubeTracks
}: ActModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenes = scenes.filter(scene => {
    const query = searchQuery.toLowerCase();
    const inTitle = scene.title.toLowerCase().includes(query);
    const inSummary = scene.summary?.toLowerCase().includes(query);
    const inSceneId = scene.id.toLowerCase().includes(query);
    const inScript = scene.script?.some(line => line.text.toLowerCase().includes(query));
    return inTitle || inSummary || inSceneId || inScript;
  });

  const currentScene = filteredScenes[selectedIndex] || filteredScenes[0] || scenes[0];
  
  // Find index in original scenes array
  const originalIndex = scenes.findIndex(s => s.id === currentScene.id);
  const trackInfo = youtubeTracks.find(t => 
    t.act === `Act ${actNumber}` && 
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
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col md:flex-row h-[70vh] -m-8 overflow-hidden">
        {/* Scene List Sidebar */}
        <div className="w-full md:w-1/4 border-r-4 border-bauhaus-black bg-bauhaus-white flex flex-col overflow-hidden">
          <div className="p-4 border-b-2 border-bauhaus-black bg-bauhaus-white/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scenes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full h-10 pl-10 pr-4 bg-bauhaus-white border-2 border-bauhaus-black focus:outline-none font-display font-bold text-xs uppercase tracking-widest"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedIndex(0); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-bauhaus-red transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
            {filteredScenes.length > 0 ? (
              filteredScenes.map((scene, i) => (
                <button
                  key={scene.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between group ${
                    selectedIndex === i 
                      ? 'bg-bauhaus-black text-bauhaus-white border-bauhaus-black translate-x-1' 
                      : 'bg-bauhaus-white text-bauhaus-black border-bauhaus-black/10 hover:border-bauhaus-black'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[8px] font-display font-black opacity-40 uppercase tracking-widest">{scene.id}</span>
                    <span className="font-display font-bold uppercase tracking-tight leading-tight text-sm">{scene.title}</span>
                  </div>
                  {scene.hasMusic && (
                    <div className={`w-6 h-6 flex items-center justify-center ${selectedIndex === i ? (actNumber === 1 ? 'bg-bauhaus-red' : 'bg-bauhaus-blue') + ' text-bauhaus-white' : 'bg-bauhaus-black text-bauhaus-white'}`}>
                      <Music size={12} />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="p-8 text-center opacity-30">
                <p className="font-display font-black uppercase tracking-widest text-[10px]">No scenes found</p>
              </div>
            )}
          </div>
        </div>

        {/* Scene Content Area */}
        <div className="w-full md:w-3/4 p-8 md:p-12 overflow-y-auto bg-bauhaus-white/50 text-bauhaus-black">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <span className={`${actNumber === 1 ? 'text-bauhaus-red' : 'text-bauhaus-blue'} font-display font-black text-4xl block mb-2`}>
                  {currentScene.id}
                </span>
                <h3 className="text-4xl font-display font-black uppercase leading-none">{currentScene.title}</h3>
              </div>
              <div className="flex gap-4">
                <BauhausButton 
                  onClick={() => onReadScript(currentScene, actNumber, originalIndex)}
                  variant="black"
                  className="!text-sm py-2"
                >
                  Read Script
                </BauhausButton>
              </div>
            </div>

            <div className="space-y-6">
              {currentScene.hasMusic && (
                <div className="space-y-2">
                  <BauhausButton 
                    onClick={openLyrics}
                    className="w-full p-6 border-4 border-bauhaus-black bg-bauhaus-yellow flex items-center justify-between hover:bg-bauhaus-blue hover:text-bauhaus-white transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-bauhaus-black text-bauhaus-white flex items-center justify-center group-hover:bg-bauhaus-white group-hover:text-bauhaus-black transition-colors">
                        <Music size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-[10px] font-display font-black uppercase tracking-widest opacity-40">Musical Number</h4>
                        <p className="text-xl font-display font-black uppercase">{currentScene.title}</p>
                      </div>
                    </div>
                    <ChevronRight size={24} />
                  </BauhausButton>
                  
                  {versionKeys.length > 1 && (
                    <div className="flex gap-2 justify-end">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40 self-center mr-2">Versions:</span>
                      {versionKeys.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVersions(prev => ({ ...prev, [currentScene.id]: v }))}
                          className={`px-3 py-1 text-[10px] font-black border-2 border-bauhaus-black uppercase transition-all ${
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

              <div className="p-6 border-4 border-bauhaus-black bg-bauhaus-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="text-xs font-display font-black uppercase tracking-widest mb-4 opacity-40">Scene Summary</h4>
                <p className="text-lg font-sans leading-relaxed">{currentScene.summary}</p>
              </div>

              {currentScene.characters && (
                <div className="p-6 border-4 border-bauhaus-black bg-bauhaus-blue text-bauhaus-white">
                  <h4 className="text-xs font-display font-black uppercase tracking-widest mb-4 opacity-40">Characters</h4>
                  <p className="text-lg font-sans leading-relaxed">{currentScene.characters}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
