import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import { DarkModeProvider } from 'ctx'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DarkModeProvider>
                <Component {...pageProps} />
            </DarkModeProvider>
        </>
    )
}

export default MyApp
