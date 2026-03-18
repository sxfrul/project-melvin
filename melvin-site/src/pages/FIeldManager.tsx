import { useState, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  Scan, 
  Leaf,
  ArrowLeft,
  ThermometerSun,
  Target,
  X
} from 'lucide-react';

// Define the Field type based on your mock data
interface FieldData {
  id: string;
  name: string;
  crop: string;
  area: string;
  health: number;
  moisture: number;
  disease: string;
  severity: string;
  lastScan: string;
  trend?: string;
  stage?: string;
  image: string;
  yieldLoss: string; // Added Yield Loss property
}

// --- Mock Data derived from Dashboard and DiseaseDetection ---
const mockFields: FieldData[] = [
  { 
    id: 'f-b1', 
    name: 'Field B-1', 
    crop: 'Corn', 
    area: '120 Hectares', 
    health: 45, 
    moisture: 64, 
    disease: 'Northern Corn Leaf Blight', 
    severity: 'Critical', 
    lastScan: '2 hours ago',
    trend: 'down',
    yieldLoss: '30%',
    image: 'https://images.unsplash.com/photo-1554402100-8d1d9f3dff80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: 'f-a2', 
    name: 'Field A-2', 
    crop: 'Corn', 
    area: '85 Hectares', 
    health: 72, 
    moisture: 58, 
    disease: 'Rust', 
    severity: 'Moderate', 
    lastScan: '1 day ago',
    trend: 'stable',
    yieldLoss: '10%',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=200&h=200'
  },
  { 
    id: 'f-c4', 
    name: 'Field C-4', 
    crop: 'Soybean', 
    area: '200 Hectares', 
    health: 88, 
    moisture: 70, 
    disease: 'Powdery Mildew', 
    severity: 'Low', 
    lastScan: '3 days ago',
    trend: 'up',
    yieldLoss: '5%',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=200&h=200'
  },
  { 
    id: 'f-a3', 
    name: 'Field A-3', 
    crop: 'Corn', 
    area: '150 Hectares', 
    health: 95, 
    moisture: 65, 
    disease: 'None', 
    severity: 'Healthy', 
    lastScan: '4 days ago',
    trend: 'up',
    yieldLoss: 'None',
    image: 'https://images.unsplash.com/photo-1565522734001-f00e62ec8424?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: 'f-a', 
    name: 'Field A', 
    crop: 'Winter Wheat', 
    area: '100 Hectares', 
    health: 92, 
    moisture: 60, 
    disease: 'None', 
    severity: 'Healthy', 
    lastScan: '1 week ago',
    stage: 'Tillering Stage',
    yieldLoss: 'None',
    image: 'https://images.unsplash.com/photo-1635372638513-8a960010a0ff?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export default function FieldManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<FieldData | null>(null);
  
  // Animation Sequence States
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false); 
  const [isDetailReady, setIsDetailReady] = useState(false); 

  // Panning States
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const filteredFields = mockFields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    field.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHealthColorText = (health: number) => {
    if (health >= 85) return 'text-green-600';
    if (health >= 65) return 'text-amber-600';
    if (health >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSelectField = (field: FieldData) => {
    setSelectedField(field);
    setShowMobileDetails(false);
    setIsPanelOpen(false);
    setIsDetailReady(false);
    setPan({ x: 0, y: 0 }); // Reset pan on new selection
    
    setTimeout(() => {
      setIsPanelOpen(true);
      setTimeout(() => {
        setIsDetailReady(true);
      }, 500); 
    }, 20);
  };

  const handleOpenMobileDetails = () => {
    setShowMobileDetails(true);
    setIsPanelOpen(false);
    setIsDetailReady(false);
    
    setTimeout(() => {
      setIsPanelOpen(true);
      setTimeout(() => {
        setIsDetailReady(true);
      }, 500);
    }, 20);
  };

  const handleCloseMobileDetails = () => {
    setShowMobileDetails(false);
    setIsPanelOpen(false);
    setIsDetailReady(false);
  };

  const handleBackToMap = () => {
    setSelectedField(null);
    setShowMobileDetails(false);
    setIsPanelOpen(false);
    setIsDetailReady(false);
  };

  // --- Panning Handlers ---
  const handlePanStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = { x: clientX - pan.x, y: clientY - pan.y };
  };

  const handlePanMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPan({
      x: clientX - dragStart.current.x,
      y: clientY - dragStart.current.y
    });
  };

  const handlePanEnd = () => {
    setIsDragging(false);
  };

  const isPanned = pan.x !== 0 || pan.y !== 0;

  return (
    <div className="w-full h-full max-h-screen flex flex-col overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 pt-4 lg:pt-8 pb-4 lg:pb-6 bg-gray-50/30">
      
      {/* Page Header */}
      <div className="mb-4 lg:mb-6 shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Field Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and monitor all active agricultural zones</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3 shrink-0">
        <div className="bg-white p-3 rounded-lg border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium mb-0.5">Total Active Fields</p>
          <p className="text-xl font-semibold text-gray-900">5</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium mb-0.5">Fields at Risk</p>
          <p className="text-xl font-semibold text-gray-900">2</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium mb-0.5">Total Coverage</p>
          <p className="text-xl font-semibold text-gray-900">655<span className="text-xs text-gray-500 font-normal ml-1">ha</span></p>
        </div>
        
        {/* Add Field Button */}
        <button className="bg-gray-50/50 p-2 rounded-xl border-2 border-gray-200 border-dashed hover:border-green-500 hover:bg-green-50/30 shadow-sm flex flex-col items-center justify-center transition-all group min-h-[70px]">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all shadow-sm mb-1">
            <Plus size={14} />
          </div>
          <span className="text-sm font-semibold text-gray-600 group-hover:text-green-700 transition-colors">Create Field</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className={`relative mb-3 flex items-center shrink-0 transition-opacity ${selectedField ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
          placeholder="Search fields by name or crop type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="absolute inset-y-0 right-1.5 my-1.5 px-2 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Filter options"
        >
          <Filter size={16} />
        </button>
      </div>

      {/* Farm Game GUI Area */}
      <div className="w-full flex-1 relative bg-emerald-50/60 rounded-2xl border-4 border-emerald-900/10 min-h-0 flex flex-col shadow-inner overflow-hidden">
        
        {/* Farm Background Texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-[1.25rem] z-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#166534 2.5px, transparent 2.5px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>

        {/* --- VIEW TOGGLE --- */}
        {!selectedField ? (
          /* GRID VIEW */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-7 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl mx-auto place-items-center content-center h-full relative z-10 p-6 overflow-y-auto custom-scrollbar">
            {filteredFields.map((field) => {
              const isHealthy = field.disease === 'None';
              
              return (
                <div 
                  key={field.id} 
                  onClick={() => handleSelectField(field)}
                  className={`relative cursor-pointer w-full max-w-[90px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] aspect-square rounded-xl shadow-[0_8px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_25px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center
                    ${isHealthy ? 'bg-[#795548] border-b-[8px] sm:border-b-[10px] border-[#5D4037]' : 'bg-[#8D6E63] border-b-[8px] sm:border-b-[10px] border-[#6D4C41]'}
                  `}
                >
                  
                  {/* Dirt & Crop Rows */}
                  <div className="absolute inset-0 flex flex-col justify-evenly px-3 py-2 pointer-events-none overflow-hidden rounded-xl">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-full h-[10%] rounded-full opacity-80 ${isHealthy ? 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]' : 'bg-yellow-600/70'}`}
                      ></div>
                    ))}
                  </div>

                  {/* Floating Name Tag */}
                  <div className="absolute -bottom-6 bg-white px-3 py-1.5 rounded-full shadow-md text-sm text-gray-800 border-2 border-gray-100 z-20 flex items-center gap-1.5 whitespace-nowrap">
                    {field.name}
                  </div>

                  {/* Status Badges */}
                  {!isHealthy && (
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg z-20 animate-pulse border-2 border-white">
                      <AlertTriangle size={14} />
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFields.length === 0 && (
              <div className="col-span-full text-emerald-800/50 font-medium text-center p-8 bg-white/40 rounded-3xl border-2 border-dashed border-emerald-800/20 text-sm">
                No fields found matching your search.
              </div>
            )}
          </div>
        ) : (
          /* 3D FOCUS VIEW */
          <div className="absolute inset-0 z-20 flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-300">
            
            {/* --- LEFT SIDE: Interactive 3D Plot Container --- */}
            <div 
              className={`relative flex flex-col items-center justify-center transition-colors duration-500 w-full md:w-1/2 h-full p-4 md:p-0 overflow-hidden touch-none
                ${showMobileDetails ? 'hidden md:flex' : 'flex'}
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
              `}
              onMouseDown={(e) => handlePanStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handlePanMove(e.clientX, e.clientY)}
              onMouseUp={handlePanEnd}
              onMouseLeave={handlePanEnd}
              onTouchStart={(e) => handlePanStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handlePanMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handlePanEnd}
            >
              
              {/* Desktop Back Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleBackToMap(); }} 
                className="hidden md:flex absolute top-2 left-2 lg:top-2 lg:left-2 items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-md font-medium text-base transition-all hover:scale-105 z-50 border border-gray-200"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {/* Recenter Button */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setPan({ x: 0, y: 0 }); 
                }} 
                className={`absolute bottom-20 md:bottom-6 right-4 md:right-6 flex items-center justify-center p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full shadow-lg transition-all duration-300 z-50 border border-gray-200 hover:scale-110
                  ${isPanned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                title="Recenter View"
              >
                <Target size={20} />
              </button>

              {/* Pannable Wrapper */}
              <div 
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Wrapper for 3D Shape and independent Badge */}
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-[50%] md:h-auto md:aspect-square flex-shrink-0 flex items-center justify-center perspective-1000 animate-in slide-in-from-left-8 duration-500 max-w-[250px]">
                  
                  {/* The 3D Plot Object */}
                  <div 
                    style={{ 
                      transform: 'rotateX(55deg) rotateZ(-45deg)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '-15px 15px 0px 0px #5D4037, -25px 25px 30px 5px rgba(0,0,0,0.3)'
                    }}
                    className={`w-full h-full rounded-2xl relative transition-colors duration-700 z-10
                      ${selectedField.disease === 'None' ? 'bg-[#795548]' : 'bg-[#8D6E63]'}
                    `}
                  >
                    {/* 3D Crop Rows */}
                    <div className="absolute inset-0 flex flex-col justify-evenly px-4 py-4 rounded-2xl overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-full h-[12%] rounded-full shadow-inner ${selectedField.disease === 'None' ? 'bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-yellow-600/80'}`}
                          ></div>
                        ))}
                      </div>
                  </div>

                  {/* Sibling Badge */}
                  <div className="absolute -top-4 sm:-top-6 md:-top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center drop-shadow-2xl">
                    {!selectedField.disease || selectedField.disease === 'None' ? (
                      <div className="bg-green-500 text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-xl animate-bounce border-2 border-white/20 flex items-center justify-center">
                        <Leaf className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                    ) : (
                      <div className="bg-red-500 text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-xl animate-bounce border-2 border-white/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* --- MOBILE ONLY: Bottom Actions Bar --- */}
            {!showMobileDetails && (
              <div className="md:hidden absolute bottom-4 left-4 right-4 flex justify-center gap-3 z-30 animate-in slide-in-from-bottom-8 pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleBackToMap(); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-xl shadow-xl border border-gray-200 active:bg-gray-50 transition-all text-sm font-medium pointer-events-auto"
                >
                  <ArrowLeft size={16}/> Back
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenMobileDetails(); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl shadow-xl active:bg-gray-800 transition-all text-sm font-medium pointer-events-auto"
                >
                  Details
                </button>
              </div>
            )}

            {/* --- RIGHT SIDE: Minimalist Details Panel --- */}
            <div className={`
              ${showMobileDetails ? 'flex absolute inset-0' : 'hidden md:flex absolute right-0 top-0 bottom-0 w-1/2'}
              flex-col z-50 bg-white md:bg-white/95 backdrop-blur-md md:border-l md:border-gray-200
              transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
              
              <div className="w-full h-full flex flex-col p-4 md:p-10 overflow-y-auto">
                {isDetailReady && (
                  <div className="w-full h-full flex flex-col animate-in fade-in duration-500 fill-mode-forwards">
                    
                    {/* Header & Mobile Close Button */}
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">{selectedField.name}</h2>
                      
                      <button 
                        onClick={handleCloseMobileDetails}
                        className="md:hidden flex items-center justify-center p-2 -mr-2 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors active:bg-gray-200"
                        title="Close details"
                      >
                        <X size={24}/>
                      </button>
                    </div>

                    {/* Sleek Horizontal Table View */}
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Score</span>
                        <span className={`text-sm font-medium ${getHealthColorText(selectedField.health)}`}>{selectedField.health}%</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Moisture</span>
                        <span className="text-sm text-gray-900 font-medium">{selectedField.moisture}%</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Disease</span>
                        <span className={`text-sm font-medium ${selectedField.disease === 'None' ? 'text-gray-900' : 'text-red-600'}`}>{selectedField.disease}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Crop Type</span>
                        <span className="text-sm text-gray-900 font-medium">{selectedField.crop}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Size</span>
                        <span className="text-sm text-gray-900 font-medium">{selectedField.area}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Yield Loss</span>
                        <span className={`text-sm font-medium ${selectedField.yieldLoss === 'None' ? 'text-gray-900' : 'text-orange-600'}`}>{selectedField.yieldLoss}</span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* Actions & Footer */}
                    <div className="flex gap-3 mt-8 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.98]">
                        <Scan size={16}/> Scan with Melvin
                      </button>
                      <button className="p-3 bg-white hover:bg-gray-50 text-gray-600 rounded-xl transition-all border border-gray-200 shadow-sm active:scale-[0.98]" title="View History">
                        <ThermometerSun size={18} />
                      </button>
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}