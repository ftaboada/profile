import { FC, useState } from 'react'
import styles from '@styles/Button.module.scss'

export const Submit: FC<SubmitProps> = ({
    variant = 'filled',
    color = 'blue',
    size = 'xl',
    innerText = 'Enviar',
    shadow = false,
    disabled = false,
    disabledMessage = 'Rellena todos los campos',
}) => {
    const [on, setOn] = useState<boolean>(false)
    return (
        <div>
            {disabled && on && (
                <div className={styles.tooltip}>
                    <p>{disabledMessage}</p>
                </div>
            )}
            <input
                type="submit"
                className={`${styles[variant]} ${styles[color]} ${
                    shadow ? styles.shadow : ''
                } ${styles[size]} ${disabled ? styles.disabled : ''}`}
                value={innerText}
                disabled={disabled}
                onPointerEnter={() => setOn(true)}
                onPointerLeave={() => setOn(false)}
            />
        </div>
    )
}

interface SubmitProps {
    variant?: 'outlined' | 'filled' | 'transparent'
    color?: 'blue' | 'red' | 'green' | 'B&W'
    size?: 'sm' | 'lg' | 'xl'
    innerText?: string
    shadow?: boolean
    disabled?: boolean
    disabledMessage?: string
}
