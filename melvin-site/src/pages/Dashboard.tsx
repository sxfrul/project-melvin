import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { AlertTriangle, Droplets, Scan, Wind, Activity, TrendingDown, MapPin, Layers } from "lucide-react";


// --- Mock Data ---

const yieldData = [
  { month: "Jan", yield: 45 },
  { month: "Feb", yield: 52 },
  { month: "Mar", yield: 61 },
  { month: "Apr", yield: 70 },
  { month: "May", yield: 75 },
  { month: "Jun", yield: 82 },
];

const aiScanResults = [
  { name: "Healthy", value: 142, color: "#10b981" },
  { name: "Treatable (Early)", value: 28, color: "#f59e0b" },
  { name: "Critical", value: 7, color: "#ef4444" },
];

const affectedFieldsData = [
  { field: "Field B-1", disease: "Northern Corn Leaf Blight", severity: "Critical", affectedArea: "32%", estYieldLoss: "15%" },
  { field: "Field A-2", disease: "Rust", severity: "Moderate", affectedArea: "18%", estYieldLoss: "6%" },
  { field: "Field C-4", disease: "Powdery Mildew", severity: "Low", affectedArea: "5%", estYieldLoss: "1%" },
];

const diseaseRiskData = [
  { stage: "Seedling", risk: 20 },
  { stage: "Vegetative", risk: 45 },
  { stage: "Flowering", risk: 85 },
  { stage: "Fruiting", risk: 60 },
  { stage: "Mature", risk: 15 },
];

