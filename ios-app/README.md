# Velour iOS App

A native iOS application for the Velour premium subscription platform, built with React Native and TypeScript.

## 🚀 Features

### Core Features
- **Authentication**: Secure login with Auth0 and biometric authentication
- **Content Management**: Upload, manage, and view videos, images, and text content
- **Subscription System**: Subscribe to creators with multiple subscription tiers
- **Direct Messaging**: Real-time messaging with creators and other users
- **Payment Processing**: Secure payments through Stripe integration
- **Video Streaming**: High-quality video playback with adaptive streaming
- **Push Notifications**: Real-time notifications for messages, content, and updates

### iOS-Specific Features
- **Native Performance**: Optimized for iOS with native components
- **Camera Integration**: Direct camera access for content creation
- **Photo Library**: Access to device photo library
- **Biometric Authentication**: Face ID and Touch ID support
- **Background Processing**: Background content sync and notifications
- **App Store Integration**: In-app purchases and subscriptions

## 📱 Requirements

### Development
- macOS 12.0+
- Xcode 14.0+
- Node.js 18.0+
- React Native CLI
- CocoaPods
- iOS Simulator or physical device

### Runtime
- iOS 13.0+
- iPhone 6s or newer
- iPad (6th generation) or newer

## 🛠 Installation

### 1. Prerequisites
```bash
# Install Node.js (if not already installed)
brew install node

# Install React Native CLI
npm install -g @react-native-community/cli

# Install CocoaPods
sudo gem install cocoapods
```

### 2. Clone and Install
```bash
# Clone the repository
git clone https://github.com/PacMac-Mobile-LLC/Velour.git
cd Velour/ios-app

# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Auth0 Configuration
AUTH0_DOMAIN=vibecodes.us.auth0.com
AUTH0_CLIENT_ID=OejuDvHhYdI5z7a2x6K3R5zWQxhy0gY2
AUTH0_AUDIENCE=https://velour-backend.onrender.com/api

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
STRIPE_MERCHANT_ID=your_merchant_id

# API Configuration
API_BASE_URL=https://velour-backend.onrender.com/api
FRONTEND_URL=https://velour.live

# Push Notifications
FCM_SERVER_KEY=your_fcm_server_key
APNS_KEY_ID=your_apns_key_id
APNS_TEAM_ID=your_apns_team_id
```

## 🚀 Running the App

### Development Mode
```bash
# Start Metro bundler
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android
```

### Production Build
```bash
# Build for iOS
npm run build:ios

# Build for iOS Simulator
npm run build:ios:simulator
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── VideoCard.tsx
│   ├── CreatorCard.tsx
│   ├── MessageBubble.tsx
│   └── ...
├── screens/            # Screen components
│   ├── DashboardScreen.tsx
│   ├── AuthScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ...
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── TabNavigator.tsx
│   └── StackNavigator.tsx
├── services/           # API and external services
│   ├── authService.ts
│   ├── contentService.ts
│   ├── paymentService.ts
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useContent.ts
│   └── ...
├── utils/              # Utility functions
│   ├── storage.ts
│   ├── permissions.ts
│   └── ...
└── types/              # TypeScript type definitions
    ├── navigation.ts
    ├── user.ts
    └── ...
```

## 🔐 Authentication

The app uses Auth0 for authentication with the following features:
- Social login (Google, Apple, Twitter)
- Biometric authentication (Face ID, Touch ID)
- Secure token storage
- Automatic token refresh
- Logout functionality

## 💳 Payment Integration

Stripe integration for:
- Subscription management
- In-app purchases
- Payment method management
- Billing history
- Refund processing

## 📱 iOS-Specific Features

### Permissions
The app requests the following permissions:
- Camera access for content creation
- Photo library access for content upload
- Microphone access for video recording
- Location access for nearby creators
- Push notifications for real-time updates
- Face ID/Touch ID for secure authentication

### Background Processing
- Background content sync
- Push notification handling
- Audio playback in background
- Location updates

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 📦 Building for App Store

### 1. Configure App Store Connect
- Create app in App Store Connect
- Configure app metadata
- Set up in-app purchases
- Configure push notifications

### 2. Build and Archive
```bash
# Build for release
npm run build:ios

# Archive in Xcode
# Product -> Archive
```

### 3. Upload to App Store
- Use Xcode Organizer
- Or use Application Loader
- Or use fastlane

## 🚀 Deployment

### Development
- TestFlight for internal testing
- Ad-hoc distribution for external testing

### Production
- App Store submission
- Automatic updates via App Store

## 📋 App Store Requirements

### Technical Requirements
- iOS 13.0+ support
- 64-bit architecture
- Proper app icons (all sizes)
- Launch screen
- Privacy policy
- Terms of service

### Content Guidelines
- Age-appropriate content
- Clear content warnings
- Proper content moderation
- User-generated content policies

### Metadata Requirements
- App name and description
- Keywords for App Store search
- Screenshots (all device sizes)
- App preview videos
- Category selection
- Age rating

## 🆘 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clean and rebuild
cd ios && xcodebuild clean && cd ..
npm run ios
```

#### Pod Installation Issues
```bash
# Clean pods and reinstall
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

#### Metro Bundler Issues
```bash
# Reset Metro cache
npx react-native start --reset-cache
```

### Debug Mode
```bash
# Enable debug mode
npm run ios -- --mode Debug
```

## 📚 Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Auth0 React Native SDK](https://github.com/auth0/react-native-auth0)
- [Stripe React Native SDK](https://stripe.com/docs/stripe-react-native)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@velour.live or create an issue in the repository.
