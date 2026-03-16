import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle, Droplets, CloudRain, Scan, Wind, Activity, CheckCircle2 } from "lucide-react";

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

const recentInsights = [
  {
    type: "critical",
    title: "High Risk: Leaf Blight",
    desc: "AI detected Northern Corn Leaf Blight in Field B-1. Confidence: 94%.",
    time: "2 hours ago",
    icon: <AlertTriangle className="text-red-600 w-4 h-4 lg:w-5 lg:h-5" />,
    bg: "bg-red-50",
  },
  {
    type: "weather",
    title: "Heavy Rain Expected",
    desc: "Incoming monsoon rain in Kuala Lumpur. Automated irrigation paused.",
    time: "5 hours ago",
    icon: <CloudRain className="text-blue-600 w-4 h-4 lg:w-5 lg:h-5" />,
    bg: "bg-blue-50",
  },
  {
    type: "success",
    title: "Field A-3 Cleared",
    desc: "Follow-up scan shows successful treatment of early-stage rust.",
    time: "1 day ago",
    icon: <CheckCircle2 className="text-green-600 w-4 h-4 lg:w-5 lg:h-5" />,
    bg: "bg-green-50",
  },
];

export default function Dashboard() {
  return (
    // Scaled down the bottom padding for mobile (was pb-20, now pb-6)
    <div className="w-full pb-6 lg:pb-0">
      
      {/* Page Header & Climate Widget */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-4 lg:mb-8 gap-4 lg:gap-6">
        <div>
          {/* Scaled down header text on mobile */}
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">Actionable insights for your fields</p>
        </div>

        {/* Localized Weather Widget */}
        <div className="flex items-center space-x-4 lg:space-x-6 bg-white rounded-2xl p-3 lg:p-4 border border-gray-200/60 shadow-sm overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
      <div className="grid grid-rows-2 grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] lg:auto-cols-auto lg:grid-rows-1 lg:grid-flow-row lg:grid-cols-4 gap-3 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] mb-4 lg:mb-8">
        
        {/* Metric 1 */}
        <div className="snap-center rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">AI Plant Scans (30d)</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scan className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">177</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">↑ 24 scans this week</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="snap-center rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Actionable AI Alerts</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-red-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">7</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">Requires immediate attention</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="snap-center rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Avg Soil Moisture</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Droplets className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">64%</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">Optimal range (Rain expected)</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="snap-center rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-5 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-xs lg:text-sm font-medium text-gray-500 tracking-tight">Crop Health Index</h3>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">88/100</div>
            <p className="text-[11px] lg:text-xs text-gray-600 mt-1 lg:mt-2 font-medium">↑ 2 points since last treatment</p>
          </div>
        </div>
      </div>

      {/* Charts & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
        
        {/* Yield Area Chart */}
        {/* Scaled down padding and chart height for mobile */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 h-fit">
          <div className="mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Historical Yield Tracking</h3>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1">Measured in tons per hectare</p>
          </div>
          <div className="h-56 lg:h-72 w-full">
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

        {/* Right Column: AI Scan Breakdown & Recent Insights */}
        <div className="flex flex-col gap-4 lg:gap-6">
          
          {/* AI Scan Results Pie Chart */}
          <div className="rounded-2xl border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6">
            <div className="mb-2 lg:mb-4">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">AI Scan Results</h3>
            </div>
            {/* Slightly shorter pie chart container on mobile */}
            <div className="h-40 lg:h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aiScanResults}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
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
            <div className="flex justify-center gap-3 lg:gap-4 mt-2">
              {aiScanResults.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[11px] lg:text-xs text-gray-600 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Insights Feed */}
          <div className="rounded-2xl border border-gray-200/60 bg-white shadow-sm p-4 lg:p-6 flex-1">
            <div className="mb-4 lg:mb-5">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 tracking-tight">Automated Insights</h3>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {recentInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 lg:gap-3">
                  <div className={`mt-0.5 p-1.5 lg:p-2 rounded-xl ${insight.bg}`}>
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="text-xs lg:text-sm font-semibold text-gray-900 leading-tight">{insight.title}</h4>
                    <p className="text-[11px] lg:text-xs text-gray-500 mt-1 leading-relaxed">{insight.desc}</p>
                    <span className="text-[9px] lg:text-[10px] font-medium text-gray-400 mt-1 lg:mt-1.5 block uppercase tracking-wider">{insight.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}