export default function Dashboard() {
  return (
    <div className="w-full pb-6 lg:pb-0">
      
      {/* Page Header & Climate Widget */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-4 lg:mb-6 gap-4 lg:gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">Actionable insights for your fields</p>
        </div>

        {/* Localized Weather Widget */}
        <div className="flex items-center space-x-4 lg:space-x-4 bg-white rounded-lg p-3 lg:p-4 border border-gray-200/60 shadow-sm overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-900 leading-tight">Kuala Lumpur, MY</p>
              <p className="text-[11px] lg:text-xs text-gray-500 mt-0.5">Scattered Thunderstorms</p>
            </div>
          </div>
          <div className="h-8 lg:h-10 w-px bg-gray-200 flex-shrink-0"></div>
          <div className="flex space-x-4 lg:space-x-5 pr-2 flex-shrink-0">
            <div>
              <p className="text-[11px] lg:text-xs text-gray-500 mb-0.5">Temp</p>
              <p className="text-xs lg:text-sm font-semibold text-gray-900">32°C</p>
            </div>
            <div>
              <p className="text-[11px] lg:text-xs text-gray-500 mb-0.5">Humidity</p>
              <p className="text-xs lg:text-sm font-semibold text-gray-900">78%</p>
            </div>
            <div>
              <p className="text-[11px] lg:text-xs text-gray-500 mb-0.5">Wind</p>
              <p className="text-xs lg:text-sm font-semibold text-gray-900 flex items-center gap-1">
                <Wind size={12}/> 14 km/h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Metrics Cards */}
      <div className="-mr-4 pr-4 sm:-mr-6 sm:pr-6 md:-mr-8 md:pr-8 lg:-mr-10 lg:pr-10 xl:mr-0 xl:pr-0 grid grid-rows-2 grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] md:flex md:flex-row xl:grid xl:grid-rows-1 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-2 overflow-x-auto snap-x snap-mandatory pb-2 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] mb-4 lg:mb-3">
        
        {/* Metric 1 */}
        <div className="snap-center md:snap-start md:shrink-0 md:w-[280px] lg:w-[320px] xl:w-auto xl:shrink rounded-lg border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">AI Plant Scans (30d)</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scan className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-700 tracking-tight">177</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">↑ 24 scans this week</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="snap-center md:snap-start md:shrink-0 md:w-[280px] lg:w-[320px] xl:w-auto xl:shrink rounded-lg border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Avg Soil Moisture</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Droplets className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-700 tracking-tight">64%</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">Optimal range</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="snap-center md:snap-start md:shrink-0 md:w-[280px] lg:w-[320px] xl:w-auto xl:shrink rounded-lg border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Crop Health Index</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-700 tracking-tight">88/100</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">↑ 2 pts since last scan</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="snap-center md:snap-start md:shrink-0 md:w-[280px] lg:w-[320px] xl:w-auto xl:shrink rounded-lg border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Est. Yield Loss</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-orange-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-700 tracking-tight">8.4%</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">Across all affected fields</p>
          </div>
        </div>

      </div>

      {/* Top Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3 items-stretch">
        
        {/* Yield Area Chart */}
        <div className="lg:col-span-2 rounded-lg border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 flex flex-col">
          <div className="mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Historical Yield Tracking</h3>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Measured in tons per hectare</p>
          </div>
          <div className="flex-1 min-h-[250px] lg:min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} tickMargin={10} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' 
                  }} 
                />
                <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Scan Results Pie Chart */}
        <div className="lg:col-span-1 rounded-lg border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 flex flex-col">
          <div className="mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">AI Scan Results</h3>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Distribution of latest field scans</p>
          </div>
          <div className="flex-1 min-h-[200px] lg:min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aiScanResults}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {aiScanResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex justify-center flex-wrap gap-3 lg:gap-4 mt-6">
            {aiScanResults.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[11px] lg:text-xs text-gray-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Extended Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 mt-4 lg:mt-3">
        
        {/* Affected Fields Table */}
        <div className="rounded-lg border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 flex flex-col">
          <div className="mb-4 lg:mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Affected Fields Status</h3>
              <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Severity and yield impact per field</p>
            </div>
            <MapPin className="text-gray-400 w-5 h-5" />
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-xs font-semibold text-gray-500 pr-4">Field</th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 pr-4">Disease Detected</th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 pr-4">Severity</th>
                  <th className="pb-3 text-xs font-semibold text-gray-500 text-right">Yield Loss</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {affectedFieldsData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 font-medium text-gray-900 pr-4">{row.field}</td>
                    <td className="py-3 text-gray-600 pr-4">{row.disease}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        row.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        row.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-3 text-right text-red-600 font-medium">{row.estYieldLoss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disease Risk per Stage */}
        <div className="rounded-lg border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 flex flex-col">
          <div className="mb-4 lg:mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Disease Risk by Stage</h3>
              <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Vulnerability index across crop lifecycle</p>
            </div>
            <Layers className="text-gray-400 w-5 h-5" />
          </div>
          <div className="h-56 lg:h-full min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="stage" stroke="#9ca3af" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} tickMargin={10} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} 
                />
                <Bar dataKey="risk" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Heatmap of Affected Leaf Area */}
      <div className="mt-4 lg:mt-3 rounded-lg border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 mb-8">
        <div className="mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Leaf Area Heatmap</h3>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Spatial distribution of infection on recent visual scans</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-stretch bg-gray-50 p-4 rounded-xl border border-gray-100">
          
          {/* Realistic Heatmap Mockup Container */}
          <div className="relative w-full md:w-1/2 min-h-[200px] md:min-h-0 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1618507763251-9ea0a27ef29e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Hotspots */}
            <div className="absolute top-[15%] left-[20%] w-36 h-36 bg-[radial-gradient(circle,rgba(239,68,68,0.9)_10%,rgba(245,158,11,0.7)_40%,rgba(34,197,94,0.4)_70%,transparent_100%)] blur-[2px] rounded-full mix-blend-screen"></div>
            <div className="absolute top-[40%] right-[15%] w-52 h-52 bg-[radial-gradient(circle,rgba(239,68,68,0.8)_15%,rgba(245,158,11,0.6)_45%,rgba(59,130,246,0.3)_80%,transparent_100%)] blur-[4px] rounded-full mix-blend-screen"></div>
            <div className="absolute bottom-[15%] left-[45%] w-28 h-28 bg-[radial-gradient(circle,rgba(245,158,11,0.8)_20%,rgba(34,197,94,0.5)_60%,transparent_100%)] blur-[2px] rounded-full mix-blend-screen"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            {/* Coordinate Target Markers */}
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
            
            <div className="grid grid-cols-2 gap-1 lg:gap-1 pt-2">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">High Severity</p>
                <p className="font-semibold text-gray-900">12.1%</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Moderate Severity</p>
                <p className="font-semibold text-gray-900">16.3%</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 italic mt-2">
              * Heatmap is generated from the latest visual field imaging. Red zones indicate high deterioration or blight concentrations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}