const getPaymentTerm = (term: string) => {
    switch (term) {
        case '14D':
            return '14d';
        case '30D':
            return '30d';
        case '45D':
            return '45d';
        case '60D':
            return '60d';
        case 'BD':
            return 'bd';
        default:
            return 'platebniPodminkyBudouUpresneny';
    }
}

export { getPaymentTerm }