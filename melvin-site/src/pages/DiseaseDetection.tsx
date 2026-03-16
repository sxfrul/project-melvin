import { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  Send, 
  Image as ImageIcon, 
  Paperclip, 
  MessageSquare, 
  PanelRight, 
  X, 
  Info, 
  Map, 
  Loader2,
  Link2
} from 'lucide-react';
import melvinLogo from '../assets/melvin-logo.jpg';

// --- Mock Data for Chat History ---
const chatHistory = [
  {
    timeframe: 'Today',
    sessions: [
      { id: '1', title: 'Field B-1 Blight Check', active: true },
      { id: '2', title: 'Soil moisture query', active: false },
    ]
  },
  {
    timeframe: 'Previous 7 Days',
    sessions: [
      { id: '3', title: 'Field A-3 Rust Analysis', active: false },
      { id: '4', title: 'Powdery Mildew Treatment', active: false },
      { id: '5', title: 'Fertilizer recommendations', active: false },
    ]
  },
  {
    timeframe: 'October 2023',
    sessions: [
      { id: '6', title: 'Monthly yield estimate', active: false },
      { id: '7', title: 'Drone scan summary', active: false },
      { id: '8', title: 'Pest control alternatives', active: false },
    ]
  }
];

// --- Types ---
type Message = {
  id: string;
  sender: 'bot' | 'user';
  type: 'text' | 'image' | 'loading' | 'analysis' | 'article';
  content?: string;
  fileName?: string;
  fileSize?: string;
};

// --- Components ---

const Typewriter = ({ prefix, text, delay = 10, onComplete, start = true }: { prefix?: string, text: string, delay?: number, onComplete?: () => void, start?: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(t);
        onCompleteRef.current?.();
      }
    }, delay);
    return () => clearInterval(t);
  }, [text, delay, start]);
  
  return (
    <>
      {prefix && <strong>{prefix}</strong>} {displayed}
    </>
  );
};

