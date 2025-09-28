import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { contentService } from '../services/contentService';
import { userService } from '../services/userService';
import { VideoCard } from '../components/VideoCard';
import { CreatorCard } from '../components/CreatorCard';
import { SearchBar } from '../components/SearchBar';
import { NotificationBell } from '../components/NotificationBell';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const { width } = Dimensions.get('window');

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isSubscribed: boolean;
  createdAt: string;
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  subscribers: number;
  isSubscribed: boolean;
  bio: string;
  categories: string[];
}

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [recommendedCreators, setRecommendedCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contentData, creatorsData] = await Promise.all([
        contentService.getFeed(),
        userService.getRecommendedCreators()
      ]);
      
      setContent(contentData);
      setRecommendedCreators(creatorsData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleContentPress = (item: ContentItem) => {
    navigation.navigate('VideoPlayer', {
      videoId: item.id,
      videoUrl: item.videoUrl
    });
  };

  const handleCreatorPress = (creator: Creator) => {
    navigation.navigate('CreatorProfile', {
      creatorId: creator.id
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  const handleLike = async (contentId: string) => {
    try {
      await contentService.toggleLike(contentId);
      setContent(prev => prev.map(item => 
        item.id === contentId 
          ? { ...item, isLiked: !item.isLiked, likes: item.likes + (item.isLiked ? -1 : 1) }
          : item
      ));
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleSubscribe = async (creatorId: string) => {
    try {
      await userService.toggleSubscription(creatorId);
      setRecommendedCreators(prev => prev.map(creator => 
        creator.id === creatorId 
          ? { ...creator, isSubscribed: !creator.isSubscribed }
          : creator
      ));
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  const renderContentItem = ({ item }: { item: ContentItem }) => (
    <VideoCard
      item={item}
      onPress={() => handleContentPress(item)}
      onLike={() => handleLike(item.id)}
      onSubscribe={() => handleSubscribe(item.creator.id)}
    />
  );

  const renderCreatorItem = ({ item }: { item: Creator }) => (
    <CreatorCard
      creator={item}
      onPress={() => handleCreatorPress(item)}
      onSubscribe={() => handleSubscribe(item.id)}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Loading your feed..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadDashboardData} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Velour</Text>
        <View style={styles.headerActions}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search creators and content..."
          />
          <NotificationBell />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Recommended Creators */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Creators</Text>
          <FlatList
            data={recommendedCreators}
            renderItem={renderCreatorItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorsList}
          />
        </View>

        {/* Content Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Content</Text>
          <FlatList
            data={content}
            renderItem={renderContentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.contentList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  creatorsList: {
    paddingHorizontal: 16,
  },
  contentList: {
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
