import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import QRCodeSVG from 'react-native-qrcode-svg';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function QRCodeModal() {
  const router = useRouter();
  const { cardData } = useLocalSearchParams();

  if (!cardData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No card data to display QR code.</ThemedText>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <ThemedText style={styles.closeButtonText}>Close</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const cardString = JSON.stringify(cardData);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Scan to get my Business Card</ThemedText>
      <ThemedView style={styles.qrCodeContainer}>
        <QRCodeSVG
          value={cardString}
          size={250}
          color="black"
          backgroundColor="white"
        />
      </ThemedView>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
        <ThemedText style={styles.closeButtonText}>Close</ThemedText>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrCodeContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});