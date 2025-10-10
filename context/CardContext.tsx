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
}

// Define the context structure
interface CardContextType {
  cardData: CardData | null;
  loading: boolean;
  updateCardData: (newData: Partial<CardData>) => Promise<void>;
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
};

const STORAGE_KEY = 'hvac_card_data';

// Create the provider component
export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setCardData(JSON.parse(storedData));
        } else {
          // If no data is stored, use the default data and save it
          setCardData(defaultData);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        }
      } catch (error) {
        console.error('Failed to load card data:', error);
        setCardData(defaultData); // Fallback to default data on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateCardData = async (newData: Partial<CardData>) => {
    if (cardData) {
      const updatedData = { ...cardData, ...newData };
      setCardData(updatedData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    }
  };

  return (
    <CardContext.Provider value={{ cardData, loading, updateCardData }}>
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