const ScanningAnimation = () => {
  const [phase, setPhase] = useState(0);
  const phases = [
    'Scanning visual artifacts...',
    'Analyzing structural anomalies...',
    'Cross-referencing database...',
    'Generating diagnostic report...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[13px] lg:text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 w-[260px] sm:w-[300px]">
      <Loader2 size={16} className="animate-spin text-indigo-600 flex-shrink-0" />
      <div className="relative flex-1 h-5 overflow-hidden">
        {phases.map((text, i) => (
          <span
            key={i}
            className={`absolute left-0 top-0 transition-opacity duration-300 whitespace-nowrap ${
              i === phase ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

const AnalysisCard = ({ onComplete }: { onComplete?: () => void }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 lg:p-5 w-full mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500 transition-all">
      <div className="mb-4 rounded-xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="bg-gray-50 p-4 lg:p-5">
          <div className="mb-4">
            <h3 className="text-[13px] lg:text-sm font-semibold text-gray-900 tracking-tight flex items-center gap-1.5">
              <Map size={16} className="text-indigo-600" /> Leaf Area Heatmap
            </h3>
            <p className="text-[11px] lg:text-xs text-gray-500 mt-0.5">Spatial distribution of infection on uploaded visual scan</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-stretch">
            <div className="relative w-full md:w-1/2 min-h-[200px] md:min-h-0 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1618507763251-9ea0a27ef29e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-[15%] left-[20%] w-36 h-36 bg-[radial-gradient(circle,rgba(239,68,68,0.9)_10%,rgba(245,158,11,0.7)_40%,rgba(34,197,94,0.4)_70%,transparent_100%)] blur-[2px] rounded-full mix-blend-screen"></div>
              <div className="absolute top-[40%] right-[15%] w-52 h-52 bg-[radial-gradient(circle,rgba(239,68,68,0.8)_15%,rgba(245,158,11,0.6)_45%,rgba(59,130,246,0.3)_80%,transparent_100%)] blur-[4px] rounded-full mix-blend-screen"></div>
              <div className="absolute bottom-[15%] left-[45%] w-28 h-28 bg-[radial-gradient(circle,rgba(245,158,11,0.8)_20%,rgba(34,197,94,0.5)_60%,transparent_100%)] blur-[2px] rounded-full mix-blend-screen"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              <div className="absolute top-[25%] left-[28%] w-4 h-4 border border-white/70 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
              <div className="absolute top-[55%] right-[28%] w-4 h-4 border border-white/70 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Total Affected Area</span>
                  <span className="font-bold text-gray-600">28.4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '28.4%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 lg:gap-4 pt-2">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">High Severity</p>
                  <p className="font-semibold text-gray-900">12.1%</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Moderate Severity</p>
                  <p className="font-semibold text-gray-900">16.3%</p>
                </div>
              </div>
              
              <p className="text-[10px] text-gray-500 italic mt-2 leading-tight">
                * Heatmap is generated from the uploaded visual field imaging. Red zones indicate high deterioration or blight concentrations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-3 lg:p-4 border-t border-red-100 flex items-start gap-3">
          <div className="mt-0.5 p-1.5 bg-red-100 rounded-lg flex-shrink-0">
              <ShieldAlert className="text-red-600 w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[13px] lg:text-sm font-semibold text-gray-900 tracking-tight">Corn Leaf Blight detected</h4>
            <p className="text-[11px] lg:text-xs text-red-600 mt-1 font-medium flex items-center gap-1.5">
              Critical Severity <span className="w-1 h-1 bg-red-600 rounded-full"></span> Confidence: 94.2%
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-[12px] lg:text-[13px] text-gray-700 leading-relaxed">
          <Typewriter 
            prefix="Detailed Report:" 
            text="The submitted image exhibits large, elliptical, grayish-green to tan lesions on the leaves, highly characteristic of Exserohilum turcicum infection. Structural comparison against the healthy baseline indicates an approximate 28% affected leaf area."
            start={true}
            onComplete={() => setStep(1)}
            delay={10}
          />
        </p>
      </div>

      <div className="mb-5">
        <ul className="space-y-3">
          <li className={`flex items-start gap-2.5 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'hidden'}`}>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[12px] lg:text-[13px] text-gray-600 leading-relaxed">
              {step >= 1 && (
                <Typewriter
                  prefix="Immediate Action:"
                  text="Apply foliar fungicides containing strobilurins or triazoles to halt the spread within the canopy."
                  start={step >= 1}
                  onComplete={() => setStep(2)}
                  delay={10}
                />
              )}
            </span>
          </li>
          <li className={`flex items-start gap-2.5 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'hidden'}`}>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-[12px] lg:text-[13px] text-gray-600 leading-relaxed">
              {step >= 2 && (
                <Typewriter
                  prefix="Cultural Practice:"
                  text="Ensure proper weed management to increase airflow in the canopy, reducing the ambient humidity that fuels fungal growth."
                  start={step >= 2}
                  onComplete={() => {
                    setStep(3);
                    if(onComplete) onComplete();
                  }}
                  delay={10}
                />
              )}
            </span>
          </li>
        </ul>
      </div>

      <div className={`pt-4 border-t border-gray-100 flex gap-2.5 flex-wrap sm:flex-nowrap transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <button className="w-full sm:flex-1 px-4 py-2 bg-gray-900 text-white text-sm lg:text-sm rounded-xl hover:bg-gray-800 transition font-medium text-center">
          Add to Tasklist
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm lg:text-sm rounded-xl hover:bg-gray-100 transition font-medium">
          Save Report
        </button>
      </div>
    </div>
  );
};

const RelatedArticleCard = () => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden mt-2 max-w-[420px] animate-in fade-in slide-in-from-bottom-3 duration-700">
    <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50/80">
      <Link2 size={14} className="text-indigo-500" />
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Related Article</span>
    </div>
    
    <a 
      href="https://cropprotectionnetwork.org/publications/an-overview-of-northern-corn-leaf-blight" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex flex-row hover:bg-gray-50 transition-colors group h-[110px]"
    >
      <div className="p-3.5 flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide truncate">cropprotectionnetwork.org</span>
        </div>
        <h4 className="text-[12px] font-semibold text-gray-900 mb-1 leading-tight line-clamp-2 pr-2">
          An Overview of Northern Corn Leaf Blight
        </h4>
        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed pr-2">
          Northern corn leaf blight (NCLB) is a foliar disease of corn caused by the fungus Exserohilum turcicum. It occurs in humid climates...
        </p>
      </div>

      <div className="w-[110px] h-full overflow-hidden bg-gray-100 relative flex-shrink-0 border-l border-gray-100">
        <img 
          src="https://cropprotectionnetwork.s3.amazonaws.com/brand/crop-protection-network-logo.png" 
          alt="Corn field showing blight" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
    </a>
  </div>
);

const AnalysisMessageContent = ({ onShowArticleClicked }: { onShowArticleClicked: () => void }) => {
  const [typingDone, setTypingDone] = useState(false);
  const [chipClicked, setChipClicked] = useState(false);

  const handleChipClick = () => {
    setChipClicked(true);
    onShowArticleClicked();
  };

  return (
    <div className="w-full flex flex-col items-start">
      <p className="text-base lg:text-base text-gray-800 leading-relaxed text-left mb-3">
        Scan complete. I've analyzed the leaf image. Here is the detailed diagnostic report:
      </p>
      <AnalysisCard onComplete={() => setTypingDone(true)} />
      
      {typingDone && !chipClicked && (
        <div className="mt-3 animate-in fade-in duration-500">
          <button 
            onClick={handleChipClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 shadow-sm rounded-full text-sm lg:text-sm font-medium hover:border-indigo-300 hover:text-indigo-700 transition-colors"
          >
            <Link2 size={14} /> Show Related Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default function DiseaseDetection() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return false;
  });

  // Start with an empty chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FIX 1: Only scroll into view if there are actual messages to show
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userMsgId = Date.now().toString();
    setMessages(prev => [
      ...prev, 
      {
        id: userMsgId,
        sender: 'user',
        type: 'image',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }
    ]);

    if (fileInputRef.current) fileInputRef.current.value = '';

    const loadingId = (Date.now() + 1).toString();
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: loadingId,
          sender: 'bot',
          type: 'loading'
        }
      ]);

      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== loadingId);
          return [
            ...filtered,
            {
              id: (Date.now() + 2).toString(),
              sender: 'bot',
              type: 'analysis'
            }
          ];
        });
      }, 3500); 
    }, 600);
  };

  const handleTextSubmit = (overrideText?: string) => {
    const textToSubmit = overrideText || inputText;
    if (!textToSubmit.trim()) return;
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        type: 'text',
        content: textToSubmit
      }
    ]);
    if (!overrideText) setInputText("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'text',
          content: "I've noted your message. Please upload an image if you'd like me to perform a diagnostic scan."
        }
      ]);
    }, 1000);
  };

  const handleShowArticle = () => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        type: 'text',
        content: 'Show Related Articles'
      }
    ]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'article'
        }
      ]);
    }, 600);
  };

  return (
    <div className="flex flex-row relative overflow-hidden h-[calc(100vh-4.5rem)] md:h-screen -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 -my-4 sm:-my-6 md:-my-8 lg:-my-8 bg-[#f9f9fb]">
      
      <div className="absolute top-4 right-0 z-20 xl:hidden">
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="p-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 border-r-0 shadow-sm rounded-l-xl text-gray-600 flex items-center justify-center transition-all hover:bg-gray-50"
          title="Open Chat History"
        >
          <PanelRight size={20} />
        </button>
      </div>

      {isHistoryOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 xl:hidden transition-opacity"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 h-full ${isHistoryOpen ? 'xl:pr-2' : 'pr-0'}`}>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-10 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] flex flex-col">
          
          {messages.length === 0 ? (
            // Empty State / Welcome Screen
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-700 max-w-3xl mx-auto w-full py-10">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-gray-100 mb-6 flex-shrink-0">
                 <img src={melvinLogo} alt="Melvin AI" className="w-full h-full object-cover scale-225 translate-y-7" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-500 mb-10 text-center tracking-tight">
                How can Melvin help?
              </h1>
            </div>
          ) : (
            // Chat History Screen
            <div className="max-w-3xl mx-auto w-full flex flex-col space-y-8 pt-8">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {msg.sender === 'bot' && (
                    <div className="flex flex-col gap-2.5 items-start max-w-2xl w-full">
                      <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                          <img
                              src={melvinLogo}
                              alt="Melvin AI"
                              className="w-full h-full object-cover scale-225 translate-y-4"
                          />
                      </div>

                      {msg.type === 'text' && (
                        <p className="text-base lg:text-base text-gray-800 leading-relaxed text-left">
                          {msg.content}
                        </p>
                      )}
                      
                      {msg.type === 'loading' && (
                        <ScanningAnimation />
                      )}
                      
                      {msg.type === 'analysis' && (
                        <AnalysisMessageContent onShowArticleClicked={handleShowArticle} />
                      )}

                      {msg.type === 'article' && (
                        <div className="w-full flex flex-col items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <p className="text-base lg:text-base text-gray-800 leading-relaxed text-left mb-1">
                            Here is a resource with comprehensive information regarding the detected disease:
                          </p>
                          <RelatedArticleCard />
                        </div>
                      )}
                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <div className="flex flex-col gap-3 items-end">
                      {msg.type === 'image' && (
                        <div className="flex items-center gap-3 bg-white border border-gray-200 p-2 pr-4 rounded-xl w-fit shadow-sm text-left">
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                              <ImageIcon size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{msg.fileName}</p>
                            <p className="text-[10px] text-gray-500">{msg.fileSize} • Image</p>
                          </div>
                        </div>
                      )}
                      
                      {msg.type === 'text' && msg.content && (
                        <div className="bg-gray-100 border border-gray-200/60 px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-lg animate-in fade-in slide-in-from-right-2 duration-300">
                          <p className="text-base lg:text-base text-gray-800 leading-relaxed text-left">
                            {msg.content}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="flex-none w-full bg-[#f9f9fb] bg-opacity-95 backdrop-blur-sm pt-2 pb-6 lg:pb-8 px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            
            <div className="relative bg-white border border-gray-200 shadow-sm rounded-[24px] flex items-end p-2 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all">
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors mb-0.5 ml-0.5 flex-shrink-0"
                title="Attach an image"
              >
                <Paperclip size={20} />
              </button>
              
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleTextSubmit();
                  }
                }}
                placeholder="Message Melvin AI..." 
                className="w-full max-h-32 bg-transparent resize-none outline-none py-3 px-3 text-base lg:text-base text-gray-900 placeholder-gray-500" 
                rows={1} 
              />
              
              <button 
                onClick={() => handleTextSubmit()}
                className={`p-2.5 rounded-full transition-colors mb-0.5 mr-0.5 flex-shrink-0 shadow-sm ${
                  inputText.trim() ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!inputText.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex flex-col items-center justify-start pt-3 px-1.5 z-10">
        <button 
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors"
          title={isHistoryOpen ? "Hide history" : "Show history"}
        >
          <PanelRight size={20} />
        </button>
      </div>

      {/* Sidebar Chat History */}
      <div 
        className={`
          fixed inset-y-0 right-0 z-50 bg-[#f9f9fb] shadow-2xl transition-transform duration-300 ease-in-out
          xl:static xl:bg-transparent xl:shadow-none xl:z-auto xl:flex-shrink-0 xl:transition-all xl:overflow-hidden xl:border-l xl:border-gray-200/80
          ${isHistoryOpen 
            ? 'translate-x-0 xl:w-64 xl:opacity-100' 
            : 'translate-x-full xl:translate-x-0 xl:w-0 xl:opacity-0 xl:border-l-0'
          }
        `}
      >
        <div className="h-full w-64 overflow-y-auto overflow-x-hidden pl-5 pr-4 pb-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
          
          <div className="flex justify-between items-start mb-6 mt-6 xl:mt-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Chat History</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Past AI diagnostics</p>
            </div>
            <button 
              onClick={() => setIsHistoryOpen(false)}
              className="xl:hidden p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6">
            {chatHistory.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 pl-2">
                  {group.timeframe}
                </h4>
                <ul className="space-y-1">
                  {group.sessions.map((session) => (
                    <li key={session.id}>
                      <button 
                        className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                          session.active 
                            ? 'bg-white shadow-sm border border-gray-200/60 text-indigo-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900'
                        }`}
                      >
                        <MessageSquare size={14} className={session.active ? 'text-indigo-500 flex-shrink-0' : 'text-gray-400 flex-shrink-0'} />
                        <span className="text-[13px] truncate">{session.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      </div>

    </div>
  );
}