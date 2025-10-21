import * as SecureStore from 'expo-secure-store';
import { api } from './api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  name: string;
  password: string;
};

type AuthResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
  token: string;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      await this.setAuthToken(response.token);
      await this.setUser(response.user);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      await this.setAuthToken(response.token);
      await this.setUser(response.user);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      api.removeAuthToken();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getAuthToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  async setAuthToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      api.setAuthToken(token);
    } catch (error) {
      console.error('Error setting auth token:', error);
      throw error;
    }
  },

  async getUser(): Promise<any> {
    try {
      const userString = await SecureStore.getItemAsync(USER_KEY);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async setUser(user: any): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user:', error);
      throw error;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  },
};
