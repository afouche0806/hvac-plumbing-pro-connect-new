import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JOBS_STORAGE_KEY = 'hvac_pro_connect_jobs';

// 1. Define the type for a single job
export interface Job {
  id: string;
  title: string;
  client: string;
  contact: string;
  address: string;
  description: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

// 2. Define the shape of the context data
interface IJobContext {
  jobs: Job[];
  addJob: (jobData: Omit<Job, 'id'>) => void;
  isLoading: boolean;
}

// 3. Create the context with a default value
const JobContext = createContext<IJobContext | undefined>(undefined);

// 4. Create the Provider component
interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load jobs from storage when the app starts
  useEffect(() => {
    const loadJobsFromStorage = async () => {
      try {
        const storedJobs = await AsyncStorage.getItem(JOBS_STORAGE_KEY);
        if (storedJobs !== null) {
          setJobs(JSON.parse(storedJobs));
        }
      } catch (e) {
        console.error('Failed to load jobs from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobsFromStorage();
  }, []);

  // Save jobs to storage whenever the jobs state changes
  useEffect(() => {
    // Don't save the initial empty array before jobs are loaded
    if (!isLoading) {
      const saveJobsToStorage = async () => {
        try {
          await AsyncStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
        } catch (e) {
          console.error('Failed to save jobs to storage', e);
        }
      };
      saveJobsToStorage();
    }
  }, [jobs, isLoading]);

  const addJob = (jobData: Omit<Job, 'id'>) => {
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9), // A more robust unique ID
      ...jobData,
    };
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, isLoading }}>
      {children}
    </JobContext.Provider>
  );
};

// 5. Create a custom hook for easy consumption
export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};