import { FC, ChangeEvent } from 'react'
import style from '@styles/TextInput.module.scss'
import { useMode } from 'ctx'

export const TextInput: FC<TextInputProps> = ({
    type = 'text',
    disabled = false,
    placeholder = '',
    onChange,
    name,
}) => {
    const { darkMode } = useMode()
    return (
        <input
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<{ value: string }>) =>
                onChange(e?.target?.value)
            }
            className={`${style.input} ${darkMode ? style.dark : style.light} ${
                style.size
            }`}
            name={name}
        />
    )
}

interface TextInputProps {
    type?: 'text' | 'number' | 'password'
    disabled?: boolean
    placeholder?: string
    onChange(s: string): void
    name: string
}
