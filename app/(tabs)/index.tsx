import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { useCard } from '../../context/CardContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { cardData, loading } = useCard();
  const router = useRouter();

  const handleShare = async () => {
    if (cardData) {
      const cardString = `
Name: ${cardData.name}
Title: ${cardData.title}
Company: ${cardData.company}
Phone: ${cardData.phone1}
Email: ${cardData.email1}
Website: ${cardData.website}
      `;

      try {
        const fileUri = FileSystem.cacheDirectory + 'business_card.txt';
        await FileSystem.writeAsStringAsync(fileUri, cardString);
        await Sharing.shareAsync(fileUri);
      } catch (error) {
        Alert.alert('Error', 'Failed to share business card.');
        console.error('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!cardData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No card data found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.name}>{cardData.name}</ThemedText>
      <ThemedText style={styles.title}>{cardData.title}</ThemedText>
      <ThemedText style={styles.company}>{cardData.company}</ThemedText>

      <ThemedView style={styles.infoSection}>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${cardData.phone1}`)}>
          <ThemedText style={styles.infoText}>Phone: {cardData.phone1}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${cardData.email1}`)}>
          <ThemedText style={styles.infoText}>Email: {cardData.email1}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(cardData.website)}>
          <ThemedText style={styles.infoText}>Website: {cardData.website}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <ThemedText style={styles.shareButtonText}>Share Business Card</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/editor')}>
        <ThemedText style={styles.editButtonText}>Edit Business Card</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    color: '#666',
    marginTop: 4,
  },
  company: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  infoSection: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});