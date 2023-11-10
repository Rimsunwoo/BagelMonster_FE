interface TabPanelProps {
  label: string;
  currentTab: string;
  component: React.ReactNode;
}

export default function TabPanel({ label, currentTab, component }: TabPanelProps) {
  return label === currentTab ? component : null;
}
