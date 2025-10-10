import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useJobs } from '../context/JobContext';
import { useRouter } from 'expo-router';

export default function CreateJobScreen() {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const { addJob } = useJobs();
  const router = useRouter();

  const handleSave = () => {
    if (!title || !client) {
      Alert.alert('Missing Information', 'Please fill in at least the job title and client name.');
      return;
    }

    addJob({
      title,
      client,
      contact,
      address,
      description,
      status: 'Scheduled', // Default status for new jobs
    });

    router.back(); // Go back to the jobs list
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Create New Job</ThemedText>

        <ThemedText style={styles.label}>Job Title</ThemedText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Leaky Faucet Repair"
        />

        <ThemedText style={styles.label}>Client Name</ThemedText>
        <TextInput
          style={styles.input}
          value={client}
          onChangeText={setClient}
          placeholder="e.g., John Doe"
        />

        <ThemedText style={styles.label}>Contact Number</ThemedText>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="e.g., 0821234567"
          keyboardType="phone-pad"
        />

        <ThemedText style={styles.label}>Address</ThemedText>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="e.g., 123 Main St, Anytown"
        />

        <ThemedText style={styles.label}>Job Description</ThemedText>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the work to be done..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>Save Job</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
