export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Messages: undefined;
  Subscriptions: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type DashboardStackParamList = {
  Home: undefined;
  ContentFeed: undefined;
  VideoPlayer: { videoId: string; videoUrl: string };
  ImageViewer: { imageId: string; imageUrl: string };
  CreatorProfile: { creatorId: string };
  Search: undefined;
  Notifications: undefined;
};

export type MessagesStackParamList = {
  Conversations: undefined;
  Chat: { conversationId: string; recipientId: string; recipientName: string };
  NewMessage: undefined;
  MessageSettings: undefined;
};

export type SubscriptionsStackParamList = {
  MySubscriptions: undefined;
  SubscriptionDetails: { subscriptionId: string };
  PaymentMethods: undefined;
  BillingHistory: undefined;
  SubscriptionPlans: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Privacy: undefined;
  Security: undefined;
  Help: undefined;
  About: undefined;
};

// Navigation prop types
export type NavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: T, params?: RootStackParamList[T]) => void;
  goBack: () => void;
  reset: (state: any) => void;
};

export type RouteProp<T extends keyof RootStackParamList> = {
  key: string;
  name: T;
  params: RootStackParamList[T];
};
