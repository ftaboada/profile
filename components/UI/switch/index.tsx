import {
    FC,
    useState,
    MouseEvent,
    useRef,
    MutableRefObject,
    useEffect,
} from 'react'
import style from '@styles/Switch.module.scss'
import { config, movementL, movementR } from './anime'

export const Switch: FC<SwitchProps> = ({
    handleClick,
    Icon,
    variant = 'blue',
    initialState = false,
}) => {
    const [on, setOn] = useState<boolean>(initialState)
    const ref = useRef(null)
    const internalClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!ref) return
        ;(ref.current as unknown as HTMLElement).animate(
            on ? movementL : movementR,
            config
        ).onfinish = () => {
            ;(ref.current as unknown as HTMLElement).style.transform = on
                ? 'translateX(-48px)'
                : 'translateX(0px)'
            setTimeout(() => {
                handleClick(!on)
                setOn(!on)
            }, 400)
        }
    }
    return (
        <div className={style.switch}>
            <button
                className={`${style.button} ${style[variant]} ${
                    !on ? style.off : ''
                }`}
                onClick={internalClick}
                ref={ref}
            >
                {Icon && <Icon />}
            </button>
            <div
                className={`${style.slider} ${!on ? style.dark : style.light}`}
            ></div>
        </div>
    )
}

interface SwitchProps {
    handleClick(state: boolean): void
    Icon?: FC | null
    variant?: 'blue' | 'red'
    initialState: boolean
}
