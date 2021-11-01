import { createContext, FC, ReactNode, useContext, useState } from 'react'

type CtxType = {
    darkMode: boolean
    changeDark(): void
}
const initialValue = {
    darkMode: false,
    changeDark: () => {},
}

const DarkModeCtx = createContext<CtxType>(initialValue)

export const DarkModeProvider: FC = ({ children }) => {
    const [darkMode, setDark] = useState<boolean>(false)
    const changeDark = () => {
        setDark(!darkMode)
    }
    const value = {
        darkMode,
        changeDark,
    }
    return <DarkModeCtx.Provider value={value}>{children}</DarkModeCtx.Provider>
}

export const useDarkMode = () => {
    return useContext(DarkModeCtx)
}
