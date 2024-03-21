import { useState, createContext } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS, getThemeFromLS, setThemeToLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  theme: string
  toggleTheme: () => void
  reset: () => void
  //? language
  // language: string
  // setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  loadingPage: false,
  setLoadingPage: () => null,
  theme: getThemeFromLS(),
  toggleTheme: () => null
  //? language
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)
  const [theme, setTheme] = useState<string>(initialAppContext.theme)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setThemeToLS(newTheme)
  }

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        loadingPage,
        setLoadingPage,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
