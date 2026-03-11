# React Native Health App

![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-50-000020?style=flat-square&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A cross-platform health tracking mobile application built with React Native and Expo. Features HealthKit (iOS) and Google Fit (Android) integration, offline-first architecture, and biometric authentication.

## Screenshots

<p align="center">
  <img src="assets/screenshots/dashboard.png" width="200" alt="Dashboard" />
  <img src="assets/screenshots/activity.png" width="200" alt="Activity" />
  <img src="assets/screenshots/profile.png" width="200" alt="Profile" />
</p>

## Features

- **Health Data Sync** - HealthKit (iOS) and Google Fit (Android) integration
- **Activity Tracking** - Steps, calories, distance, heart rate
- **Offline First** - Works without internet, syncs when connected
- **Biometric Auth** - Face ID, Touch ID, Fingerprint
- **Push Notifications** - Health reminders and alerts
- **Dark Mode** - System-aware theme switching
- **Accessibility** - VoiceOver and TalkBack support

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.73 + Expo 50 |
| Language | TypeScript |
| State | Zustand + React Query |
| Navigation | React Navigation 6 |
| Storage | MMKV (offline) + Async Storage |
| Health | react-native-health, react-native-google-fit |
| Auth | Expo SecureStore, Expo LocalAuthentication |
| Testing | Jest, React Native Testing Library, Detox |

## Getting Started

### Prerequisites

- Node.js 20+
- Expo CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/marwantech91/react-native-health-app.git
cd react-native-health-app

# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Primitive components
│   │   └── health/        # Health-specific components
│   ├── screens/           # Screen components
│   │   ├── Dashboard/
│   │   ├── Activity/
│   │   ├── Profile/
│   │   └── Settings/
│   ├── hooks/             # Custom React hooks
│   │   ├── useHealth.ts
│   │   ├── useOfflineSync.ts
│   │   └── useBiometrics.ts
│   ├── services/          # API and external services
│   │   ├── api.ts
│   │   ├── healthKit.ts
│   │   └── googleFit.ts
│   ├── store/             # State management
│   │   ├── useHealthStore.ts
│   │   └── useUserStore.ts
│   ├── navigation/        # Navigation configuration
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript definitions
├── assets/                # Images, fonts, etc.
├── __tests__/             # Test files
└── app.json               # Expo configuration
```

## Key Features Implementation

### Health Data Integration

```tsx
import { useHealth } from '@/hooks/useHealth';

function Dashboard() {
  const { steps, calories, heartRate, syncData } = useHealth();

  return (
    <View>
      <HealthCard title="Steps" value={steps} icon="walking" />
      <HealthCard title="Calories" value={calories} icon="flame" />
      <HealthCard title="Heart Rate" value={heartRate} icon="heart" />
    </View>
  );
}
```

### Offline-First Architecture

```tsx
import { useOfflineSync } from '@/hooks/useOfflineSync';

function App() {
  const { isOnline, pendingSync, syncNow } = useOfflineSync();

  // Data is stored locally first, synced when online
  // Queue system ensures no data loss
}
```

### Biometric Authentication

```tsx
import { useBiometrics } from '@/hooks/useBiometrics';

function LoginScreen() {
  const { authenticate, isAvailable, biometryType } = useBiometrics();

  const handleLogin = async () => {
    const success = await authenticate();
    if (success) {
      navigation.navigate('Dashboard');
    }
  };
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run Detox E2E tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |

## Configuration

### HealthKit Setup (iOS)

Add to `ios/[AppName]/Info.plist`:

```xml
<key>NSHealthShareUsageDescription</key>
<string>We need access to your health data to track your fitness.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>We need access to update your health data.</string>
```

### Google Fit Setup (Android)

1. Enable Google Fit API in Google Cloud Console
2. Add OAuth client ID to `android/app/google-services.json`

## Testing

```bash
# Unit tests
npm run test

# E2E tests (iOS)
npm run test:e2e:ios

# E2E tests (Android)
npm run test:e2e:android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with React Native by [Marwan Saleh](https://github.com/marwantech91)
