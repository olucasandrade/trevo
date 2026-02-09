/**
 * Theme Definitions
 *
 * Pre-built themes with semantic color tokens for consistent theming across the app.
 * Each theme defines colors for backgrounds, text, borders, accents, and UI elements.
 */

export interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Border colors
  borderPrimary: string;
  borderSecondary: string;
  borderFocus: string;

  // Accent colors
  accentPrimary: string;
  accentPrimaryHover: string;
  accentSecondary: string;

  // Status colors
  success: string;
  successBg: string;
  error: string;
  errorBg: string;
  warning: string;
  warningBg: string;
  info: string;
  infoBg: string;

  // UI element colors
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;

  // Scrollbar
  scrollbarThumb: string;
  scrollbarTrack: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

/**
 * Dark Pro Theme (Default)
 * A refined dark theme with deep blacks and purple accents
 */
export const darkProTheme: Theme = {
  id: 'dark-pro',
  name: 'Dark Pro',
  colors: {
    // Backgrounds
    bgPrimary: '#0a0a0a',
    bgSecondary: '#111827',
    bgTertiary: '#1f2937',
    bgElevated: '#1f2937',

    // Text
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    textInverse: '#0a0a0a',

    // Borders
    borderPrimary: '#374151',
    borderSecondary: '#4b5563',
    borderFocus: '#a855f7',

    // Accents
    accentPrimary: '#a855f7',
    accentPrimaryHover: '#9333ea',
    accentSecondary: '#7e22ce',

    // Status
    success: '#10b981',
    successBg: '#064e3b',
    error: '#ef4444',
    errorBg: '#7f1d1d',
    warning: '#f59e0b',
    warningBg: '#78350f',
    info: '#3b82f6',
    infoBg: '#1e3a8a',

    // UI elements
    inputBg: '#1f2937',
    inputBorder: '#374151',
    inputFocus: '#a855f7',
    buttonBg: '#a855f7',
    buttonHover: '#9333ea',
    buttonText: '#ffffff',

    // Scrollbar
    scrollbarThumb: '#4b5563',
    scrollbarTrack: '#1f2937',

    // Shadows
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
};

/**
 * Nord Theme
 * Inspired by the Nord color palette - calm blues and grays
 */
export const nordTheme: Theme = {
  id: 'nord',
  name: 'Nord',
  colors: {
    // Backgrounds
    bgPrimary: '#2e3440',
    bgSecondary: '#3b4252',
    bgTertiary: '#434c5e',
    bgElevated: '#4c566a',

    // Text
    textPrimary: '#eceff4',
    textSecondary: '#d8dee9',
    textTertiary: '#88c0d0',
    textInverse: '#2e3440',

    // Borders
    borderPrimary: '#4c566a',
    borderSecondary: '#5e81ac',
    borderFocus: '#88c0d0',

    // Accents
    accentPrimary: '#88c0d0',
    accentPrimaryHover: '#81a1c1',
    accentSecondary: '#5e81ac',

    // Status
    success: '#a3be8c',
    successBg: '#3b4f3f',
    error: '#bf616a',
    errorBg: '#5c3a3f',
    warning: '#ebcb8b',
    warningBg: '#5f4f3f',
    info: '#5e81ac',
    infoBg: '#3b4560',

    // UI elements
    inputBg: '#3b4252',
    inputBorder: '#4c566a',
    inputFocus: '#88c0d0',
    buttonBg: '#88c0d0',
    buttonHover: '#81a1c1',
    buttonText: '#2e3440',

    // Scrollbar
    scrollbarThumb: '#4c566a',
    scrollbarTrack: '#3b4252',

    // Shadows
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
  },
};

/**
 * Dracula Theme
 * Vibrant purples and high contrast
 */
export const draculaTheme: Theme = {
  id: 'dracula',
  name: 'Dracula',
  colors: {
    // Backgrounds
    bgPrimary: '#282a36',
    bgSecondary: '#21222c',
    bgTertiary: '#343746',
    bgElevated: '#44475a',

    // Text
    textPrimary: '#f8f8f2',
    textSecondary: '#f8f8f2',
    textTertiary: '#6272a4',
    textInverse: '#282a36',

    // Borders
    borderPrimary: '#44475a',
    borderSecondary: '#6272a4',
    borderFocus: '#bd93f9',

    // Accents
    accentPrimary: '#bd93f9',
    accentPrimaryHover: '#9e6fbf',
    accentSecondary: '#6e46a8',

    // Status
    success: '#50fa7b',
    successBg: '#2a3f31',
    error: '#ff5555',
    errorBg: '#5f2a2a',
    warning: '#ffb86c',
    warningBg: '#5f4a2a',
    info: '#8be9fd',
    infoBg: '#2a4f5f',

    // UI elements
    inputBg: '#343746',
    inputBorder: '#44475a',
    inputFocus: '#bd93f9',
    buttonBg: '#bd93f9',
    buttonHover: '#9e6fbf',
    buttonText: '#282a36',

    // Scrollbar
    scrollbarThumb: '#6272a4',
    scrollbarTrack: '#21222c',

    // Shadows
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
};

/**
 * Monokai Theme
 * Warm dark theme with orange/yellow accents
 */
export const monokaiTheme: Theme = {
  id: 'monokai',
  name: 'Monokai',
  colors: {
    // Backgrounds
    bgPrimary: '#272822',
    bgSecondary: '#1e1f1c',
    bgTertiary: '#3e3d32',
    bgElevated: '#49483e',

    // Text
    textPrimary: '#f8f8f2',
    textSecondary: '#f8f8f2',
    textTertiary: '#75715e',
    textInverse: '#272822',

    // Borders
    borderPrimary: '#49483e',
    borderSecondary: '#75715e',
    borderFocus: '#fd971f',

    // Accents
    accentPrimary: '#fd971f',
    accentPrimaryHover: '#e8860b',
    accentSecondary: '#e6db74',

    // Status
    success: '#a6e22e',
    successBg: '#3a4f2a',
    error: '#f92672',
    errorBg: '#5f2a3a',
    warning: '#e6db74',
    warningBg: '#5f5a2a',
    info: '#66d9ef',
    infoBg: '#2a4f5f',

    // UI elements
    inputBg: '#3e3d32',
    inputBorder: '#49483e',
    inputFocus: '#fd971f',
    buttonBg: '#fd971f',
    buttonHover: '#e8860b',
    buttonText: '#272822',

    // Scrollbar
    scrollbarThumb: '#75715e',
    scrollbarTrack: '#1e1f1c',

    // Shadows
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
};

/**
 * Tokyo Night Theme
 * Modern dark theme with blue accents
 */
export const tokyoNightTheme: Theme = {
  id: 'tokyo-night',
  name: 'Tokyo Night',
  colors: {
    // Backgrounds
    bgPrimary: '#1a1b26',
    bgSecondary: '#16161e',
    bgTertiary: '#24283b',
    bgElevated: '#292e42',

    // Text
    textPrimary: '#c0caf5',
    textSecondary: '#a9b1d6',
    textTertiary: '#565f89',
    textInverse: '#1a1b26',

    // Borders
    borderPrimary: '#292e42',
    borderSecondary: '#3b4261',
    borderFocus: '#7aa2f7',

    // Accents
    accentPrimary: '#7aa2f7',
    accentPrimaryHover: '#6090e7',
    accentSecondary: '#bb9af7',

    // Status
    success: '#9ece6a',
    successBg: '#3a4f2a',
    error: '#f7768e',
    errorBg: '#5f2a3a',
    warning: '#e0af68',
    warningBg: '#5f4a2a',
    info: '#7dcfff',
    infoBg: '#2a4f5f',

    // UI elements
    inputBg: '#24283b',
    inputBorder: '#292e42',
    inputFocus: '#7aa2f7',
    buttonBg: '#7aa2f7',
    buttonHover: '#6090e7',
    buttonText: '#1a1b26',

    // Scrollbar
    scrollbarThumb: '#3b4261',
    scrollbarTrack: '#16161e',

    // Shadows
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
};

/**
 * All available themes
 */
export const themes: Theme[] = [
  darkProTheme,
  nordTheme,
  draculaTheme,
  monokaiTheme,
  tokyoNightTheme,
];

/**
 * Get theme by ID
 */
export function getThemeById(id: string): Theme {
  return themes.find(theme => theme.id === id) || darkProTheme;
}

/**
 * Default theme
 */
export const defaultTheme = darkProTheme;
