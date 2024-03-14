const useCurrency = (price: number, currency?: string, localeCode?: string) => {
    const locale = localeCode ? localeCode :'cs-CZ';

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency ? currency : 'CZK',
    });

    return formatter.format(price);
}

export default useCurrency;