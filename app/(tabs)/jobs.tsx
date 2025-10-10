import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useJobs, Job } from '@/context/JobContext';

export default function JobsScreen() {
  const { jobs, isLoading } = useJobs();
  const router = useRouter();

  const renderItem = ({ item }: { item: Job }) => (
    <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)}>
      <ThemedView style={styles.jobItem}>
        <ThemedText style={styles.jobTitle}>{item.title}</ThemedText>
        <ThemedText>Client: {item.client}</ThemedText>
        <ThemedText>Status: {item.status}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  const handleCreateJob = () => {
    router.push('/modal');
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading Jobs...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Job Management</ThemedText>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No jobs found.</ThemedText>
            <ThemedText style={styles.emptySubText}>Press "Create New Job" to get started.</ThemedText>
          </ThemedView>
        }
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateJob}>
        <ThemedText style={styles.createButtonText}>Create New Job</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
