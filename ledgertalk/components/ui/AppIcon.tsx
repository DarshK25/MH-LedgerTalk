import React from 'react';
import {
  Building2,
  Pencil,
  Bell,
  Mic,
  Link,
  ShieldCheck,
  Download,
  Plus,
  X,
  FileText,
  Receipt,
  Banknote,
  IndianRupee,
  BarChart3,
  PieChart,
  CloudUpload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Filter,
  ChevronDown,
  ChevronUp,
  Square,
  MessageSquare,
  Play,
  Lightbulb,
  Table,
  Code,
  Settings,
  MinusCircle,
  Mail,
  Smartphone,
  Volume2,
  File,
  LucideIcon,
  Users,
  Menu,
  Sparkles
} from 'lucide-react';

export type IconName =
  | 'BuildingOfficeIcon'
  | 'PencilIcon'
  | 'BellIcon'
  | 'MicrophoneIcon'
  | 'LinkIcon'
  | 'ShieldCheckIcon'
  | 'ArrowDownTrayIcon'
  | 'PlusIcon'
  | 'XMarkIcon'
  | 'DocumentTextIcon'
  | 'ReceiptPercentIcon'
  | 'BanknotesIcon'
  | 'CurrencyRupeeIcon'
  | 'ChartBarIcon'
  | 'ChartPieIcon'
  | 'CloudArrowUpIcon'
  | 'ArrowPathIcon'
  | 'CheckCircleIcon'
  | 'ExclamationTriangleIcon'
  | 'FunnelIcon'
  | 'ChevronDownIcon'
  | 'ChevronUpIcon'
  | 'StopIcon'
  | 'ChatBubbleLeftIcon'
  | 'PlayIcon'
  | 'LightBulbIcon'
  | 'TableCellsIcon'
  | 'CodeBracketIcon'
  | 'Cog6ToothIcon'
  | 'MinusCircleIcon'
  | 'EnvelopeIcon'
  | 'DevicePhoneMobileIcon'
  | 'SpeakerWaveIcon'
  | 'DocumentIcon'
  | 'UsersIcon'
  | 'MenuIcon'
  | 'SparklesIcon';

const iconMap: Record<string, LucideIcon> = {
  BuildingOfficeIcon: Building2,
  PencilIcon: Pencil,
  BellIcon: Bell,
  MicrophoneIcon: Mic,
  LinkIcon: Link,
  ShieldCheckIcon: ShieldCheck,
  ArrowDownTrayIcon: Download,
  PlusIcon: Plus,
  XMarkIcon: X,
  DocumentTextIcon: FileText,
  ReceiptPercentIcon: Receipt,
  BanknotesIcon: Banknote,
  CurrencyRupeeIcon: IndianRupee,
  ChartBarIcon: BarChart3,
  ChartPieIcon: PieChart,
  CloudArrowUpIcon: CloudUpload,
  ArrowPathIcon: RefreshCw,
  CheckCircleIcon: CheckCircle2,
  ExclamationTriangleIcon: AlertTriangle,
  FunnelIcon: Filter,
  ChevronDownIcon: ChevronDown,
  ChevronUpIcon: ChevronUp,
  StopIcon: Square,
  ChatBubbleLeftIcon: MessageSquare,
  PlayIcon: Play,
  LightBulbIcon: Lightbulb,
  TableCellsIcon: Table,
  CodeBracketIcon: Code,
  Cog6ToothIcon: Settings,
  MinusCircleIcon: MinusCircle,
  EnvelopeIcon: Mail,
  DevicePhoneMobileIcon: Smartphone,
  SpeakerWaveIcon: Volume2,
  DocumentIcon: File,
  UsersIcon: Users,
  MenuIcon: Menu,
  SparklesIcon: Sparkles
};

interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ name, size = 24, className }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default AppIcon;
