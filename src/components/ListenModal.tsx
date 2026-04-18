import { useState } from 'react';
import { Music, Play } from 'lucide-react';
import { Modal } from './BauhausUI';
import { Track, SunoTrack, TikTokTrack, InstagramTrack } from '../types';
import { getLatestVersion } from '../lib/utils';

interface ListenModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeTracks: Track[];
  sunoTracks: SunoTrack[];
  tiktokTracks: TikTokTrack[];
  instagramTracks: InstagramTrack[];
}

export function ListenModal({ 
  isOpen, 
  onClose, 
  youtubeTracks, 
  sunoTracks, 
  tiktokTracks, 
  instagramTracks 
}: ListenModalProps) {
  const [listenTab, setListenTab] = useState<'playlist' | 'platforms'>('playlist');
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});
  
  const [selectedYoutubeLink, setSelectedYoutubeLink] = useState('https://www.youtube.com/playlist?list=PL_playlist_id'); // Placeholder or actual playlist
  const [selectedSunoLink, setSelectedSunoLink] = useState('https://suno.com/playlist/e9c8de65-b6aa-438f-a268-8cb46fbba324');
  const [selectedTiktokLink, setSelectedTiktokLink] = useState('https://www.tiktok.com/@b_floore');
  const [selectedInstagramLink, setSelectedInstagramLink] = useState('https://instagram.com/barrylikethefruit');

  const currentTrack = youtubeTracks[selectedTrackIndex];
  const versionKeys = currentTrack ? Object.keys(currentTrack.versions) : [];
  
  // Get latest version as default if not already selected
  const activeVer = currentTrack 
    ? (selectedVersions[currentTrack.id] || getLatestVersion(currentTrack.versions)) 
    : '';
  const currentVideoId = currentTrack ? currentTrack.versions[activeVer] : '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="LISTEN NOW">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 border-b-4 border-bauhaus-black pb-4">
          {(['playlist', 'platforms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setListenTab(tab)}
              className={`px-8 py-3 font-display font-black uppercase tracking-widest text-sm border-4 border-bauhaus-black transition-all ${
                listenTab === tab ? 'bg-bauhaus-black text-bauhaus-white' : 'bg-bauhaus-white text-bauhaus-black hover:bg-bauhaus-yellow'
              }`}
            >
              {tab === 'playlist' ? 'YouTube Playlist' : 'Other Platforms'}
            </button>
          ))}
        </div>

        {listenTab === 'playlist' && (
          <div className="flex flex-col md:flex-row h-[60vh] -m-8 overflow-hidden border-t-4 border-bauhaus-black">
            {/* Sidebar Scroller */}
            <div className="w-full md:w-1/3 border-r-4 border-bauhaus-black bg-bauhaus-white overflow-y-auto custom-scrollbar">
              <div className="p-4 space-y-2">
                {youtubeTracks.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackIndex(i)}
                    className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between group ${
                      selectedTrackIndex === i 
                        ? 'bg-bauhaus-black text-bauhaus-white border-bauhaus-black translate-x-1' 
                        : 'bg-bauhaus-white text-bauhaus-black border-bauhaus-black/10 hover:border-bauhaus-black'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[8px] font-display font-black opacity-40 uppercase tracking-widest">{track.act} · {track.scene}</span>
                      <span className="font-display font-bold uppercase tracking-tight leading-tight text-sm">{track.title}</span>
                    </div>
                    <div className={`w-6 h-6 flex items-center justify-center ${selectedTrackIndex === i ? 'bg-bauhaus-red text-bauhaus-white' : 'bg-bauhaus-black text-bauhaus-white'}`}>
                      <Play size={12} fill="currentColor" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Video Area */}
            <div className="w-full md:w-2/3 p-8 bg-bauhaus-white/50 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-black text-xs uppercase tracking-widest text-bauhaus-red">{currentTrack.act} · {currentTrack.scene}</span>
                  <h3 className="font-display font-black text-2xl uppercase">{currentTrack.title}</h3>
                </div>
                {versionKeys.length > 1 && (
                  <div className="flex gap-1">
                    {versionKeys.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVersions(prev => ({ ...prev, [currentTrack.id]: v }))}
                        className={`px-3 py-1 text-xs font-bold border-2 border-bauhaus-black uppercase transition-all ${
                          activeVer === v ? 'bg-bauhaus-black text-bauhaus-white' : 'bg-bauhaus-white text-bauhaus-black hover:bg-bauhaus-yellow'
                        }`}
                      >
                        v{v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="aspect-video w-full border-4 border-bauhaus-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideoId}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentTrack.title}
                />
              </div>
            </div>
          </div>
        )}

        {listenTab === 'platforms' && (
          <div className="flex flex-col gap-8">
            <div className="border-4 border-bauhaus-black p-4">
              <h3 className="font-display font-black text-xl uppercase mb-3">YouTube</h3>
              <div className="flex gap-2">
                <select
                  value={selectedYoutubeLink}
                  onChange={(e) => setSelectedYoutubeLink(e.target.value)}
                  className="flex-1 border-4 border-bauhaus-black px-3 py-2 font-display font-bold text-sm uppercase bg-bauhaus-white"
                >
                  <option value="https://youtube.com/@bfloore_online">▶ YouTube Channel (@bfloore_online)</option>
                  {youtubeTracks.flatMap(t =>
                    Object.entries(t.versions).map(([v, id]) => (
                      <option key={t.id + v} value={`https://www.youtube.com/watch?v=${id}`}>
                        {t.act} · {t.scene} · {t.title}{Object.keys(t.versions).length > 1 ? ' (v' + v + ')' : ''}
                      </option>
                    ))
                  )}
                </select>
                <a
                  href={selectedYoutubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 font-display font-black uppercase border-4 border-bauhaus-black bg-bauhaus-red text-bauhaus-white hover:bg-bauhaus-black transition-all"
                >
                  Go
                </a>
              </div>
            </div>

            <div className="border-4 border-bauhaus-black p-4">
              <h3 className="font-display font-black text-xl uppercase mb-3">Suno</h3>
              <div className="flex gap-2">
                <select
                  value={selectedSunoLink}
                  onChange={(e) => setSelectedSunoLink(e.target.value)}
                  className="flex-1 border-4 border-bauhaus-black px-3 py-2 font-display font-bold text-sm uppercase bg-bauhaus-white"
                >
                  <option value="https://suno.com/playlist/e9c8de65-b6aa-438f-a268-8cb46fbba324">▶ Full Suno Playlist</option>
                  {sunoTracks.map((t, i) => (
                    <option key={i} value={`https://suno.com/s/${t.id}`}>
                      {t.act} · {t.scene} · {t.title} ({t.version})
                    </option>
                  ))}
                </select>
                <a
                  href={selectedSunoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 font-display font-black uppercase border-4 border-bauhaus-black bg-bauhaus-red text-bauhaus-white hover:bg-bauhaus-black transition-all"
                >
                  Go
                </a>
              </div>
            </div>

            <div className="border-4 border-bauhaus-black p-4">
              <h3 className="font-display font-black text-xl uppercase mb-3">TikTok</h3>
              <div className="flex gap-2">
                <select
                  value={selectedTiktokLink}
                  onChange={(e) => setSelectedTiktokLink(e.target.value)}
                  className="flex-1 border-4 border-bauhaus-black px-3 py-2 font-display font-bold text-sm uppercase bg-bauhaus-white"
                >
                  <option value="https://tiktok.com/@b_floore">▶ TikTok Profile (@b_floore)</option>
                  {tiktokTracks.map((t, i) => (
                    <option key={i} value={`https://www.tiktok.com/@b_floore/video/${t.id}`}>
                      {t.act} · {t.scene} · {t.title} ({t.version})
                    </option>
                  ))}
                </select>
                <a
                  href={selectedTiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 font-display font-black uppercase border-4 border-bauhaus-black bg-bauhaus-red text-bauhaus-white hover:bg-bauhaus-black transition-all"
                >
                  Go
                </a>
              </div>
            </div>

            <div className="border-4 border-bauhaus-black p-4">
              <h3 className="font-display font-black text-xl uppercase mb-3">Instagram</h3>
              <div className="flex gap-2">
                <select
                  value={selectedInstagramLink}
                  onChange={(e) => setSelectedInstagramLink(e.target.value)}
                  className="flex-1 border-4 border-bauhaus-black px-3 py-2 font-display font-bold text-sm uppercase bg-bauhaus-white"
                >
                  <option value="https://instagram.com/barrylikethefruit">▶ Instagram Profile (@barrylikethefruit)</option>
                  {instagramTracks.map((t, i) => (
                    <option key={i} value={`https://www.instagram.com/p/${t.id}/`}>
                      {t.act} · {t.scene} · {t.title} ({t.version})
                    </option>
                  ))}
                </select>
                <a
                  href={selectedInstagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 font-display font-black uppercase border-4 border-bauhaus-black bg-bauhaus-red text-bauhaus-white hover:bg-bauhaus-black transition-all"
                >
                  Go
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
