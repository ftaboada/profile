import { createContext, FC, ReactNode, useContext, useState } from 'react'

interface CtxType {
    darkMode: boolean
    changeDark(): void
    isMobile: boolean
    setMobile(b: boolean): void
}

const initialValue = {
    darkMode: false,
    changeDark: () => {},
    isMobile: true,
    setMobile: (b: boolean) => {},
}

const DarkModeCtx = createContext<CtxType>(initialValue)

export const DarkModeProvider: FC = ({ children }) => {
    const [darkMode, setDark] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(true)
    const changeDark = () => {
        setDark(!darkMode)
    }
    const setMobile = (bool: boolean) => {
        setIsMobile(bool)
    }
    const value = {
        darkMode,
        changeDark,
        isMobile,
        setMobile,
    }
    return <DarkModeCtx.Provider value={value}>{children}</DarkModeCtx.Provider>
}

export const useMode = () => {
    return useContext(DarkModeCtx)
}
