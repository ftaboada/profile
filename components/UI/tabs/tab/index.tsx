import { FC } from 'react'
import { isStr } from '@helpers'
import style from '@styles/Tab.module.scss'

export const Tab: FC<TabProps> = ({ Option, onChange, isSelected }) => {
    return (
        <button
            onClick={onChange}
            className={isSelected ? style.selected : style.unselected}
        >
            <p>{isStr(Option) ? Option : <Option />}</p>
        </button>
    )
}

interface TabProps {
    Option: string | FC
    onChange(): void
    isSelected: boolean
}
