const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-NG', {
        style: "currency",
        currency: 'NGN',  // Changed to NGN for Nigerian Naira
        minimumFractionDigits: 2
    });

    return formatter.format(num);
}

export default displayINRCurrency;
