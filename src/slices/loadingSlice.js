import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Global loading states for different features
  auth: false,
  profile: false,
  course: false,
  payment: false,
  upload: false,
  
  // Specific loading operations
  operations: {
    login: false,
    signup: false,
    logout: false,
    resetPassword: false,
    verifyEmail: false,
    updateProfile: false,
    updatePassword: false,
    uploadProfilePicture: false,
    createCourse: false,
    updateCourse: false,
    deleteCourse: false,
    buyCourse: false,
    uploadVideo: false,
    deleteVideo: false,
    fetchCourses: false,
    fetchCategories: false,
  },

  // Loading messages
  messages: {},
  
  // Loading progress (for file uploads)
  progress: {},
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // Set loading state for a feature
    setFeatureLoading: (state, action) => {
      const { feature, isLoading } = action.payload;
      state[feature] = isLoading;
    },

    // Set loading state for specific operations
    setOperationLoading: (state, action) => {
      const { operation, isLoading } = action.payload;
      state.operations[operation] = isLoading;
    },

    // Set loading message
    setLoadingMessage: (state, action) => {
      const { key, message } = action.payload;
      if (message) {
        state.messages[key] = message;
      } else {
        delete state.messages[key];
      }
    },

    // Set loading progress (for uploads)
    setLoadingProgress: (state, action) => {
      const { key, progress } = action.payload;
      if (progress !== undefined && progress !== null) {
        state.progress[key] = progress;
      } else {
        delete state.progress[key];
      }
    },

    // Clear all loading states
    clearAllLoading: (state) => {
      Object.keys(state).forEach(key => {
        if (typeof state[key] === 'boolean') {
          state[key] = false;
        } else if (typeof state[key] === 'object') {
          Object.keys(state[key]).forEach(subKey => {
            if (typeof state[key][subKey] === 'boolean') {
              state[key][subKey] = false;
            }
          });
        }
      });
      state.messages = {};
      state.progress = {};
    },

    // Bulk set operations loading
    setBulkOperationsLoading: (state, action) => {
      const { operations, isLoading } = action.payload;
      operations.forEach(operation => {
        state.operations[operation] = isLoading;
      });
    },

    // Reset specific feature loading
    resetFeatureLoading: (state, action) => {
      const { feature } = action.payload;
      state[feature] = false;
      // Clear related messages and progress
      delete state.messages[feature];
      delete state.progress[feature];
    },
  },
});

export const {
  setFeatureLoading,
  setOperationLoading,
  setLoadingMessage,
  setLoadingProgress,
  clearAllLoading,
  setBulkOperationsLoading,
  resetFeatureLoading,
} = loadingSlice.actions;

// Selectors
export const selectFeatureLoading = (state, feature) => state.loading[feature] || false;
export const selectOperationLoading = (state, operation) => state.loading.operations[operation] || false;
export const selectLoadingMessage = (state, key) => state.loading.messages[key] || '';
export const selectLoadingProgress = (state, key) => state.loading.progress[key] || 0;
export const selectIsAnyLoading = (state) => {
  // Check if any feature is loading
  const features = ['auth', 'profile', 'course', 'payment', 'upload'];
  const anyFeatureLoading = features.some(feature => state.loading[feature]);
  
  // Check if any operation is loading
  const anyOperationLoading = Object.values(state.loading.operations).some(loading => loading);
  
  return anyFeatureLoading || anyOperationLoading;
};

export default loadingSlice.reducer;
