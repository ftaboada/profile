import React, { FC } from 'react'
import { Tab } from './tab'
import style from '@styles/Tab.module.scss'

export const Tabs: FC<TabsProps> = ({ selected, options, handleChange }) => {
    const innerText = options[selected]
    return (
        <div className={style.container}>
            {options.map((option, idx) => {
                const isSelected = idx === selected
                return (
                    <Tab
                        Option={option}
                        key={idx}
                        onChange={() => handleChange(idx)}
                        isSelected={isSelected}
                    />
                )
            })}
        </div>
    )
}

interface TabsProps {
    selected: number
    options: (string | FC)[]
    handleChange(selection: number): void
}
