import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  Scan, 
  Leaf 
} from 'lucide-react';

// --- Mock Data derived from Dashboard and DiseaseDetection ---
const mockFields = [
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

  const filteredFields = mockFields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    field.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHealthColor = (health: number) => {
    if (health >= 85) return 'bg-green-600';
    if (health >= 65) return 'bg-amber-500';
    if (health >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full pb-6 lg:pb-0">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">Field Manager</h1>
        <p className="text-xs lg:text-sm text-gray-500 mt-1">Manage and monitor all active agricultural zones</p>
      </div>

      {/* Summary Stats - Tightened gaps to gap-2 (8px) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Active Fields</p>
          <p className="text-2xl font-semibold text-gray-900">5</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-medium mb-1">Fields at Risk</p>
          <p className="text-2xl font-semibold text-gray-900">2</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Coverage</p>
          <p className="text-2xl font-semibold text-gray-900">655<span className="text-sm text-gray-500 font-normal ml-1">ha</span></p>
        </div>
        
        {/* Add Field Card */}
        <button className="bg-gray-50/50 p-4 rounded-2xl border-2 border-gray-200 border-dashed hover:border-green-500 hover:bg-green-50/30 shadow-sm flex flex-col items-center justify-center transition-all group min-h-[90px]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all shadow-sm mb-1.5">
            <Plus size={18} />
          </div>
          <span className="text-sm font-semibold text-gray-600 group-hover:text-green-700 transition-colors">Add New Field</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
          placeholder="Search fields by name or crop type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="absolute inset-y-0 right-1.5 my-1.5 px-2.5 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Filter options"
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-3 xl:gap-3">
        {filteredFields.map((field) => (
          <div key={field.id} className="bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
            
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100 flex items-start bg-gray-50/50">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm bg-gray-100">
                  <img src={field.image} alt={field.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                    {field.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-medium">
                    <span className="flex items-center gap-1"><Leaf size={12}/> {field.crop}</span>
                    <span>•</span>
                    <span>{field.area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body - Metrics */}
            <div className="p-3 flex-1 flex flex-col gap-4">
              
              {/* Health Index */}
              <div>
                <div className="flex gap-1.5 items-end mb-2">
                  <span className="text-xs font-semibold text-gray-500 gap-1.5 uppercase tracking-widest">
                    <Activity size={14} />
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{field.health}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-2 rounded-full ${getHealthColor(field.health)}`} style={{ width: `${field.health}%` }}></div>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500 font-medium mb-1 block flex items-center gap-1">
                    <Droplets size={12} className="text-gray-500" /> Moisture
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{field.moisture}%</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500 font-medium mb-1 block flex items-center gap-1">
                    <AlertTriangle size={12} className={field.disease !== 'None' ? 'text-gray-500' : 'text-gray-500'} /> Active Disease
                  </span>
                  <span className={`text-sm truncate block ${field.disease !== 'None' ? 'text-red-700' : 'text-gray-900'}`} title={field.disease}>
                    {field.disease}
                  </span>
                </div>
              </div>

              {/* Stage notes (if any) */}
              {field.stage && (
                <div className="text-[11px] text-gray-500 flex justify-end items-center bg-white mt-auto pt-1">
                  <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {field.stage}
                  </span>
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="border-t border-gray-100 p-3 bg-gray-50/50 grid grid-cols-2 gap-2 items-center">
              <button className="w-full py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <Scan size={14} /> Run AI Scan
              </button>
              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 font-medium w-full h-full">
                Last scan: {field.lastScan}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}