import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Switch, Tabs } from '@components/UI'
import { MainOptions } from '@lang/spa'
import { Card } from '@components/modules'
import { useMode } from 'ctx'
import styles from '@styles/Home.module.scss'

const Home: NextPage<{ mobile: boolean }> = ({ mobile }) => {
    const { darkMode } = useMode()

    return (
        <div className={styles.container}>
            <Head>
                <title>Felipe Taboada Profile</title>
                <meta
                    name="A page about myself and my software skills"
                    content="just a profile"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={darkMode ? styles.mainDark : styles.main}>
                <Card option={0} isMobile={mobile} />
            </main>
        </div>
    )
}

Home.getInitialProps = async (ctx) => {
    let isMobileView = (
        ctx?.req ? ctx?.req?.headers['user-agent'] : navigator?.userAgent
    ) as string
    const mobile = Boolean(isMobileView?.match(/Android|iPhone|mobile/i))
    return {
        mobile,
    }
}
export default Home
