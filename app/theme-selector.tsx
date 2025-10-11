import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Stack, useRouter } from 'expo-router';
import { useCard } from '../context/CardContext';
import { Colors } from '@/constants/theme';

export default function ThemeSelectorScreen() {
  const { cardData, updateCardData } = useCard();
  const router = useRouter();

  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' },
  ];

  const handleThemeSelect = async (theme: string) => {
    await updateCardData({ theme: theme });
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Select Theme' }} />
      {themes.map((theme) => (
        <TouchableOpacity
          key={theme.value}
          style={[
            styles.themeOption,
            cardData?.theme === theme.value && styles.selectedTheme,
          ]}
          onPress={() => handleThemeSelect(theme.value)}
        >
          <ThemedText style={styles.themeText}>{theme.name}</ThemedText>
          {cardData?.theme === theme.value && (
            <ThemedText style={styles.selectedIndicator}>✓</ThemedText>
          )}
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.icon, // Using a theme color for consistency
  },
  selectedTheme: {
    backgroundColor: Colors.light.tint, // Highlight selected theme
  },
  themeText: {
    fontSize: 18,
  },
  selectedIndicator: {
    fontSize: 20,
    color: Colors.light.text,
  },
});