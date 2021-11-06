import { FC, useEffect } from 'react'
import { Button } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import style from '@styles/Snackbar.module.scss'

export const Snackbar: FC<SnackBarProps> = ({
    handleClose,
    open,
    message,
    color,
}) => {
    useEffect(() => {
        if (open) {
            setTimeout(handleClose, 5000)
        }
    }, [open])
    if (open) {
        return (
            <div className={style.container}>
                <div className={`${style.snackbar} ${style[color]}`}>
                    <Button
                        onClick={handleClose}
                        Icon={() => <FontAwesomeIcon icon={faTimes} />}
                        variant="transparent"
                    />
                    <p>{message}</p>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
interface SnackBarProps {
    open: boolean
    handleClose(): void
    message: string
    color: 'red' | 'blue' | 'green'
}
