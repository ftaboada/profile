import { FC } from 'react'
import styles from '@styles/Button.module.scss'

export const Button: FC<ButtonProps> = ({
    fontSize,
    innerText,
    Icon,
    onClick,
    iconPosition = 'left',
    variant = 'filled',
    color = 'blue',
    shadow = false,
    disabled = false,
}) => {
    const isLeft = iconPosition === 'left'

    return (
        <button
            onClick={onClick}
            className={`${styles[variant]} ${styles[color]} ${
                shadow ? styles.shadow : ''
            }`}
            disabled={disabled}
        >
            {isLeft && Icon && <Icon />}
            <p style={{ fontSize }}>{innerText}</p>
            {!isLeft && Icon && <Icon />}
        </button>
    )
}

interface ButtonProps {
    innerText: string
    onClick(): void
    fontSize?: string
    Icon?: FC
    iconPosition?: 'left' | 'rigth'
    variant?: 'outlined' | 'filled' | 'transparent'
    color?: 'blue' | 'red' | 'green' | 'B&W'
    shadow?: boolean
    disabled?: boolean
}
