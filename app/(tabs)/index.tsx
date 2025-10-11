import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Linking, Image, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../../assets/images/LogoMakerCa-1759167128524.png')} style={styles.logo} />
        <ThemedText style={styles.tagline}>HVAC - Plumbing and Electrical</ThemedText>

        <ThemedView style={styles.socialMediaContainer}>
          {cardData.facebook && (
            <TouchableOpacity onPress={() => Linking.openURL(cardData.facebook)}>
              <FontAwesome name="facebook-square" size={30} color="#3b5998" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {cardData.instagram && (
            <TouchableOpacity onPress={() => Linking.openURL(cardData.instagram)}>
              <FontAwesome name="instagram" size={30} color="#E4405F" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {cardData.linkedin && (
            <TouchableOpacity onPress={() => Linking.openURL(cardData.linkedin)}>
              <FontAwesome name="linkedin-square" size={30} color="#0077B5" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {cardData.whatsapp && (
            <TouchableOpacity onPress={() => Linking.openURL(cardData.whatsapp)}>
              <FontAwesome name="whatsapp" size={30} color="#25D366" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
        </ThemedView>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <ThemedText style={styles.shareButtonText}>Share Business Card</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.qrCodeButton} onPress={() => router.push({ pathname: '/qr-code-modal', params: { cardData: JSON.stringify(cardData) } } as any)}>
          <ThemedText style={styles.qrCodeButtonText}>Show QR Code</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={() => router.push('/editor')}>
          <ThemedText style={styles.editButtonText}>Edit Business Card</ThemedText>
        </TouchableOpacity>


      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'stretch',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },  qrCodeButton: {
    backgroundColor: '#28a745', // Green color
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  qrCodeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },});
