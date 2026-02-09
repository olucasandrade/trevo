'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, defaultTheme, getThemeById } from './themes';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (themeId: string) => void;
  themeId: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'trevo-theme';

/**
 * Inject CSS variables into the document root
 */
function injectCSSVariables(theme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const colors = theme.colors;

  // Background colors
  root.style.setProperty('--color-bg-primary', colors.bgPrimary);
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary);
  root.style.setProperty('--color-bg-tertiary', colors.bgTertiary);
  root.style.setProperty('--color-bg-elevated', colors.bgElevated);

  // Text colors
  root.style.setProperty('--color-text-primary', colors.textPrimary);
  root.style.setProperty('--color-text-secondary', colors.textSecondary);
  root.style.setProperty('--color-text-tertiary', colors.textTertiary);
  root.style.setProperty('--color-text-inverse', colors.textInverse);

  // Border colors
  root.style.setProperty('--color-border-primary', colors.borderPrimary);
  root.style.setProperty('--color-border-secondary', colors.borderSecondary);
  root.style.setProperty('--color-border-focus', colors.borderFocus);

  // Accent colors
  root.style.setProperty('--color-accent-primary', colors.accentPrimary);
  root.style.setProperty('--color-accent-primary-hover', colors.accentPrimaryHover);
  root.style.setProperty('--color-accent-secondary', colors.accentSecondary);

  // Status colors
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-success-bg', colors.successBg);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--color-error-bg', colors.errorBg);
  root.style.setProperty('--color-warning', colors.warning);
  root.style.setProperty('--color-warning-bg', colors.warningBg);
  root.style.setProperty('--color-info', colors.info);
  root.style.setProperty('--color-info-bg', colors.infoBg);

  // UI element colors
  root.style.setProperty('--color-input-bg', colors.inputBg);
  root.style.setProperty('--color-input-border', colors.inputBorder);
  root.style.setProperty('--color-input-focus', colors.inputFocus);
  root.style.setProperty('--color-button-bg', colors.buttonBg);
  root.style.setProperty('--color-button-hover', colors.buttonHover);
  root.style.setProperty('--color-button-text', colors.buttonText);

  // Scrollbar
  root.style.setProperty('--color-scrollbar-thumb', colors.scrollbarThumb);
  root.style.setProperty('--color-scrollbar-track', colors.scrollbarTrack);

  // Shadows
  root.style.setProperty('--shadow-sm', colors.shadowSm);
  root.style.setProperty('--shadow-md', colors.shadowMd);
  root.style.setProperty('--shadow-lg', colors.shadowLg);
}

/**
 * Inject scrollbar styles
 */
function injectScrollbarStyles(theme: Theme) {
  if (typeof document === 'undefined') return;

  // Remove existing style if present
  const existingStyle = document.getElementById('trevo-scrollbar-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create new style element
  const style = document.createElement('style');
  style.id = 'trevo-scrollbar-styles';
  style.textContent = `
    /* Scrollbar styles */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-scrollbar-track);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-scrollbar-thumb);
      border-radius: 6px;
      border: 2px solid var(--color-scrollbar-track);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-border-secondary);
    }

    /* Firefox scrollbar */
    * {
      scrollbar-width: thin;
      scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
    }
  `;
  document.head.appendChild(style);
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultThemeId?: string;
}

export function ThemeProvider({ children, defaultThemeId }: ThemeProviderProps) {
  const [themeId, setThemeIdState] = useState<string>(defaultThemeId || defaultTheme.id);
  const [theme, setThemeState] = useState<Theme>(getThemeById(themeId));

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const loadedTheme = getThemeById(stored);
      setThemeIdState(stored);
      setThemeState(loadedTheme);
      injectCSSVariables(loadedTheme);
      injectScrollbarStyles(loadedTheme);
    } else {
      // Apply default theme
      injectCSSVariables(theme);
      injectScrollbarStyles(theme);
    }
  }, []);

  // Update theme
  const setTheme = (newThemeId: string) => {
    const newTheme = getThemeById(newThemeId);
    setThemeIdState(newThemeId);
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newThemeId);
    injectCSSVariables(newTheme);
    injectScrollbarStyles(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get current theme ID
 */
export function useThemeId() {
  const { themeId } = useTheme();
  return themeId;
}

/**
 * Hook to set theme
 */
export function useSetTheme() {
  const { setTheme } = useTheme();
  return setTheme;
}
