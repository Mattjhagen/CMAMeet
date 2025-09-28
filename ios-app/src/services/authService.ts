import { authorize, clearSession, getCredentials } from 'react-native-auth0';
import { auth0Config } from '../config/auth0';
import { userService } from './userService';
import { storageService } from './storageService';

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
}

class AuthService {
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    idToken: null,
    loading: true,
    error: null,
  };

  private listeners: ((state: AuthState) => void)[] = [];

  async initialize(): Promise<void> {
    try {
      // Check for existing session
      const credentials = await getCredentials();
      
      if (credentials) {
        this.authState = {
          ...this.authState,
          isAuthenticated: true,
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          user: credentials.user,
          loading: false,
        };
        
        // Store user data
        await storageService.setUser(credentials.user);
      } else {
        this.authState = {
          ...this.authState,
          loading: false,
        };
      }
      
      this.notifyListeners();
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.authState = {
        ...this.authState,
        loading: false,
        error: 'Failed to initialize authentication',
      };
      this.notifyListeners();
    }
  }

  async login(): Promise<void> {
    try {
      this.authState = { ...this.authState, loading: true, error: null };
      this.notifyListeners();

      const credentials = await authorize({
        scope: 'openid profile email',
        audience: auth0Config.audience,
      });

      if (credentials) {
        this.authState = {
          ...this.authState,
          isAuthenticated: true,
          user: credentials.user,
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          loading: false,
        };

        // Store user data
        await storageService.setUser(credentials.user);
        
        // Sync with backend
        await userService.syncUser(credentials.user);
        
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Login error:', error);
      this.authState = {
        ...this.authState,
        loading: false,
        error: 'Login failed. Please try again.',
      };
      this.notifyListeners();
    }
  }

  async logout(): Promise<void> {
    try {
      await clearSession();
      
      this.authState = {
        isAuthenticated: false,
        user: null,
        accessToken: null,
        idToken: null,
        loading: false,
        error: null,
      };

      // Clear stored data
      await storageService.clearUser();
      
      this.notifyListeners();
    } catch (error) {
      console.error('Logout error:', error);
      this.authState = {
        ...this.authState,
        error: 'Logout failed. Please try again.',
      };
      this.notifyListeners();
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const credentials = await getCredentials();
      
      if (credentials?.accessToken) {
        this.authState = {
          ...this.authState,
          accessToken: credentials.accessToken,
        };
        this.notifyListeners();
        return credentials.accessToken;
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getUser(): User | null {
    return this.authState.user;
  }

  getAccessToken(): string | null {
    return this.authState.accessToken;
  }

  addListener(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Biometric authentication
  async enableBiometric(): Promise<boolean> {
    try {
      // Implementation for biometric authentication
      return true;
    } catch (error) {
      console.error('Biometric enable error:', error);
      return false;
    }
  }

  async authenticateWithBiometric(): Promise<boolean> {
    try {
      // Implementation for biometric authentication
      return true;
    } catch (error) {
      console.error('Biometric auth error:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
