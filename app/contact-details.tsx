import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCard } from '../context/CardContext';
import { FontAwesome } from '@expo/vector-icons';

export default function ContactDetailsScreen() {
  const { contactName } = useLocalSearchParams();
  const { contacts, removeContact } = useCard();
  const router = useRouter();

  const contact = contacts.find(c => c.name === contactName);

  if (!contact) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Contact not found.</ThemedText>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete ${contact.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            await removeContact(contact.name);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: contact.name }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.name}>{contact.name}</ThemedText>
        <ThemedText style={styles.title}>{contact.title}</ThemedText>
        <ThemedText style={styles.company}>{contact.company}</ThemedText>

        <ThemedView style={styles.infoSection}>
          {contact.phone1 && (
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${contact.phone1}`)}>
              <ThemedText style={styles.infoText}>Phone: {contact.phone1}</ThemedText>
            </TouchableOpacity>
          )}
          {contact.email1 && (
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.email1}`)}>
              <ThemedText style={styles.infoText}>Email: {contact.email1}</ThemedText>
            </TouchableOpacity>
          )}
          {contact.website && (
            <TouchableOpacity onPress={() => Linking.openURL(contact.website)}>
              <ThemedText style={styles.infoText}>Website: {contact.website}</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView style={styles.socialMediaContainer}>
          {contact.facebook && (
            <TouchableOpacity onPress={() => Linking.openURL(contact.facebook)}>
              <FontAwesome name="facebook-square" size={30} color="#3b5998" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {contact.instagram && (
            <TouchableOpacity onPress={() => Linking.openURL(contact.instagram)}>
              <FontAwesome name="instagram" size={30} color="#E4405F" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {contact.linkedin && (
            <TouchableOpacity onPress={() => Linking.openURL(contact.linkedin)}>
              <FontAwesome name="linkedin-square" size={30} color="#0077B5" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
          {contact.whatsapp && (
            <TouchableOpacity onPress={() => Linking.openURL(contact.whatsapp)}>
              <FontAwesome name="whatsapp" size={30} color="#25D366" style={styles.socialIcon} />
            </TouchableOpacity>
          )}
        </ThemedView>

        <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: '/editor', params: { contactName: contact.name } } as any)}>
          <ThemedText style={styles.editButtonText}>Edit Contact</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <ThemedText style={styles.deleteButtonText}>Delete Contact</ThemedText>
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50, // Add some padding at the bottom
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
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
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});