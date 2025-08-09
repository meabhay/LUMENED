import { useDispatch, useSelector } from 'react-redux';
import {
  setFeatureLoading,
  setOperationLoading,
  setLoadingMessage,
  setLoadingProgress,
  clearAllLoading,
  setBulkOperationsLoading,
  resetFeatureLoading,
  selectFeatureLoading,
  selectOperationLoading,
  selectLoadingMessage,
  selectLoadingProgress,
  selectIsAnyLoading,
} from '../slices/loadingSlice';

/**
 * Custom hook for unified loading state management
 * Provides easy-to-use methods for managing loading states throughout the app
 */
const useLoading = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  // Feature loading methods
  const setAuthLoading = (isLoading) => 
    dispatch(setFeatureLoading({ feature: 'auth', isLoading }));
  
  const setProfileLoading = (isLoading) => 
    dispatch(setFeatureLoading({ feature: 'profile', isLoading }));
  
  const setCourseLoading = (isLoading) => 
    dispatch(setFeatureLoading({ feature: 'course', isLoading }));
  
  const setPaymentLoading = (isLoading) => 
    dispatch(setFeatureLoading({ feature: 'payment', isLoading }));
  
  const setUploadLoading = (isLoading) => 
    dispatch(setFeatureLoading({ feature: 'upload', isLoading }));

  // Operation loading methods
  const setLoginLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'login', isLoading }));
  
  const setSignupLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'signup', isLoading }));
  
  const setLogoutLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'logout', isLoading }));
  
  const setResetPasswordLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'resetPassword', isLoading }));
  
  const setVerifyEmailLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'verifyEmail', isLoading }));
  
  const setUpdateProfileLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'updateProfile', isLoading }));
  
  const setUpdatePasswordLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'updatePassword', isLoading }));
  
  const setUploadProfilePictureLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'uploadProfilePicture', isLoading }));
  
  const setCreateCourseLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'createCourse', isLoading }));
  
  const setUpdateCourseLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'updateCourse', isLoading }));
  
  const setDeleteCourseLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'deleteCourse', isLoading }));
  
  const setBuyCourseLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'buyCourse', isLoading }));
  
  const setUploadVideoLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'uploadVideo', isLoading }));
  
  const setDeleteVideoLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'deleteVideo', isLoading }));
  
  const setFetchCoursesLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'fetchCourses', isLoading }));
  
  const setFetchCategoriesLoading = (isLoading) => 
    dispatch(setOperationLoading({ operation: 'fetchCategories', isLoading }));

  // Generic methods
  const setFeatureLoadingState = (feature, isLoading) => 
    dispatch(setFeatureLoading({ feature, isLoading }));
  
  const setOperationLoadingState = (operation, isLoading) => 
    dispatch(setOperationLoading({ operation, isLoading }));
  
  const setMessage = (key, message) => 
    dispatch(setLoadingMessage({ key, message }));
  
  const setProgress = (key, progress) => 
    dispatch(setLoadingProgress({ key, progress }));
  
  const clearMessage = (key) => 
    dispatch(setLoadingMessage({ key, message: null }));
  
  const clearProgress = (key) => 
    dispatch(setLoadingProgress({ key, progress: null }));
  
  const clearAll = () => 
    dispatch(clearAllLoading());
  
  const setBulkOperations = (operations, isLoading) => 
    dispatch(setBulkOperationsLoading({ operations, isLoading }));
  
  const resetFeature = (feature) => 
    dispatch(resetFeatureLoading({ feature }));

  // Selector methods
  const getFeatureLoading = (feature) => 
    useSelector((state) => selectFeatureLoading(state, feature));
  
  const getOperationLoading = (operation) => 
    useSelector((state) => selectOperationLoading(state, operation));
  
  const getMessage = (key) => 
    useSelector((state) => selectLoadingMessage(state, key));
  
  const getProgress = (key) => 
    useSelector((state) => selectLoadingProgress(state, key));
  
  const isAnyLoading = useSelector(selectIsAnyLoading);

  // Async operation wrapper
  const withLoading = async (operation, asyncFunction, options = {}) => {
    const {
      successMessage = '',
      errorMessage = 'Operation failed',
      progressKey = null,
      messageKey = operation
    } = options;

    try {
      setOperationLoadingState(operation, true);
      if (successMessage) {
        setMessage(messageKey, `${operation} in progress...`);
      }

      const result = await asyncFunction((progress) => {
        if (progressKey && typeof progress === 'number') {
          setProgress(progressKey, progress);
        }
      });

      if (successMessage) {
        setMessage(messageKey, successMessage);
        setTimeout(() => clearMessage(messageKey), 3000);
      }

      return result;
    } catch (error) {
      setMessage(messageKey, errorMessage);
      setTimeout(() => clearMessage(messageKey), 5000);
      throw error;
    } finally {
      setOperationLoadingState(operation, false);
      if (progressKey) {
        clearProgress(progressKey);
      }
    }
  };

  return {
    // State
    loading,
    isAnyLoading,
    
    // Feature loading methods
    setAuthLoading,
    setProfileLoading,
    setCourseLoading,
    setPaymentLoading,
    setUploadLoading,
    
    // Operation loading methods
    setLoginLoading,
    setSignupLoading,
    setLogoutLoading,
    setResetPasswordLoading,
    setVerifyEmailLoading,
    setUpdateProfileLoading,
    setUpdatePasswordLoading,
    setUploadProfilePictureLoading,
    setCreateCourseLoading,
    setUpdateCourseLoading,
    setDeleteCourseLoading,
    setBuyCourseLoading,
    setUploadVideoLoading,
    setDeleteVideoLoading,
    setFetchCoursesLoading,
    setFetchCategoriesLoading,
    
    // Generic methods
    setFeatureLoadingState,
    setOperationLoadingState,
    setMessage,
    setProgress,
    clearMessage,
    clearProgress,
    clearAll,
    setBulkOperations,
    resetFeature,
    
    // Selectors
    getFeatureLoading,
    getOperationLoading,
    getMessage,
    getProgress,
    
    // Async wrapper
    withLoading,
  };
};

export default useLoading;
