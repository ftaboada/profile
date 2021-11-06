const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
}
const isValidName = (name: string) => {
    return /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(
        name
    )
}

export { isValidEmail, isValidName }
