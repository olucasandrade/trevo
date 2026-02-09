// Theme
export { theme } from './theme';

// Theme System
export {
  ThemeProvider,
  useTheme,
  useThemeId,
  useSetTheme,
  themes,
  getThemeById,
  defaultTheme,
} from './theme/index';
export type { Theme, ThemeColors } from './theme/index';

// Re-export commonly used Mantine components for convenience
export {
  ActionIcon,
  Alert,
  Anchor,
  AppShell,
  Avatar,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Checkbox,
  Chip,
  Code,
  ColorSchemeScript,
  Container,
  CopyButton,
  Divider,
  Drawer,
  Flex,
  Grid,
  Group,
  Indicator,
  Input,
  Loader,
  MantineProvider,
  Menu,
  Modal,
  NavLink,
  NumberInput,
  Overlay,
  Paper,
  PasswordInput,
  Radio,
  ScrollArea,
  SegmentedControl,
  Select,
  SimpleGrid,
  Skeleton,
  Space,
  Stack,
  Stepper,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Timeline,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';

// Re-export useful hooks
export {
  useColorScheme,
  useDisclosure,
  useFocusTrap,
  useHotkeys,
  useLocalStorage,
  useMediaQuery,
  useWindowScroll,
} from '@mantine/hooks';

// useMantineColorScheme is from @mantine/core, not hooks
export { useMantineColorScheme } from '@mantine/core';

// Re-export core types
export type {
  ApiResponse,
  Collection,
  Environment,
  EnvironmentVariable,
  HistoryItem,
  KeyValuePair,
  RequestChain,
  RequestConfig,
  RequestFolder,
  SavedRequest,
  SavedRequestsState,
} from '@trevo/core';
