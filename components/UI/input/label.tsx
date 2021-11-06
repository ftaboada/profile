import React, { FC } from 'react'
import style from '@styles/TextInput.module.scss'

export const Label: FC<LabelProps> = ({ label }) => {
    return <label className={style.label}>{label}</label>
}

interface LabelProps {
    label: string
}
