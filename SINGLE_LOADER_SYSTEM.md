# Single Loader System Implementation

## Problem
The application was showing multiple loaders at the same time, creating a poor user experience with overlapping loading indicators and confusing visual feedback.

## Solution
Implemented a centralized, priority-based loading system that ensures only one loader is displayed at a time based on the importance and context of the operation.

## Architecture

### 1. Global Loader Hook (`useGlobalLoader.js`)
- **Purpose**: Manages loading state priorities and determines which loader should be shown
- **Features**:
  - Priority-based system (higher numbers = higher priority)
  - Supports different loading types (auth, profile, course, payment, etc.)
  - Determines whether to show fullscreen or inline loaders
  - Provides progress tracking for upload operations
  - Handles loading messages and visual feedback

### 2. Global Loader Component (`GlobalLoader.jsx`)
- **Purpose**: Single component that renders the appropriate loader based on global state
- **Features**:
  - Different loader variants (spinner, dots, bars, pulse)
  - Size and color customization based on loading type
  - Fullscreen overlay for critical operations
  - Progress bar for upload operations
  - Context-aware messaging

### 3. Loading Priorities
```javascript
// Authentication has highest priority (90-100)
auth: 100
login: 95
signup: 95
logout: 90
resetPassword: 90
verifyEmail: 90

// Profile operations (80-85)
profile: 80
updateProfile: 85
updatePassword: 85
uploadProfilePicture: 85

// Course operations (65-75)
course: 70
createCourse: 75
updateCourse: 75
deleteCourse: 75
fetchCourses: 65

// Payment operations (80-85)
payment: 80
buyCourse: 85

// Upload operations (60-65)
upload: 60
uploadVideo: 65
deleteVideo: 65

// Category fetching (lowest priority - 50)
fetchCategories: 50
```

## Implementation Details

### 1. Updated Components
- **App.js**: Added `<GlobalLoader />` component at the root level
- **Template.jsx**: Removed individual loader logic, relies on global system
- **Dashboard.jsx**: Removed individual loading checks, relies on global system
- **Navbar.jsx**: Updated to use global loading for category fetching

### 2. Updated API Services
- **authAPI.js**: 
  - Updated `sendOtp()`, `login()` functions to use global loading system
  - Added proper loading messages and state management
  - Maintained backward compatibility with existing loading states

### 3. Loading States Management
- **Feature Loading**: Broad categories (auth, profile, course, etc.)
- **Operation Loading**: Specific actions (login, signup, uploadVideo, etc.)
- **Loading Messages**: Context-aware messages for user feedback
- **Loading Progress**: Progress tracking for upload operations

## Usage Examples

### For API Operations
```javascript
// In API service functions
dispatch(setFeatureLoading({ feature: 'auth', isLoading: true }));
dispatch(setOperationLoading({ operation: 'login', isLoading: true }));
dispatch(setLoadingMessage({ key: 'login', message: 'Signing you in...' }));

// ... API call ...

// Clear loading states
dispatch(setFeatureLoading({ feature: 'auth', isLoading: false }));
dispatch(setOperationLoading({ operation: 'login', isLoading: false }));
```

### For Components
```javascript
// Using the useLoading hook
const { setLoginLoading, getOperationLoading } = useLoading();
const isLoginLoading = getOperationLoading('login');

// Set loading state
setLoginLoading(true);

// ... perform operation ...

// Clear loading state
setLoginLoading(false);
```

## Benefits

1. **Single Loader Display**: No more multiple overlapping loaders
2. **Priority System**: Important operations (auth) take precedence over less critical ones (category fetching)
3. **Context-Aware**: Different loader styles and messages based on operation type
4. **Better UX**: Consistent, predictable loading behavior across the application
5. **Maintainable**: Centralized loading logic makes it easier to manage and update
6. **Flexible**: Easy to add new loading states and priorities as needed

## Backward Compatibility

- Existing loading states in `authSlice` and `profileSlice` are maintained
- Global loader system works alongside existing implementations
- Gradual migration path - can update components one by one

## Future Improvements

1. **Progressive Migration**: Update remaining components to use global loading system
2. **Loading Analytics**: Track which operations are taking too long
3. **Smart Batching**: Batch related operations to reduce loading frequency
4. **Skeleton Loading**: Add skeleton loaders for specific content types
5. **Error State Integration**: Better error handling within the loading system

## Files Changed

1. `/src/hooks/useGlobalLoader.js` - New global loader management hook
2. `/src/components/common/GlobalLoader.jsx` - New global loader component
3. `/src/App.js` - Added GlobalLoader component
4. `/src/components/core/Auth/Template.jsx` - Removed individual loader
5. `/src/pages/Dashboard.jsx` - Removed individual loading checks
6. `/src/components/common/Navbar.jsx` - Updated to use global loading
7. `/src/services/operations/authAPI.js` - Updated to use global loading system

This implementation ensures a consistent, user-friendly loading experience throughout the application while maintaining flexibility for future enhancements.
