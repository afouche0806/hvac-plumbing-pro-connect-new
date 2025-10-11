import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCard } from '../context/CardContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function EditorScreen() {
  const { cardData, updateCardData, contacts, addContact, updateContact } = useCard();
  const router = useRouter();

  const { contactName } = useLocalSearchParams();
  const isEditingContact = !!contactName;

  const initialData = isEditingContact
    ? contacts.find(c => c.name === contactName)
    : cardData;

  const [name, setName] = useState(initialData?.name || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [phone1, setPhone1] = useState(initialData?.phone1 || '');
  const [phone2, setPhone2] = useState(initialData?.phone2 || '');
  const [email1, setEmail1] = useState(initialData?.email1 || '');
  const [email2, setEmail2] = useState(initialData?.email2 || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [facebook, setFacebook] = useState(initialData?.facebook || '');
  const [instagram, setInstagram] = useState(initialData?.instagram || '');
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || '');
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '');

  useEffect(() => {
    if (isEditingContact && contactName) {
      const contactToEdit = contacts.find(c => c.name === contactName);
      if (contactToEdit) {
        setName(contactToEdit.name);
        setTitle(contactToEdit.title);
        setCompany(contactToEdit.company);
        setPhone1(contactToEdit.phone1);
        setPhone2(contactToEdit.phone2);
        setEmail1(contactToEdit.email1);
        setEmail2(contactToEdit.email2);
        setWebsite(contactToEdit.website);
        setFacebook(contactToEdit.facebook);
        setInstagram(contactToEdit.instagram);
        setLinkedin(contactToEdit.linkedin);
        setWhatsapp(contactToEdit.whatsapp);
      }
    } else if (!isEditingContact && cardData) {
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
  }, [cardData, contacts, contactName, isEditingContact]);

  const handleSave = async () => {
    const dataToSave = {
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

    if (isEditingContact && contactName) {
      await updateContact(contactName, dataToSave);
      Alert.alert('Success', 'Contact updated!');
    } else if (isEditingContact && !contactName) { // This case should ideally not happen if routed correctly
      Alert.alert('Error', 'Cannot update contact without a name.');
      return;
    } else if (!isEditingContact && initialData?.name) { // Editing own card
      await updateCardData(dataToSave);
      Alert.alert('Success', 'Your business card updated!');
    } else { // Adding new contact
      await addContact(dataToSave);
      Alert.alert('Success', 'New contact added!');
    }
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: isEditingContact ? 'Edit Contact' : 'Add Contact' }} />
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
