import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useJobs } from '@/context/JobContext';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { jobs } = useJobs();
  const router = useRouter();

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Job Not Found</ThemedText>
        <ThemedText>This job could not be found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Stack.Screen options={{ title: job.title, headerBackTitle: 'Jobs' }} />
      <ThemedView style={styles.container}>
        
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Status</ThemedText>
          <ThemedText style={styles.statusText}>{job.status}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Client Details</ThemedText>
          <ThemedText style={styles.detailText}>Name: {job.client}</ThemedText>
          <ThemedText style={styles.detailText}>Contact: {job.contact}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Location</ThemedText>
          <ThemedText style={styles.detailText}>{job.address}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Job Description</ThemedText>
          <ThemedText style={styles.descriptionText}>{job.description}</ThemedText>
        </View>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Example color
  },
});
