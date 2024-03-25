const usePhoneFormat = (number: string | number) => {
    const value = number.toString();

    if (value.length === 9) {
        return value.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
    }

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")
}

export default usePhoneFormat;