import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import { DarkModeProvider } from 'ctx'

function MyApp({ Component, pageProps }: AppProps) {
    console.log('Hello World, welcome to my space in the web')
    return (
        <>
            <DarkModeProvider>
                <Component {...pageProps} />
            </DarkModeProvider>
        </>
    )
}

export default MyApp
