import React, { FC, useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import { TextArea, TextInput, Label, Submit, Snackbar } from '@components/UI'
import style from '@styles/TextInput.module.scss'
import { isValidEmail, isValidName } from 'validations'
import { getSystemErrorMap } from 'util'

export const Contact: FC = () => {
    const formRef = useRef(null)
    const [mailDisabled, setMailDisabled] = useState<boolean>(true)
    const [nameDisabled, setNameDisabled] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [key, setKey] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setDisabled(true)
        const response = await emailjs.sendForm(
            process.env.NEXT_PUBLIC_CONTACT_SERVICE as string,
            process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
            formRef.current as unknown as HTMLFormElement,
            process.env.NEXT_PUBLIC_USER_ID as string
        )
        const { text } = response
        if (text === 'OK') {
            setSuccess(true)
            setKey(!key)
            setMailDisabled(true)
            setNameDisabled(true)
            setDisabled(false)
        } else {
            setError(true)
            setDisabled(false)
        }
    }
    const handleSnackBarClose = () => {
        setError(false)
        setSuccess(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef} key={key.toString()}>
                <div className={style.container}>
                    <Label label="Nombre:" />
                    <TextInput
                        onChange={(s) => setNameDisabled(!isValidName(s))}
                        name="name"
                        placeholder="Ej: 'Jorge Undefined'"
                    />
                </div>
                <div className={style.container}>
                    <Label label="Correo:" />
                    <TextInput
                        onChange={(s) => setMailDisabled(!isValidEmail(s))}
                        name="name"
                        placeholder="Ej: 'NaN@undefined.com'"
                    />
                </div>
                <div className={style.container}>
                    <Label label="Mensaje:" />
                    <TextArea
                        rows={250}
                        cols={18}
                        name="msg"
                        placeholder="Escribe un mensaje"
                    />
                </div>
                <Submit
                    disabled={mailDisabled || nameDisabled || disabled}
                    disabledMessage={`Su${
                        mailDisabled
                            ? ' correo electrónico no es válido'
                            : ' nombre contiene caracteres no permitidos'
                    }.
                 🙏 favor corregir.`}
                />
            </form>
            {success && (
                <Snackbar
                    open={success}
                    handleClose={handleSnackBarClose}
                    message="Su mensaje se ha enviado exitosamente."
                    color="green"
                />
            )}
            {error && (
                <Snackbar
                    open={error}
                    handleClose={handleSnackBarClose}
                    message="Ha ocurrido un error, intente nuevamente."
                    color="red"
                />
            )}
        </>
    )
}
