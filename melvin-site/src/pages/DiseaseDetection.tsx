import { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  Send, 
  Bot, 
  Image as ImageIcon, 
  Paperclip, 
  MessageSquare, 
  PanelRight, 
  X, 
  Info, 
  Map, 
  Loader2,
  ExternalLink,
  Link2
} from 'lucide-react';

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
  type: 'text' | 'image' | 'loading' | 'analysis';
  content?: string;
  fileName?: string;
  fileSize?: string;
};

// --- Components ---
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

const AnalysisCard = () => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 lg:p-5 w-full mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
    
    {/* Diagnostic and detailed report */}
    <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-5 flex items-start gap-3">
      <div className="mt-0.5 p-1.5 bg-red-100 rounded-lg flex-shrink-0">
          <ShieldAlert className="text-red-600 w-4 h-4" />
      </div>
      <div>
        <h4 className="text-[13px] lg:text-sm font-semibold text-gray-900 tracking-tight">Diagnostic: Northern Corn Leaf Blight detected</h4>
        <p className="text-[11px] lg:text-xs text-red-600 mt-1 font-medium flex items-center gap-1.5">
          Critical Severity <span className="w-1 h-1 bg-red-600 rounded-full"></span> Confidence: 94.2%
        </p>
        <p className="text-[11px] lg:text-xs text-gray-700 mt-2">
          <strong>Detailed Report:</strong> The submitted image exhibits large, elliptical, grayish-green to tan lesions on the leaves, highly characteristic of <em>Exserohilum turcicum</em> infection. Structural comparison against the healthy baseline indicates an approximate 28% affected leaf area.
        </p>
      </div>
    </div>
    
    {/* Recommendation/Solution */}
    <div className="mb-5">
      <ul className="space-y-3">
        <li className="flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
          <span className="text-[12px] lg:text-[13px] text-gray-600 leading-relaxed"><strong>Immediate Action:</strong> Apply foliar fungicides containing strobilurins or triazoles to halt the spread within the canopy.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
          <span className="text-[12px] lg:text-[13px] text-gray-600 leading-relaxed"><strong>Cultural Practice:</strong> Ensure proper weed management to increase airflow in the canopy, reducing the ambient humidity that fuels fungal growth.</span>
        </li>
      </ul>
    </div>

    {/* In-chat Action Buttons */}
    <div className="pt-4 border-t border-gray-100 flex gap-2.5 flex-wrap sm:flex-nowrap">
      <button className="w-full sm:flex-1 px-4 py-2 bg-gray-900 text-white text-xs lg:text-sm rounded-xl hover:bg-gray-800 transition font-medium text-center">
        Generate Work Order
      </button>
      <button className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-xs lg:text-sm rounded-xl hover:bg-gray-100 transition font-medium">
        Save Report
      </button>
    </div>
  </div>
);

// Real website mockup using a horizontal open-graph style link preview
const RelatedArticleCard = () => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden mt-3 max-w-[420px] animate-in fade-in slide-in-from-bottom-3 duration-700">
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
      {/* Site Metadata & Content (Left Side) */}
      <div className="p-3.5 flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1.5">
          {/* CPN Favicon Mockup */}
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide truncate">cropprotectionnetwork.org</span>
        </div>
        
        <h4 className="text-[12px] font-semibold text-gray-900 mb-1 leading-tight line-clamp-2 pr-2">
          An Overview of Northern Corn Leaf Blight
        </h4>
        
        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed pr-2">
          Northern corn leaf blight (NCLB) is a foliar disease of corn caused by the fungus Exserohilum turcicum. It occurs in humid climates...
        </p>
      </div>

      {/* OG Image Mockup (Right Side) */}
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

