import React from 'react';

const UploadProgress = ({ progress = 0, fileName = "", isUploading = false }) => {
  if (!isUploading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-richblack-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-richblack-5 mb-4">
            Uploading File
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-richblack-200 mb-2 truncate">
              {fileName}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-richblack-700 rounded-full h-2">
              <div
                className="bg-yellow-50 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-richblack-300 mt-2">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Spinner */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-50"></div>
          </div>
          
          <p className="text-xs text-richblack-400 mt-2">
            This may take a few minutes for large files...
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
