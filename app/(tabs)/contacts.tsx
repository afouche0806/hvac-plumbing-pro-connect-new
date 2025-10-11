import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useCard } from '../../context/CardContext';
import { Stack, useRouter } from 'expo-router';

export default function ContactsScreen() {
  const { contacts } = useCard();
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => router.push({ pathname: '/contact-details', params: { contactName: item.name } })}
    >
      <ThemedText style={styles.contactName}>{item.name}</ThemedText>
      <ThemedText style={styles.contactTitle}>{item.title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'My Contacts' }} />
      {contacts.length === 0 ? (
        <ThemedText>No contacts found. Add a new contact!</ThemedText>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/editor')} // Reuse editor for adding new contacts
      >
        <ThemedText style={styles.addButtonText}>Add New Contact</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    flexGrow: 1,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactTitle: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});