export default function DiseaseDetection() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return false;
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      type: 'text',
      content: "Hi there! I'm ready to analyze your crop images. You can upload a scan of a leaf using the paperclip icon below, and I'll run it through our disease detection model."
    }
  ]);
  const [inputText, setInputText] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Image Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Add user's image message
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

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Simulate AI loading/scanning
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

      // Generate Report (Transition from loading to analysis)
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

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        type: 'text',
        content: inputText
      }
    ]);
    setInputText("");

    // Generic bot response for text inputs
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

  return (
    <div className="flex flex-row relative overflow-hidden h-[calc(100vh-4.5rem)] md:h-screen -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 -my-4 sm:-my-6 md:-my-8 lg:-my-8">
      
      {/* Mobile/Tablet Floating Toggle Button */}
      <div className="absolute top-4 right-0 z-20 xl:hidden">
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="p-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 border-r-0 shadow-sm rounded-l-xl text-gray-600 flex items-center justify-center transition-all hover:bg-gray-50"
          title="Open Chat History"
        >
          <PanelRight size={20} />
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isHistoryOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 xl:hidden transition-opacity"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}

      {/* Left/Center Column: Main Chat Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 h-full ${isHistoryOpen ? 'xl:pr-2' : 'pr-0'}`}>
        
        {/* Scrollable Chat Messages Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-10 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="max-w-3xl mx-auto w-full flex flex-col space-y-8 pt-8">
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {/* BOT MESSAGES */}
                {msg.sender === 'bot' && (
                  <div className="flex flex-col gap-2.5 items-start max-w-2xl w-full">
                    <Bot size={26} className="text-indigo-600" />
                    
                    {msg.type === 'text' && (
                      <p className="text-[13px] lg:text-sm text-gray-800 leading-relaxed text-left">
                        {msg.content}
                      </p>
                    )}
                    
                    {msg.type === 'loading' && (
                      <ScanningAnimation />
                    )}
                    
                    {msg.type === 'analysis' && (
                      <div className="w-full">
                        <p className="text-[13px] lg:text-sm text-gray-800 leading-relaxed text-left mb-3">
                          Scan complete. I've analyzed the leaf image. Here is the detailed diagnostic report:
                        </p>
                        <AnalysisCard />
                        <RelatedArticleCard />
                      </div>
                    )}
                  </div>
                )}

                {/* USER MESSAGES */}
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
                      <div className="bg-gray-100 border border-gray-200/60 px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-lg">
                        <p className="text-[13px] lg:text-sm text-gray-800 leading-relaxed text-left">
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
        </div>

        {/* Fixed Input Area */}
        <div className="flex-none w-full bg-[#f5f5f7] bg-opacity-95 backdrop-blur-sm pt-2 pb-6 lg:pb-8 border-t border-gray-200/50 px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            
            {/* Contextual Suggestion Chips */}
            <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
               <button 
                 onClick={() => setInputText("What causes Corn Leaf Blight?")}
                 className="whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] lg:text-xs font-medium rounded-full shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors flex items-center gap-1.5"
                >
                 <Info size={12} /> What causes Corn Leaf Blight?
               </button>
               <button 
                 onClick={() => setInputText("Is this spreading to Field B-2?")}
                 className="whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] lg:text-xs font-medium rounded-full shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors flex items-center gap-1.5"
                >
                 <Map size={12} /> Is this spreading to Field B-2?
               </button>
            </div>

            {/* Chat Input */}
            <div className="relative bg-white border border-gray-200 shadow-sm rounded-[24px] flex items-end p-2 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all">
              
              {/* Hidden File Input */}
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
                placeholder="Message Melvin AI or drop an image..." 
                className="w-full max-h-32 bg-transparent resize-none outline-none py-3 px-3 text-[13px] lg:text-sm text-gray-900 placeholder-gray-500" 
                rows={1} 
              />
              
              <button 
                onClick={handleTextSubmit}
                className="p-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors mb-0.5 mr-0.5 flex-shrink-0 shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 font-medium px-4">
              Melvin AI analyzes visual and historical data. Verify critical actions with your field agronomist.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Divider: Toggle Button Column (Desktop Only) */}
      <div className="hidden xl:flex flex-col items-center justify-start pt-3 px-1.5 z-10">
        <button 
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors"
          title={isHistoryOpen ? "Hide history" : "Show history"}
        >
          <PanelRight size={20} />
        </button>
      </div>

      {/* Right Column: Historical Analysis Panel */}
      <div 
        className={`
          fixed inset-y-0 right-0 z-50 bg-[#f5f5f7] shadow-2xl transition-transform duration-300 ease-in-out
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