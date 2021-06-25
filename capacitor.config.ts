import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app.searchrepos',
  appName: 'Search repos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      style: "dark",
    },
  },
};

export default config;
