import { Upload, AlertCircle } from 'lucide-react';

const DiseaseDetection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Early Disease Detection</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Leaf Image</h3>
          <div className="border-2 border-dashed border-green-200 rounded-xl p-8 text-center bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer">
            <Upload className="mx-auto text-green-500 mb-4" size={40} />
            <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">JPG, PNG, or WEBP (Max 5MB)</p>
            <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Analyze Image
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Analysis Report</h3>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-red-800">Northern Corn Leaf Blight detected</h4>
                <p className="text-sm text-red-600 mt-1">Confidence Score: 94.2%</p>
              </div>
            </div>
          </div>
          
          <h4 className="font-semibold text-gray-800 mb-2">Recommended Treatment</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Apply foliar fungicides containing strobilurins or triazoles immediately.</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Ensure proper weed management to increase airflow in the canopy.</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>For next season, consider planting NCLB-resistant corn hybrids.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;