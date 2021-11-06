import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { Button, Switch, Tabs } from 'components/UI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { MainOptions } from 'lang/spa'
import { useMode } from 'ctx'
import { tabs } from 'types'
import style from '@styles/Card.module.scss'
import { Contact, Home } from '..'

export const Card: FC<CardProps> = ({ option, isMobile }) => {
    const { darkMode, changeDark, setMobile } = useMode()
    const router = useRouter()
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const setOption = (n: number) => {
        if (n === 0) return router.push('/')
        if (n === 1) return router.push(`/contact`)
    }

    return (
        <div
            className={`${style.container} ${
                darkMode ? style.dark : style.ligth
            } `}
        >
            <section className={style.nav}>
                <Tabs
                    selected={option}
                    options={[
                        () => <FontAwesomeIcon icon={faHome} />,
                        ...MainOptions,
                    ]}
                    handleChange={setOption}
                />
                <Switch
                    handleClick={changeDark}
                    Icon={() => (
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    )}
                    initialState={darkMode}
                />
            </section>
            <div className={`${style.card}`}>
                {option === tabs.HOME && <Home />}
                {option === tabs.CONTACT && <Contact />}
            </div>
        </div>
    )
}

interface CardProps {
    option: number
    isMobile: boolean
}
