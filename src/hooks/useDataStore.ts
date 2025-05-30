import { create } from 'zustand'
import data from '../data/data.json'

type YearData = {
  non_screen: number
  screen: number
}

type CountryData = {
  code: string
  name: string
  flag: string
  context: string
  data: {
    "2005": YearData
    "2010": YearData
    "2015": YearData
    "2024": YearData
  };
}

type DataStore = {
  selectedCountry: CountryData | null;
  availableCountries: CountryData[];
  years: string[];
  
  selectCountry: (countryCode: string) => void;
  clearSelection: () => void;
  
  getCountryData: (year: string) => YearData | null;
  getTimelineData: () => Array<{ year: string; data: YearData }>;
}

export const useDataStore = create<DataStore>((set, get) => ({
  selectedCountry: null,
  availableCountries: data.countries as CountryData[],
  years: ["2005", "2010", "2015", "2024"],
  
  selectCountry: (countryCode) => set((state) => {
    const country = state.availableCountries.find(c => c.code === countryCode);
    return { selectedCountry: country || null };
  }),
  
  clearSelection: () => set({ selectedCountry: null }),
  
  getCountryData: (year) => {
    const state = get();
    if (!state.selectedCountry) return null;
    return state.selectedCountry.data[year as keyof typeof state.selectedCountry.data] || null;
  },
  
  getTimelineData: () => {
    const state = get();
    if (!state.selectedCountry) return [];
    
    return state.years.map(year => ({
      year,
      data: state.selectedCountry!.data[year as keyof typeof state.selectedCountry.data]
    }));
  }
}));
