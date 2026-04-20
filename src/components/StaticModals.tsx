import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown, ChevronUp, FileText, RotateCcw } from 'lucide-react';
import { Modal, BauhausButton } from './BauhausUI';
import { blogPosts } from '../data/blog';

const PHOTO_FILENAMES = [
  "images/photo1.jpg", 
  "images/photo2.jpg", 
  "images/photo3.jpg", 
  "images/photo4.jpg", 
  "images/photo5.jpg", 
  "images/photo6.jpg", 
  "images/photo7.jpg", 
  "images/photo8.jpg"
];

interface StaticModalsProps {
  activeModal: string | null;
  onClose: () => void;
  onOpenModal: (id: string) => void;
}

export function StaticModals({ activeModal, onClose, onOpenModal }: StaticModalsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [displayedPhotos, setDisplayedPhotos] = useState<string[]>([]);

  const shufflePhotos = () => {
    const shuffled = [...PHOTO_FILENAMES].sort(() => 0.5 - Math.random());
    setDisplayedPhotos(shuffled.slice(0, 4));
  };

  useEffect(() => {
    if (activeModal === 'bts') {
      shufflePhotos();
    }
  }, [activeModal]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Modal isOpen={activeModal === 'characters'} onClose={onClose} title="CHARACTER BIOGRAPHIES">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-bauhaus-black max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <CharacterCard 
            name="Geoffrey Aaron 'Geoff' Goldstein" 
            tagline="Charismatic, Continental billionaire con artist." 
            color="yellow"
            description="A charismatic, Continental billionaire con artist with charm and wit that mask his predatory nature. Despite conviction and house arrest, he maintains his flirtatious elegance and ability to manipulate those around him. He layers 'truth with bullshit' effortlessly and sees potential in people he can use."
          />
          <CharacterCard 
            name="Isabella Maximillian 'Maxie' Laurent" 
            tagline="Geoff's sharp, calculating partner." 
            color="blue"
            description="Geoff's sharp, calculating partner who understands the machinery of power and manipulation. She is patient, methodical, and willing to do whatever it takes to protect their empire. Her relationship with Geoff is both professional and romantic, built on mutual complicity."
          />
          <CharacterCard 
            name="Gus" 
            tagline="A homeless man who becomes Geoff's assistant." 
            color="red"
            description="A homeless man who becomes Geoff's personal assistant. Despite his circumstances, he retains dignity, brutal honesty, dark humor, and most importantly, a moral compass that Geoff and Maxie have long abandoned. He represents the vulnerable who are exploited by systems of power."
          />
          <CharacterCard 
            name="President Ronnie" 
            tagline="Ronald Allen Kennedy Jr." 
            color="red"
            description="A buffoonish yet dangerous leader who operates through 'calculated pressure, strategic favors, and carefully maintained plausible deniability.' Equal parts incompetent and complicit, he embodies institutional corruption while maintaining the veneer of respectability."
          />
          <CharacterCard 
            name="Solicitor General Tammy" 
            tagline="Tammy Osiris Caldwell" 
            color="yellow"
            description="A brilliant, exacting U.S. Attorney who learned law while her mother cleaned the courthouse. She is precise, restrained, and refuses to be bullied or manipulated. She represents institutional integrity standing against corruption."
          />
          <CharacterCard 
            name="Ginnie" 
            tagline="A survivor and advocate for justice." 
            color="blue"
            description="A survivor of Goldstein's operation and a fierce advocate for justice. She has endured a decade of public disbelief and is described as 'a goddamn hero' for her perseverance. She leads the fight for accountability despite systemic obstacles."
          />
          <CharacterCard 
            name="Marcus" 
            tagline="PR and publicity minded foil." 
            color="red"
            description="Marcus appears in Act 2 as the more PR or publicity minded foil to Ginnie’s deep felt advocacy. Notably, he puts the idea that additional related crimes involving predators may be ‘good for’ the cause which Ginnie doesn’t agree with."
          />
          <CharacterCard 
            name="Lesley" 
            tagline="Legal side of the fight for justice." 
            color="blue"
            description="Lesley appears in Act 2 only in Ginnie’s office and is the legal side of the fight for justice. Lesley informs Gus he will be arrested for conspiracy when he goes to turn in his phone."
          />
          <CharacterCard 
            name="Officer Jeffrey Watson" 
            tagline="Geoff's assigned police escort." 
            color="yellow"
            description="Geoff's assigned police escort during house arrest. Observant, principled, and duty-bound, he sees through Geoff's lies but maintains professional boundaries. He represents those who serve justice within a flawed system."
          />
          <CharacterCard 
            name="Buck Jr." 
            tagline="Geoff's young defense lawyer." 
            color="red"
            description="Geoff's young, informal defense lawyer who operates with casual boundary-testing and strategic recruitment. He represents the legal professionals who enable corruption through plausible deniability."
          />
          <CharacterCard 
            name="Ash and Cammie" 
            tagline="President Ronnie's shadowy advisors." 
            color="blue"
            description="President Ronnie's shadowy advisors who speak in eerie unison and finish each other's sentences. They masterfully employ bureaucratic double-speak and weaponize language to bury truth in plain sight."
          />
          <CharacterCard 
            name="Jean-Baptiste de la Cruz (JB)" 
            tagline="Head of Lil'Elmo." 
            color="yellow"
            description="The long-standing head of all things on Lil'Elmo. JB comes from Big Elmo and runs all the hiring and onboarding of staff. He knows where everything is, how everything works, and where all the bodies are buried."
          />
          <CharacterCard 
            name="Stacy" 
            tagline="A witness." 
            color="red"
            description="A witness who observed Gus's professionalism during Goldstein's incarceration. She represents those who notice character in small moments."
          />
          <CharacterCard 
            name="Lila" 
            tagline="Tammy's young paralegal." 
            color="blue"
            description="Tammy's young, nervous paralegal who is systematically manipulated into betrayal. She represents the naive who are exploited by those in power."
          />
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'bts'} onClose={onClose} title="BEHIND THE SCENES">
        <div className="space-y-12 text-bauhaus-black max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
          {/* Statistics Table */}
          <section className="mt-4">
            <div className="border-4 border-bauhaus-black overflow-hidden bg-bauhaus-white shadow-[8px_8px_0px_0px_rgba(230,57,70,1)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bauhaus-black text-bauhaus-white font-display font-black text-sm uppercase">
                    <th className="p-4 border-r-2 border-bauhaus-white/20 text-left">Metric</th>
                    <th className="p-4 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="font-display font-black uppercase text-sm md:text-base lg:text-xl">
                  {[
                    { label: 'Words', value: '298,896' },
                    { label: 'Sentences', value: '35,021' },
                    { label: 'Dialogue Turns', value: '759', note: 'Not including Firebase and Claude Chrome extension' },
                    { label: 'Exchanges (incl. missing)', value: 'EST. OVER 10,000' },
                    { label: 'Total Planned Songs', value: '24 — V1.0 COMPLETED' },
                    { label: 'Active Processing Time', value: '1,495 MIN' },
                    { label: 'Highest Retention Rate (YT)', value: '60%' },
                    { label: 'Flesch-Kincaid', value: '5.9', note: 'equivalent to Chicago' },
                    { label: 'Highest Musical Regenerations', value: 'OVER 180', note: '"What Did You Do"' },
                  ].map((stat, idx) => (
                    <tr key={idx} className="border-b-2 border-bauhaus-black hover:bg-bauhaus-yellow/10 transition-colors">
                      <td className="p-4 border-r-2 border-bauhaus-black text-bauhaus-blue">
                        {stat.label}
                        {stat.note && (
                          <span className="block text-[8px] md:text-[10px] font-sans font-bold text-bauhaus-black opacity-50 lowercase tracking-normal">
                            ({stat.note})
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right text-bauhaus-red">{stat.value}</td>
                    </tr>
                  ))}
                  <tr className="bg-bauhaus-yellow">
                    <td colSpan={2} className="p-3 md:p-4 text-[8px] md:text-[10px] font-sans font-bold text-left leading-tight uppercase">
                      ALL NUMBERS ARE APPROXIMATE AND DO NOT INCLUDE TIME OR TURNS WORKING IN FIREBASE/AI STUDIO CONSTRUCTING THE WEBSITE, NORE DOES IT INCLUDE TIME SPENT ACTUALLY WORKING ON NOTEBOOKLM, NOTION AI, OR SUNOAI. ONLY CONVERSATIONAL TURNS ARE AGGREGATED. DATA IS UPDATED AS OF 19 APRIL 2026.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Blog Section */}
          <section className="space-y-8 mt-12 pt-8 border-t-4 border-bauhaus-black/10">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl font-display font-black uppercase bg-bauhaus-blue text-bauhaus-white inline-block px-4 py-1">LATEST BLOG</h3>
              <div className="h-1 flex-grow bg-bauhaus-blue" />
            </div>

            {/* Most Recent Blog Post */}
            {blogPosts.length > 0 && (
              <div className="border-4 border-bauhaus-black p-8 bg-bauhaus-white relative">
                <div className="absolute -top-4 -right-4 bg-bauhaus-red text-bauhaus-white px-4 py-2 font-display font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {blogPosts[0].date}
                </div>
                <h2 className="text-2xl md:text-5xl font-display font-black uppercase mb-8 leading-tight text-bauhaus-black pr-24 underline decoration-bauhaus-red decoration-8 underline-offset-8">
                  {blogPosts[0].title}
                </h2>
                <div className="prose prose-bauhaus max-w-none font-sans text-xl leading-relaxed whitespace-pre-wrap border-l-8 border-bauhaus-blue pl-8">
                  {blogPosts[0].content.split('###').map((part, i) => {
                    if (i === 0) return part;
                    const lines = part.split('\n');
                    const header = lines[0];
                    const rest = lines.slice(1).join('\n');
                    return (
                      <React.Fragment key={i}>
                        <span className="bg-bauhaus-yellow px-2 font-display font-black text-2xl uppercase inline-block my-4">
                          {header}
                        </span>
                        {rest}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Combined Filler Archive */}
            <div className="mt-16">
              <AccordionSection
                title="FILLER MATERIAL PRE-BLOG"
                isOpen={expandedSections['blog-filler']}
                onToggle={() => {
                  setExpandedSections(prev => ({
                    ...prev,
                    'blog-filler': !prev['blog-filler']
                  }));
                }}
              >
                <div className="space-y-12">
                  {blogPosts.slice(1).map((post) => (
                    <div key={post.id} className="border-b-2 border-bauhaus-black/10 pb-8 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-display font-black uppercase text-bauhaus-blue">{post.title}</h5>
                        <span className="text-xs uppercase font-bold opacity-50">{post.date}</span>
                      </div>
                      <div className="font-sans text-sm leading-relaxed whitespace-pre-wrap opacity-70">
                        {post.content}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            </div>
          </section>

          {/* BTS Meta Info */}
          <section className="space-y-12 mt-16 pt-12 border-t-8 border-bauhaus-black pb-8">
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b-4 border-bauhaus-black pb-4">
                <h3 className="text-3xl font-display font-black uppercase bg-bauhaus-yellow inline-block px-4">Concept Gallery</h3>
                <span className="font-display font-black text-bauhaus-red animate-pulse uppercase tracking-widest text-lg">COMING SOON</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  'blue-office', 'bauhaus-island', 'police-bauhaus', 
                  'man-chair-blue', 'man-desk-vibrant', 'man-box',
                  'judge-harlequin', 'green-suit-man', 'purple-dress-woman', 'marching-band'
                ].map((seed, i) => (
                  <div key={i} className="aspect-[2/3] bg-bauhaus-black border-4 border-bauhaus-black relative overflow-hidden group">
                    <img 
                      src={`https://picsum.photos/seed/${seed}/600/900`} 
                      alt={`Concept ${i}`} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105 filter grayscale hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-bauhaus-red/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Strip */}
            <div className="space-y-6 pt-12 border-t-4 border-bauhaus-black/10">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-black text-lg uppercase tracking-tighter text-bauhaus-black">
                  CONCEPT IMAGES — <span className="text-bauhaus-red italic">COMING SOON</span>
                </h4>
                <button 
                  onClick={shufflePhotos}
                  className="flex items-center gap-2 bg-bauhaus-black text-bauhaus-white px-3 py-1.5 font-display font-black text-[10px] uppercase tracking-widest hover:bg-bauhaus-red transition-colors"
                >
                  <RotateCcw size={12} />
                  Shuffle
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {displayedPhotos.map((photo, idx) => (
                  <div key={idx} className="aspect-square border-2 border-bauhaus-black overflow-hidden bg-bauhaus-white">
                    <img 
                      src={`/${photo}`} 
                      alt={`BTS Concept ${idx + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'notes'} onClose={onClose} title="PRODUCTION NOTES">
        <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar text-bauhaus-black pb-8">
          <div className="bg-bauhaus-red text-bauhaus-white p-4 font-display uppercase tracking-widest text-sm mb-6">
            On Parody, Intent, and Responsibility
          </div>
          <div className="space-y-4 font-sans text-base leading-relaxed">
            <p>This musical is a parody. It is a parody of the spectacle, the political theater, the media circus, the justice system failures, and the cultural obsession that have defined how powerful people evade accountability.</p>
            <p>The musical is not about the victims. It does not speak for them, to them, or on their behalf. We make no claim to represent their experiences, their pain, or their truth. A single victim is portrayed prominently because to extract that aspect of the atrocity would be disingenuous and castrate the purpose of parody. However, the views in this show do not represent the point of view of the individuals who experienced similar traumas at the hands of real monsters.</p>
            <p>The musical is also not an excuse for alleged perpetrators. It is not a platform for rehabilitation or sympathy toward the powerful. Our purpose is not to seek understanding or acceptance of their crimes, nor justify their behavior until it becomes socially acceptable. GEOFF & MAXIE was created explicitly to combat the normalization of Lil'Elmo and similar places in the real world.</p>
            <p>The purpose is to satirize the monsters in all of us that allowed such things to take root, to grow and thrive, and to be covered up once exposed. No monsters lived on Lil'Elmo, they only visited and came home. Whither then their monstrosity?</p>
            <p>GEOFF & MAXIE is a mirror held up to everyone who watched, everyone who politicked, everyone who hedged, everyone who knew, and everyone who looked away. It is about what we as a society have tolerated, celebrated, and protected when money and influence are involved.</p>
          </div>

          <div className="mt-12 pt-8 border-t-4 border-bauhaus-black">
            <h3 className="text-xl font-display font-black uppercase mb-6 bg-bauhaus-yellow inline-block px-2">AI & Production Toolchain (Functional Credits)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CreditItem role="Claude.ai (Anthropic)" description="Structural editing, dialogue refinement, long-form continuity" />
              <CreditItem role="ChatGPT (OpenAI)" description="Lyrical construction, brainstorming, redrafting, pre-production development" />
              <CreditItem role="Gemini (Google)" description="Quality auditing, ideation, and secondary editorial review" />
              <CreditItem role="Grok (xAI)" description="Cold-read beta feedback and adversarial review" />
              <CreditItem role="NotebookLM (Google)" description="Infographic construction, blogging assistance, and promotional content development" />
              <CreditItem role="Suno AI" description="Musical generation, instrumentation, and vocal prototyping" />
              <CreditItem role="ElevenLabs" description="Voiceover and dialogue vocal generation (non-musical)" />
              <CreditItem role="Veed.io" description="Video construction, subtitle generation, and stock media integration" />
              <CreditItem role="Canva" description="Graphic design, video assembly, and visual assets (non-AI use)" />
              <CreditItem role="Notion AI" description="Workflow management, summarization, and meta-text structuring" />
              <CreditItem role="Pexels / Pixabay" description="Stock video and image sourcing" />
              <CreditItem role="AI Studio / Firebase" description="Website architecture, development, and deployment" />
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <AccordionSection 
              title="AI–Human Workshop & Production Framework" 
              isOpen={expandedSections['workshop']} 
              onToggle={() => toggleSection('workshop')}
            >
              <div className="space-y-4 text-sm leading-relaxed">
                <p>This musical was developed through a structured AI–human workshop process that mirrors a traditional rehearsal and development cycle, translated into a digital production environment.</p>
                <p>All story, characters, lyrics, and dialogue originate with <strong>B. Floore</strong>. AI tools were used as editorial, developmental, and production collaborators—supporting iteration, refinement, and execution across the full lifecycle of the work.</p>
                <p>The process functions as a continuous workshop loop:</p>
                <ul className="list-none space-y-4 pl-4">
                  <li><strong className="text-bauhaus-red">Concept Development:</strong> Rapid ideation, thematic expansion, and structural mapping.</li>
                  <li><strong className="text-bauhaus-red">Lyrical & Dialogue:</strong> Drafts are iterated for meter, phrasing, and character voice. AI assists in identifying weak structures.</li>
                  <li><strong className="text-bauhaus-red">Continuity Support:</strong> Long-form coherence, character tracking, and narrative logic are actively audited.</li>
                  <li><strong className="text-bauhaus-red">Block Resolution:</strong> Stalled sections are advanced through alternative phrasing or structural pivots.</li>
                  <li><strong className="text-bauhaus-red">Storyboarding:</strong> Scenes are aligned with theatrical pacing and musical escalation.</li>
                  <li><strong className="text-bauhaus-red">Technical Editing:</strong> Language is tightened, redundancies removed, and scripts formatted.</li>
                  <li><strong className="text-bauhaus-red">Media Prototyping:</strong> Songs, voice, and visual assets are refined to simulate staging prior to live production.</li>
                </ul>
                <p className="font-bold border-l-4 border-bauhaus-black pl-4 py-2 mt-4">This is not AI-generated work. It is human-authored material developed within a high-speed, tool-assisted production pipeline.</p>
              </div>
            </AccordionSection>

            <AccordionSection 
              title="Rights, Licensing & Use" 
              isOpen={expandedSections['rights']} 
              onToggle={() => toggleSection('rights')}
            >
              <div className="space-y-4 text-sm leading-relaxed">
                <p>All tools and platforms were used in accordance with their respective terms of service and licensing agreements.</p>
                <p>Where required, paid subscriptions or commercial-use licenses were maintained to ensure that all generated content, media, and outputs are authorized for use within a commercial theatrical context. This includes, but is not limited to, music generation, voice synthesis, design assets, and video production.</p>
                <p>Each platform operates under its own usage framework. All contributions from AI systems are incorporated under those individual agreements, with final authorship, editorial control, and creative direction remaining solely with <strong>B. Floore</strong>.</p>
              </div>
            </AccordionSection>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'about'} onClose={onClose} title="ABOUT THE MUSICAL">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar text-bauhaus-black">
          <div className="bg-bauhaus-blue text-bauhaus-white p-4 font-display uppercase tracking-widest text-sm mb-6">
            Geoff & Maxie: A New Musical Parody
          </div>
          <div className="space-y-4 font-sans text-base leading-relaxed">
            <p>What happens when a charismatic billionaire con artist walks free while justice watches from the sidelines? <strong> Geoff & Maxie</strong> plunges you into a glittering world of power, privilege, and the secrets that bind them together.</p>
            <p>Geoffrey Aaron "Geoff" Goldstein—charming, Continental, convicted—receives a sweetheart deal that keeps him under house arrest while his empire thrives. Alongside his brilliant partner Isabella Maximillian "Maxie" Laurent, he operates a private island playground for the wealthy and powerful, where favors are currency and silence is survival. When Geoff offers a second chance to Gus, a homeless man with nothing to lose, he inadvertently invites a conscience into a world that abandoned morality long ago.</p>
            <p>As the island's secrets begin to surface, a web of complicity emerges: a buffoonish President who operates through plausible deniability, a principled Solicitor General who refuses to be manipulated, survivors demanding justice, and institutional forces working overtime to contain the scandal. When federal charges finally land, Geoff mysteriously vanishes from custody while Maxie enjoys comfortable confinement—exposing a justice system with two very different sets of rules.</p>
            <div className="border-l-8 border-bauhaus-red pl-6 py-4 my-8 italic text-xl font-display">
              "The question isn't what happened. It's whether anyone with power will be held accountable."
            </div>
            <div className="pt-8 border-t-4 border-bauhaus-black/10">
              <BauhausButton 
                onClick={() => onOpenModal('bts')}
                variant="yellow"
                className="w-full py-6 !text-2xl"
              >
                Behind the Scenes
              </BauhausButton>
            </div>
            <p>Through darkly comic musical numbers, sharp dialogue, and a cast of characters ranging from predators to survivors, <strong> Geoff & Maxie</strong> explores how "standard procedure" protects the powerful while punishing the vulnerable, how documentation becomes weaponized, and whether redemption is possible for those who've chosen silence over truth.</p>
            <p>Will Gus's testimony matter when the news cycle moves on? Can Tammy build a case when evidence keeps disappearing? What happens when a canary yellow phone holds secrets the world isn't ready to hear?</p>
            <p className="font-display uppercase tracking-widest text-bauhaus-red font-bold pt-4">
              Some monsters live on islands. Others walk among us every day.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t-4 border-bauhaus-black">
            <h3 className="font-display uppercase tracking-[0.2em] text-lg mb-4 bg-bauhaus-yellow inline-block px-2">A Note on AI Collaboration</h3>
            <div className="space-y-4 text-sm opacity-80">
              <p>This musical proudly leverages AI technology to amplify a voice that demands to be heard. While the storyline, lyrics, and dialogue are entirely original creations by <strong>B. Floore</strong>, the editing, workshopping, and musical generation were developed in collaboration with AI partners including Claude.ai (Anthropic), ChatGPT (OpenAI), Gemini (Google), Notion AI, Suno AI, and Veed.io.</p>
              <p>The result is a complete theatrical package—a parody designed to entertain, provoke, and one day grace the stage. If you're interested in collaborating on staging and production, or if you're a musician who wants to help refine the score toward a full theatrical production, please use the contact form on the home page.</p>
            </div>
          </div>
          <div className="mt-8 text-xs italic opacity-60 border-l-2 border-bauhaus-black pl-4">
            Because some stories are too important to tell quietly. And our silence will be held against us for far longer than our words.
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'beta'} onClose={onClose} title="DEVELOPMENT STATUS">
        <div className="space-y-8 py-4 text-bauhaus-black max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="border-b-4 border-bauhaus-black pb-8">
            <h3 className="font-display font-black text-3xl mb-4 uppercase tracking-tighter">Development Status & Release Log - v1.0 Available</h3>
            <div className="space-y-4 font-sans text-base leading-relaxed">
              <p>This project is being developed through an iterative release model, combining theatrical writing with a staged digital rollout. Each version reflects a full-pass refinement of the material across script, score, and presentation.</p>
              <div className="bg-bauhaus-yellow/20 p-6 border-l-8 border-bauhaus-yellow">
                <p className="font-bold mb-2">The goal is twofold:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To deliver a complete, coherent proof-of-concept musical, and</li>
                  <li>To develop a production-ready property that can transition into live theatrical collaboration with composers, musicians, and producers.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b-4 border-bauhaus-black">
            <div className="p-4 border-2 border-bauhaus-black bg-bauhaus-red/5">
              <h4 className="font-display font-black uppercase text-bauhaus-red mb-2">v1.0 — Initial Assembly</h4>
              <p className="text-[10px] uppercase font-black tracking-widest bg-bauhaus-red text-bauhaus-white inline-block px-2 mb-4">Current Release</p>
              <ul className="text-xs space-y-2 list-none font-sans">
                <li className="flex gap-2"><span>•</span> Full script drafted and structured</li>
                <li className="flex gap-2"><span>•</span> Core song set written and released</li>
                <li className="flex gap-2"><span>•</span> Website launched</li>
                <li className="flex gap-2"><span>•</span> Narrative framework established</li>
              </ul>
              <p className="mt-4 text-[10px] italic opacity-60">Status: Complete and Published</p>
            </div>
            
            <div className="p-4 border-2 border-bauhaus-black bg-bauhaus-blue/5">
              <h4 className="font-display font-black uppercase text-bauhaus-blue mb-2">v2.0 — Distribution & Refinement</h4>
              <ul className="text-xs space-y-2 list-none font-sans">
                <li className="flex gap-2"><span>•</span> Songs re-released for platforms</li>
                <li className="flex gap-2"><span>•</span> Visual presentation expanded</li>
                <li className="flex gap-2"><span>•</span> Lyrical and tonal refinements</li>
                <li className="flex gap-2"><span>•</span> Audience feedback adjustments</li>
              </ul>
              <p className="mt-4 text-[10px] italic opacity-60">Status: Active Rollout</p>
            </div>

            <div className="p-4 border-2 border-bauhaus-black bg-bauhaus-yellow/5 opacity-50">
              <h4 className="font-display font-black uppercase text-bauhaus-black mb-2">v3.0 — Advanced Iteration</h4>
              <ul className="text-xs space-y-2 list-none font-sans">
                <li className="flex gap-2"><span>•</span> First v3.0 song iteration</li>
                <li className="flex gap-2"><span>•</span> Musical specificity & performability</li>
                <li className="flex gap-2"><span>•</span> Transition to orchestration</li>
              </ul>
              <p className="mt-4 text-[10px] italic opacity-60">Status: Early Development</p>
            </div>
          </div>

          <div className="space-y-8 pb-8 font-sans">
            <div>
              <h4 className="font-display font-black uppercase text-lg mb-2">Development Philosophy</h4>
              <p className="text-sm leading-relaxed opacity-80 mb-4">This musical is being built as a living workshop, where each version improves on the last through continuous iteration.</p>
              <p className="text-sm leading-relaxed opacity-80">The current materials—scripts, lyrics, and AI-assisted compositions—are not positioned as a final score. They are <strong className="text-bauhaus-red uppercase underline">high-resolution drafts</strong>: structured, intentional, and designed to communicate tone, pacing, and narrative function.</p>
            </div>

            <div>
              <h4 className="font-display font-black uppercase text-lg mb-2">Path to Production</h4>
              <p className="text-sm leading-relaxed opacity-80 mb-4">This project is intended to transition from a digitally developed work into a fully realized stage production. The next phase involves collaboration with:</p>
              <ul className="list-none space-y-2 text-sm pl-4 mb-4">
                <li><strong className="text-bauhaus-blue">Composers and arrangers</strong> to expand and orchestrate the score</li>
                <li><strong className="text-bauhaus-red">Musicians</strong> to reinterpret and perform the material</li>
                <li><strong className="text-bauhaus-yellow italic">Directors and producers</strong> to shape staging and execution</li>
              </ul>
            </div>

            <div className="bg-bauhaus-black text-bauhaus-white p-6">
              <h4 className="font-display font-black uppercase text-lg mb-2 italic">Intent</h4>
              <p className="text-sm leading-relaxed opacity-80 italic">This is not a collection of disconnected songs or experiments. It is a single, unified show, developed quickly and deliberately to capture a specific cultural moment while the satire remains immediate and relevant.</p>
            </div>
          </div>

          <div className="pt-8 space-y-4 border-t-4 border-bauhaus-black">
            <AccordionSection 
              title="Archived (DRAFT 0.1)" 
              isOpen={expandedSections['archived']} 
              onToggle={() => toggleSection('archived')}
            >
              <div className="space-y-4 text-sm leading-relaxed text-bauhaus-black font-sans">
                <div className="p-4 bg-bauhaus-yellow/10 border-2 border-bauhaus-black italic">
                  "DRAFT 0.1 - This is a draft version. As you read through each scene, use the Contact tab to share notes on dialogue, songs, structure, or to get involved. Thank you for your feedback!"
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-2">Copyright Summary</h4>
                  <p className="opacity-70">
                    This production is a work of parody and satire. Any resemblance to real persons, living or dead, or actual events is purely coincidental and intended for humorous effect as part of the satirical nature of the work. No allegations of fact are intended.
                  </p>
                </div>
              </div>
            </AccordionSection>
          </div>

          <div className="text-center italic opacity-60 text-xs py-8">
            "This project is designed to move forward."
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={onClose} title="CONTACT & COLLABORATION">
        <div className="py-4 text-bauhaus-black max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-bauhaus-red flex items-center justify-center text-bauhaus-white shrink-0">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black uppercase leading-tight">Get in Touch</h3>
              <p className="opacity-60 text-sm italic uppercase tracking-widest font-black">Direct to: barry@saintelmo.com</p>
            </div>
          </div>
          
          <form 
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent to barry@saintelmo.com (Simulated)');
              onClose();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border-4 border-bauhaus-black p-3 font-sans focus:bg-bauhaus-yellow transition-colors outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full border-4 border-bauhaus-black p-3 font-sans focus:bg-bauhaus-yellow transition-colors outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest">Subject</label>
              <select className="w-full border-4 border-bauhaus-black p-3 font-sans focus:bg-bauhaus-yellow transition-colors outline-none appearance-none bg-white">
                <option>Production Collaboration</option>
                <option>Musical Feedback</option>
                <option>Licensing Inquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest">Message</label>
              <textarea 
                required
                rows={4}
                className="w-full border-4 border-bauhaus-black p-3 font-sans focus:bg-bauhaus-yellow transition-colors outline-none resize-none"
                placeholder="How can we collaborate?"
              />
            </div>
            <BauhausButton type="submit" variant="red" className="w-full py-4 !text-xl">
              Send Message
            </BauhausButton>
          </form>

          <div className="mt-8 pt-8 border-t-4 border-bauhaus-black opacity-40">
            <p className="text-[10px] uppercase tracking-widest font-black leading-relaxed">
              Note: This is a work in progress. All inquiries regarding staging, rights, and creative collaboration are welcome. 
              Primary email context: barry@saintelmo.com
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

function CharacterCard({ name, tagline, color, description }: { name: string, tagline: string, color: 'red' | 'blue' | 'yellow', description: string }) {
  const colors = {
    red: 'bg-bauhaus-red',
    blue: 'bg-bauhaus-blue',
    yellow: 'bg-bauhaus-yellow'
  };
  return (
    <div className="border-4 border-bauhaus-black p-6 bg-bauhaus-white relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-12 h-12 ${colors[color]} -mr-6 -mt-6 rotate-45`} />
      <h3 className="text-3xl font-display font-black uppercase mb-1 leading-none">{name}</h3>
      <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60 italic">{tagline}</p>
      <div className="h-1 w-20 bg-bauhaus-black mb-4" />
      <p className="font-sans text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function CreditItem({ role, description }: { role: string, description: string }) {
  return (
    <div className="p-4 border-2 border-bauhaus-black bg-bauhaus-white hover:bg-bauhaus-yellow/10 transition-colors">
      <div className="font-display font-black uppercase text-xs mb-1">{role}</div>
      <div className="text-[10px] opacity-60 leading-tight">{description}</div>
    </div>
  );
}

function AccordionSection({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode, key?: string | number }) {
  return (
    <div className="border-4 border-bauhaus-black bg-bauhaus-white">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 font-display font-black uppercase tracking-widest text-left hover:bg-bauhaus-yellow transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-6 border-t-4 border-bauhaus-black bg-bauhaus-white">
          {children}
        </div>
      )}
    </div>
  );
}
