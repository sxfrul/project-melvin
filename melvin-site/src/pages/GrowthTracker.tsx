import { Calendar } from 'lucide-react';

const GrowthTracker = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Growth Stages Tracker</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Field A - Winter Wheat</h3>
            <p className="text-sm text-gray-500">Planted: Oct 15, 2025</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-green-600">Est. Harvest: Jul 20, 2026</h3>
            <p className="text-sm text-gray-500 flex items-center justify-end space-x-1 mt-1">
              <Calendar size={14} /> <span>126 Days Remaining</span>
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8 relative">
              <div className="flex items-start space-x-4 pl-12 relative">
                <div className="absolute left-2.5 w-3.5 h-3.5 bg-green-500 rounded-full border-4 border-white shadow"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Germination & Emergence</h4>
                  <p className="text-sm text-gray-500 mb-2">Oct 15 - Nov 5</p>
                  <div className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Completed</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 pl-12 relative">
                <div className="absolute left-1.5 w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 w-full">
                  <h4 className="font-semibold text-green-800">Tillering Stage</h4>
                  <p className="text-sm text-green-600 mb-3">Current Stage (Nov - March)</p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-sm font-medium text-gray-800 mb-1">Action Required: Spring Fertilization</p>
                    <p className="text-xs text-gray-600">Apply Nitrogen top-dressing (40-60 lbs/acre) before jointing begins.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 pl-12 relative">
                <div className="absolute left-2.5 w-3.5 h-3.5 bg-gray-300 rounded-full border-4 border-white shadow"></div>
                <div>
                  <h4 className="font-semibold text-gray-500">Stem Extension & Heading</h4>
                  <p className="text-sm text-gray-400">Apr - May</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;