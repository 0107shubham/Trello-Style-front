import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Define the shape of the context data
interface DataContextType {
  data: any[]; // Adjust the type based on your API response
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<any[]>>; // Function to set data directly
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Function to set loading state
  setError: React.Dispatch<React.SetStateAction<string | null>>; // Function to set error state
}

// Create a default context value
const defaultContextValue: DataContextType = {
  data: [],
  loading: false,
  error: null,
  setData: () => {}, // No-op function
  setLoading: () => {}, // No-op function
  setError: () => {}, // No-op function
};

// Create the context
const DataContext = createContext<DataContextType>(defaultContextValue);

// Create a provider component
export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any[]>([]); // Adjust type based on your API response
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userId = Cookies.get("userId") || null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://trello-style-back.vercel.app/getposts",
          { userId }
        );
        console.log("data fetch", response.data.Data.categories);
        setData(response.data.Data.categories); // Adjust the data path as per your response structure
        setError(null); // Clear error if data fetch is successful
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data."); // Update error state
      } finally {
        setLoading(false); // Always reset loading state
      }
    };

    fetchData();
  }, [userId]); // Added dependency array

  return (
    <DataContext.Provider
      value={{ data, loading, error, setData, setLoading, setError }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easier context usage
export const useDataContext = () => useContext(DataContext);
