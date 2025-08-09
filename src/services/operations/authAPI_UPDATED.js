// Example of how to update authAPI.js to use the new universal loading system
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCourseState } from "../../slices/courseSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { 
  setOperationLoading, 
  setLoadingMessage, 
  setFeatureLoading 
} from "../../slices/loadingSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// EXAMPLE: Updated sendOTP function using universal loading system
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    // Set specific operation loading
    dispatch(setOperationLoading({ operation: 'verifyEmail', isLoading: true }));
    dispatch(setLoadingMessage({ key: 'verifyEmail', message: 'Sending OTP to your email...' }));
    
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      dispatch(setLoadingMessage({ key: 'verifyEmail', message: 'OTP sent! Check your email.' }));
      navigate("/verify-email");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'verifyEmail', message: null }));
      }, 3000);
      
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
      dispatch(setLoadingMessage({ key: 'verifyEmail', message: 'Failed to send OTP. Please try again.' }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'verifyEmail', message: null }));
      }, 5000);
    } finally {
      // Always clear the loading state
      dispatch(setOperationLoading({ operation: 'verifyEmail', isLoading: false }));
    }
  };
}

// EXAMPLE: Updated signUp function using universal loading system
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    // Set both feature and operation loading
    dispatch(setFeatureLoading({ feature: 'auth', isLoading: true }));
    dispatch(setOperationLoading({ operation: 'signup', isLoading: true }));
    dispatch(setLoadingMessage({ key: 'signup', message: 'Creating your account...' }));
    
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      toast.success("Signup Successful");
      dispatch(setLoadingMessage({ key: 'signup', message: 'Account created successfully! Redirecting...' }));
      navigate("/login");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'signup', message: null }));
      }, 3000);
      
    } catch (error) {
      toast.error("Signup Failed");
      dispatch(setLoadingMessage({ key: 'signup', message: 'Account creation failed. Please try again.' }));
      navigate("/signup");
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'signup', message: null }));
      }, 5000);
    } finally {
      // Clear loading states
      dispatch(setFeatureLoading({ feature: 'auth', isLoading: false }));
      dispatch(setOperationLoading({ operation: 'signup', isLoading: false }));
    }
  };
}

// EXAMPLE: Updated login function using universal loading system
export function login(email, password, navigate) {
  return async (dispatch) => {
    // Set multiple loading states
    dispatch(setFeatureLoading({ feature: 'auth', isLoading: true }));
    dispatch(setOperationLoading({ operation: 'login', isLoading: true }));
    dispatch(setLoadingMessage({ key: 'login', message: 'Signing you in...' }));
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      
      dispatch(setUser({ ...response.data.user, image: userImage }));
      dispatch(setLoadingMessage({ key: 'login', message: 'Welcome back! Redirecting to dashboard...' }));
      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'login', message: null }));
      }, 3000);
      
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
      dispatch(setLoadingMessage({ key: 'login', message: 'Login failed. Please check your credentials.' }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'login', message: null }));
      }, 5000);
    } finally {
      // Clear loading states
      dispatch(setFeatureLoading({ feature: 'auth', isLoading: false }));
      dispatch(setOperationLoading({ operation: 'login', isLoading: false }));
    }
  };
}

// EXAMPLE: Updated logout function using universal loading system
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setOperationLoading({ operation: 'logout', isLoading: true }));
    dispatch(setLoadingMessage({ key: 'logout', message: 'Signing you out...' }));
    
    try {
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCourseState());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      toast.success("Logged Out");
      dispatch(setLoadingMessage({ key: 'logout', message: 'Successfully signed out!' }));
      navigate("/");
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'logout', message: null }));
      }, 2000);
      
    } catch (error) {
      toast.error("Could Not Logout");
      dispatch(setLoadingMessage({ key: 'logout', message: 'Logout failed. Please try again.' }));
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'logout', message: null }));
      }, 3000);
    } finally {
      dispatch(setOperationLoading({ operation: 'logout', isLoading: false }));
    }
  };
}

// EXAMPLE: Updated resetPassword function with progress tracking
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setOperationLoading({ operation: 'resetPassword', isLoading: true }));
    dispatch(setLoadingMessage({ key: 'resetPassword', message: 'Resetting your password...' }));
    
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESETPASSWORD RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Successfully");
      dispatch(setLoadingMessage({ key: 'resetPassword', message: 'Password reset successful! Redirecting to login...' }));
      navigate("/login");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'resetPassword', message: null }));
      }, 3000);
      
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error("Failed To Reset Password");
      dispatch(setLoadingMessage({ key: 'resetPassword', message: 'Password reset failed. Please try again.' }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        dispatch(setLoadingMessage({ key: 'resetPassword', message: null }));
      }, 5000);
    } finally {
      dispatch(setOperationLoading({ operation: 'resetPassword', isLoading: false }));
    }
  };
}

/*
HOW TO USE THE NEW UNIVERSAL LOADING SYSTEM:

1. FEATURE LOADING (for broader features):
   dispatch(setFeatureLoading({ feature: 'auth', isLoading: true }));

2. OPERATION LOADING (for specific operations):
   dispatch(setOperationLoading({ operation: 'login', isLoading: true }));

3. LOADING MESSAGES (for user feedback):
   dispatch(setLoadingMessage({ key: 'login', message: 'Signing you in...' }));

4. LOADING PROGRESS (for file uploads):
   dispatch(setLoadingProgress({ key: 'upload', progress: 75 }));

5. IN COMPONENTS, USE THE HOOK:
   import useLoading from '../../../hooks/useLoading';
   const { getOperationLoading, getMessage } = useLoading();
   const isLoginLoading = getOperationLoading('login');
   const loginMessage = getMessage('login');

6. USE THE UNIVERSAL LOADER COMPONENT:
   import Loader from '../common/Loader';
   {isLoginLoading && <Loader variant="spinner" size="medium" text={loginMessage} />}
*/
