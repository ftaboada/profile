import React, { FC, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { HomeP1, HomeP2 } from '@lang/spa'
import style from '@styles/MainContent.module.scss'
import { GameOfLife } from '../'
import { useMode } from 'ctx'
import { Button } from '@components/UI'

export const Home: FC = () => {
    const [time, setTime] = useState<number>(56)
    const { darkMode } = useMode()
    const router = useRouter()
    return (
        <div className={style.container}>
            <section className={style.gameContainer}>
                <p className={darkMode ? style.color : ''}>
                    {HomeP1}{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
                        target="_blank"
                        rel="noreferrer"
                    >
                        juego de la vida de conway
                    </a>
                    )
                </p>
                <GameOfLife time={time} key={darkMode.toString()} />
            </section>
            <section className={style.textContainer}>
                <p className={darkMode ? style.color : ''}>{HomeP2}</p>
                <img src="/ftc.jpg" className={style.img} alt="foto mía" />
            </section>
            <div className={style.buttonContainer}>
                <Button
                    onClick={() =>
                        router.push(
                            'https://www.linkedin.com/in/felipe-taboada-95b88035'
                        )
                    }
                    Icon={() => <FontAwesomeIcon icon={faLinkedin} />}
                    size="lg"
                    variant="outlined"
                />
                <Button
                    onClick={() => router.push('https://github.com/ftaboada')}
                    Icon={() => <FontAwesomeIcon icon={faGithub} />}
                    size="lg"
                    variant="outlined"
                />
            </div>
        </div>
    )
}
