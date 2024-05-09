import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nmr.book-library-app',
  appName: 'Book library',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
      smallIcon: "res://drawable/notification",
    },
  },
};

export default config;
