import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  Scan, 
  Leaf,
  Map as MapIcon,
  ArrowLeft,
  ThermometerSun
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
    image: 'https://images.unsplash.com/photo-1635372638513-8a960010a0ff?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export default function FieldManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<FieldData | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const filteredFields = mockFields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    field.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHealthColor = (health: number) => {
    if (health >= 85) return 'bg-green-500';
    if (health >= 65) return 'bg-amber-500';
    if (health >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthTextColor = (health: number) => {
    if (health >= 85) return 'text-green-600';
    if (health >= 65) return 'text-amber-600';
    if (health >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSelectField = (field: FieldData) => {
    setSelectedField(field);
    setShowMobileDetails(false);
  };

  const handleBackToMap = () => {
    setSelectedField(null);
    setShowMobileDetails(false);
  };

  return (
    <div className="w-full h-full max-h-screen flex flex-col overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 pt-4 lg:pt-8 pb-4 lg:pb-6 bg-gray-50/30">
      
      {/* Page Header */}
      <div className="mb-3 shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Field Manager</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage and monitor all active agricultural zones</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3 shrink-0">
        <div className="bg-white p-3 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 font-medium mb-0.5">Total Active Fields</p>
          <p className="text-xl font-semibold text-gray-900">5</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 font-medium mb-0.5">Fields at Risk</p>
          <p className="text-xl font-semibold text-gray-900">2</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 font-medium mb-0.5">Total Coverage</p>
          <p className="text-xl font-semibold text-gray-900">655<span className="text-xs text-gray-500 font-normal ml-1">ha</span></p>
        </div>
        
        {/* Add Field Button */}
        <button className="bg-gray-50/50 p-2 rounded-2xl border-2 border-gray-200 border-dashed hover:border-green-500 hover:bg-green-50/30 shadow-sm flex flex-col items-center justify-center transition-all group min-h-[70px]">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all shadow-sm mb-1">
            <Plus size={14} />
          </div>
          <span className="text-[11px] font-semibold text-gray-600 group-hover:text-green-700 transition-colors">Add New Field</span>
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
      <div className="w-full flex-1 relative bg-emerald-50/60 rounded-3xl border-4 border-emerald-900/10 p-4 min-h-0 flex flex-col shadow-inner overflow-hidden">
        
        {/* Farm Background Texture (Persistent across both views) */}
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl mx-auto place-items-center content-center h-full relative z-10 py-6 overflow-y-auto custom-scrollbar">
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
                        className={`w-full h-[15%] rounded-full opacity-80 ${isHealthy ? 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]' : 'bg-yellow-600/70'}`}
                      ></div>
                    ))}
                  </div>

                  {/* Floating Name Tag */}
                  <div className="absolute -top-4 bg-white px-3 py-1.5 rounded-full shadow-md text-[11px] font-bold text-gray-800 border-2 border-gray-100 z-20 flex items-center gap-1.5 whitespace-nowrap">
                    <Leaf size={12} className={isHealthy ? 'text-green-500' : 'text-amber-500'} />
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
          // Removed bg-color and backdrop-blur to let the texture show through perfectly
          <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-16 animate-in fade-in duration-300 overflow-hidden md:overflow-y-auto">
            
            {/* Desktop Back Button (Hidden on mobile) */}
            <button 
              onClick={handleBackToMap} 
              className="hidden md:flex absolute top-6 left-6 items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md font-medium text-sm transition-all hover:scale-105 z-50 border border-gray-200"
            >
              <ArrowLeft size={16} />
              Back to Map
            </button>

            {/* The 3D Plot Object */}
            <div className={`relative w-35 h-35 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-5 md:mb-0 flex-shrink-0 items-center justify-center perspective-1000 animate-in slide-in-from-left-8 duration-500
              ${showMobileDetails ? 'hidden md:flex' : 'flex'}
            `}>
              <div 
                style={{ 
                  transform: 'rotateX(55deg) rotateZ(-45deg)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '-15px 15px 0px 0px #5D4037, -25px 25px 30px 5px rgba(0,0,0,0.3)'
                }}
                className={`w-full h-full rounded-2xl relative transition-all duration-700
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

                  {/* Marker above the 3D plot */}
                  <div 
                    style={{ transform: 'rotateZ(45deg) rotateX(-55deg) translateZ(50px) translateY(-80px)' }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    {!selectedField.disease || selectedField.disease === 'None' ? (
                      <div className="bg-green-500 text-white p-3 rounded-full shadow-xl animate-bounce">
                        <Leaf size={24} />
                      </div>
                    ) : (
                      <div className="bg-red-500 text-white p-3 rounded-full shadow-xl animate-bounce">
                        <AlertTriangle size={24} />
                      </div>
                    )}
                  </div>
              </div>
            </div>

            {/* Mobile Action Bar: Map & Details side by side (Hidden on desktop, or if details are active) */}
            {/* Adjusted bottom, left, and right margins to tuck closer to the edges */}
            {!showMobileDetails && (
              <div className="md:hidden absolute bottom-2 left-2 right-2 flex justify-center gap-2 z-30 animate-in slide-in-from-bottom-8">
                <button 
                  onClick={handleBackToMap}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-xl shadow-xl border border-gray-200 active:bg-gray-50 transition-all text-sm"
                >
                  <ArrowLeft size={16}/> Map
                </button>
                <button 
                  onClick={() => setShowMobileDetails(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl shadow-xl active:bg-indigo-700 transition-all text-sm"
                >
                  Details
                </button>
              </div>
            )}

            {/* Details Panel */}
            <div className={`
              ${showMobileDetails ? 'absolute inset-0 z-50 flex flex-col bg-gray-50/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in slide-in-from-bottom-8 duration-300' : 'hidden'}
              md:flex md:flex-col md:relative md:inset-auto md:z-10 md:bg-white md:rounded-3xl md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] md:border md:border-gray-100 md:p-6 md:w-full md:max-w-sm md:flex-shrink-0 md:overflow-visible md:animate-in md:slide-in-from-right-8 md:duration-500
            `}>
              
              <div className="w-full max-w-sm mx-auto flex flex-col">
                {/* Mobile Close Details Header */}
                <div className="md:hidden flex items-center mb-6">
                  <button 
                    onClick={() => setShowMobileDetails(false)}
                    className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 font-medium text-sm active:bg-gray-50"
                  >
                    <ArrowLeft size={16}/> Back to 3D View
                  </button>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200 md:border-gray-100">
                  <img src={selectedField.image} alt={selectedField.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedField.name}</h2>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <Leaf size={12}/> {selectedField.crop} &nbsp;•&nbsp; <MapIcon size={12}/> {selectedField.area}
                    </p>
                  </div>
                </div>

                {/* Main Health Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-600 font-semibold flex items-center gap-1.5 text-sm">
                      <Activity size={16} className="text-gray-400"/> Overall Health
                    </span> 
                    <span className={`text-lg font-bold ${getHealthTextColor(selectedField.health)}`}>
                      {selectedField.health}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 md:bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div className={`h-2.5 rounded-full ${getHealthColor(selectedField.health)} transition-all duration-1000 ease-out`} style={{ width: `${selectedField.health}%` }}></div>
                  </div>
                </div>
                
                {/* Vitals Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50/80 md:bg-blue-50/50 p-3 rounded-2xl border border-blue-100/80 md:border-blue-100/50">
                    <span className="text-[10px] text-blue-500 uppercase font-bold flex items-center gap-1 mb-1"><Droplets size={12}/> Moisture Level</span>
                    <span className="font-semibold text-gray-800 text-lg">{selectedField.moisture}%</span>
                  </div>
                  
                  <div className={`p-3 rounded-2xl border ${selectedField.disease === 'None' ? 'bg-green-50/80 md:bg-green-50/50 border-green-100/80 md:border-green-100/50' : 'bg-red-50/80 md:bg-red-50/50 border-red-100/80 md:border-red-100/50'}`}>
                    <span className={`text-[10px] uppercase font-bold flex items-center gap-1 mb-1 ${selectedField.disease === 'None' ? 'text-green-600' : 'text-red-500'}`}>
                      <AlertTriangle size={12}/> Disease Status
                    </span>
                    <span className={`font-semibold text-sm block leading-tight ${selectedField.disease === 'None' ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedField.disease === 'None' ? 'Healthy' : selectedField.disease}
                    </span>
                  </div>
                </div>

                {/* Actions & Footer */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-indigo-200">
                    <Scan size={16}/> Initiate Drone Scan
                  </button>
                  <button className="p-3 bg-white hover:bg-gray-50 md:bg-gray-100 md:hover:bg-gray-200 text-gray-600 rounded-xl transition-colors border border-gray-200" title="Soil History">
                    <ThermometerSun size={18} />
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <span className="text-[10px] text-gray-500 md:text-gray-400 font-medium bg-white md:bg-gray-50 border border-gray-200 md:border-transparent px-3 py-1 rounded-full">
                    Last updated: {selectedField.lastScan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}