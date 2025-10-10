import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useCard } from '../context/CardContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function EditorScreen() {
  const { cardData, updateCardData } = useCard();
  const router = useRouter();

  const [name, setName] = useState(cardData?.name || '');
  const [title, setTitle] = useState(cardData?.title || '');
  const [company, setCompany] = useState(cardData?.company || '');
  const [phone1, setPhone1] = useState(cardData?.phone1 || '');
  const [phone2, setPhone2] = useState(cardData?.phone2 || '');
  const [email1, setEmail1] = useState(cardData?.email1 || '');
  const [email2, setEmail2] = useState(cardData?.email2 || '');
  const [website, setWebsite] = useState(cardData?.website || '');
  const [facebook, setFacebook] = useState(cardData?.facebook || '');
  const [instagram, setInstagram] = useState(cardData?.instagram || '');
  const [linkedin, setLinkedin] = useState(cardData?.linkedin || '');
  const [whatsapp, setWhatsapp] = useState(cardData?.whatsapp || '');

  useEffect(() => {
    if (cardData) {
      setName(cardData.name);
      setTitle(cardData.title);
      setCompany(cardData.company);
      setPhone1(cardData.phone1);
      setPhone2(cardData.phone2);
      setEmail1(cardData.email1);
      setEmail2(cardData.email2);
      setWebsite(cardData.website);
      setFacebook(cardData.facebook);
      setInstagram(cardData.instagram);
      setLinkedin(cardData.linkedin);
      setWhatsapp(cardData.whatsapp);
    }
  }, [cardData]);

  const handleSave = async () => {
    const updatedData = {
      name,
      title,
      company,
      phone1,
      phone2,
      email1,
      email2,
      website,
      facebook,
      instagram,
      linkedin,
      whatsapp,
    };
    await updateCardData(updatedData);
    Alert.alert('Success', 'Business card updated!');
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Business Card' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.label}>Name:</ThemedText>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <ThemedText style={styles.label}>Title:</ThemedText>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <ThemedText style={styles.label}>Company:</ThemedText>
        <TextInput style={styles.input} value={company} onChangeText={setCompany} />

        <ThemedText style={styles.label}>Phone 1:</ThemedText>
        <TextInput style={styles.input} value={phone1} onChangeText={setPhone1} keyboardType="phone-pad" />

        <ThemedText style={styles.label}>Phone 2:</ThemedText>
        <TextInput style={styles.input} value={phone2} onChangeText={setPhone2} keyboardType="phone-pad" />

        <ThemedText style={styles.label}>Email 1:</ThemedText>
        <TextInput style={styles.input} value={email1} onChangeText={setEmail1} keyboardType="email-address" />

        <ThemedText style={styles.label}>Email 2:</ThemedText>
        <TextInput style={styles.input} value={email2} onChangeText={setEmail2} keyboardType="email-address" />

        <ThemedText style={styles.label}>Website:</ThemedText>
        <TextInput style={styles.input} value={website} onChangeText={setWebsite} keyboardType="url" />

        <ThemedText style={styles.label}>Facebook:</ThemedText>
        <TextInput style={styles.input} value={facebook} onChangeText={setFacebook} />

        <ThemedText style={styles.label}>Instagram:</ThemedText>
        <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} />

        <ThemedText style={styles.label}>LinkedIn:</ThemedText>
        <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />

        <ThemedText style={styles.label}>WhatsApp:</ThemedText>
        <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} />

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => router.back()} color="red" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
