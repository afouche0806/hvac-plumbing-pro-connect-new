import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the structure of the card data
interface CardData {
  name: string;
  title: string;
  company: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
  theme?: 'light' | 'dark' | 'system';
  notes?: string;
}

// Define the context structure
interface CardContextType {
  cardData: CardData; // Always a card selected
  cards: CardData[]; // All user's cards
  currentCardIndex: number; // Index of the currently active card
  loading: boolean;
  updateCardData: (newData: Partial<CardData>) => Promise<void>;
  switchCard: (index: number) => Promise<void>;
  addCard: (newCard: CardData) => Promise<void>;
  removeCard: (index: number) => Promise<void>;
  contacts: CardData[];
  addContact: (newContact: CardData) => Promise<void>;
  removeContact: (contactName: string) => Promise<void>;
  updateContact: (contactName: string, updatedFields: Partial<CardData>) => Promise<void>;
  updateTheme: (newTheme: 'light' | 'dark' | 'system') => Promise<void>;
}

// Create the context
const CardContext = createContext<CardContextType | undefined>(undefined);

// Default data for the first time the app runs
const defaultData: CardData = {
  name: 'Andre Fouche',
  title: 'HVAC & Plumbing Specialist',
  company: 'HVAC Plumbing Pro Connect',
  phone1: '0837986843',
  phone2: '0674791226',
  email1: 'afouche69@gmail.com',
  email2: 'perfection.plumberscc@gmail.com',
  website: 'https://www.yourwebsite.com',
  facebook: 'https://www.facebook.com/yourpage',
  instagram: 'https://www.instagram.com/yourprofile',
  linkedin: 'https://www.linkedin.com/in/yourprofile',
  whatsapp: 'https://wa.me/27837986843',
  theme: 'system',
};

const CARDS_STORAGE_KEY = 'hvac_user_cards_data';
const CURRENT_CARD_INDEX_STORAGE_KEY = 'hvac_current_card_index';
const CONTACTS_STORAGE_KEY = 'hvac_contacts_data';

// Create the provider component
export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardData = cards[currentCardIndex] || defaultData; // Expose current card
  const [contacts, setContacts] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
        const storedCurrentCardIndex = await AsyncStorage.getItem(CURRENT_CARD_INDEX_STORAGE_KEY);
        const storedContacts = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);

        if (storedCards) {
          const parsedCards = JSON.parse(storedCards);
          setCards(parsedCards);
          if (storedCurrentCardIndex !== null) {
            setCurrentCardIndex(parseInt(storedCurrentCardIndex, 10));
          } else {
            setCurrentCardIndex(0);
          }
        } else {
          // If no cards are stored, initialize with default data
          setCards([defaultData]);
          await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify([defaultData]));
          await AsyncStorage.setItem(CURRENT_CARD_INDEX_STORAGE_KEY, '0');
        }

        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setCards([defaultData]); // Fallback to default data on error
        setCurrentCardIndex(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateCardData = async (newData: Partial<CardData>) => {
    const updatedCards = cards.map((card, index) =>
      index === currentCardIndex ? { ...card, ...newData } : card
    );
    setCards(updatedCards);
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
  };

  const addContact = async (newContact: CardData) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  const switchCard = async (index: number) => {
    if (index >= 0 && index < cards.length) {
      setCurrentCardIndex(index);
      await AsyncStorage.setItem(CURRENT_CARD_INDEX_STORAGE_KEY, index.toString());
    }
  };

  const addCard = async (newCard: CardData) => {
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
  };

  const removeCard = async (index: number) => {
    if (cards.length > 1 && index >= 0 && index < cards.length) {
      const updatedCards = cards.filter((_, i) => i !== index);
      setCards(updatedCards);
      if (currentCardIndex >= updatedCards.length) {
        setCurrentCardIndex(updatedCards.length - 1);
        await AsyncStorage.setItem(CURRENT_CARD_INDEX_STORAGE_KEY, (updatedCards.length - 1).toString());
      } else {
        await AsyncStorage.setItem(CURRENT_CARD_INDEX_STORAGE_KEY, currentCardIndex.toString());
      }
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
    } else if (cards.length === 1) {
      Alert.alert("Cannot delete last card", "You must have at least one business card.");
    }
  };

  const removeContact = async (contactName: string) => {
    const updatedContacts = contacts.filter(contact => contact.name !== contactName);
    setContacts(updatedContacts);
    await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  const updateContact = async (contactName: string, updatedFields: Partial<CardData>) => {
    const updatedContacts = contacts.map(contact =>
      contact.name === contactName ? { ...contact, ...updatedFields } : contact
    );
    setContacts(updatedContacts);
    await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  const updateTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    if (cardData) {
      const updatedData = { ...cardData, theme: newTheme };
      setCardData(updatedData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    }
  };

  return (
    <CardContext.Provider value={{ cardData, cards, currentCardIndex, loading, updateCardData, switchCard, addCard, removeCard, contacts, addContact, removeContact, updateContact, updateTheme }}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to use the card context
export const useCard = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
