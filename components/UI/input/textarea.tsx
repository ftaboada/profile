import { FC } from 'react'
import style from '@styles/TextInput.module.scss'
import { useMode } from 'ctx'

export const TextArea: FC<TextAreaProps> = ({
    rows,
    cols,
    placeholder = '',
    required = false,
    name,
}) => {
    const { darkMode } = useMode()
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            cols={cols}
            rows={rows}
            required={required}
            className={`${style.input} ${darkMode ? style.dark : style.light} ${
                style.areaSize
            }`}
        ></textarea>
    )
}

interface TextAreaProps {
    cols: number
    rows: number
    placeholder?: string
    required?: boolean
    name: string
}
