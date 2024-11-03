document.addEventListener('DOMContentLoaded', function() {
    
    const billTotal = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipDisplay = document.getElementById('tipDisplay');
    const tipAmount = document.getElementById('tipAmount');
    const totalWithTip = document.getElementById('totalWithTip');
    const billError = document.getElementById('billError');
    const inputCurrency = document.getElementById('inputCurrency');
    const outputCurrency = document.getElementById('outputCurrency');
    const currencySymbol = document.getElementById('currencySymbol');
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');

    const exchangeRates = {
        USD: 1,
        EUR: 0.91,
        GBP: 0.79,
        JPY: 151.62,
        INR: 83.12
    };

    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        INR: '₹'
    };

    function updateCurrencySymbol() {
        currencySymbol.textContent = currencySymbols[inputCurrency.value];
    }

    function convertCurrency(amount, fromCurrency, toCurrency) {
        const inUSD = amount / exchangeRates[fromCurrency];
        return inUSD * exchangeRates[toCurrency];
    }

    function formatCurrency(amount, currency) {
        let formattedAmount;
        if (currency === 'JPY') {
            formattedAmount = Math.round(amount).toFixed(0);
        } else {
            formattedAmount = amount.toFixed(2);
        }
        return `${currencySymbols[currency]}${formattedAmount}`;
    }

    function updateExchangeRate() {
        const fromCurrency = inputCurrency.value;
        const toCurrency = outputCurrency.value;
        const rate = convertCurrency(1, fromCurrency, toCurrency);
        exchangeRateDisplay.textContent = `1 ${currencySymbols[fromCurrency]} = ${formatCurrency(rate, toCurrency)}`;
    }

    function calculateTip() {
        const billValue = billTotal.value.trim();
        const bill = parseFloat(billValue);
        
        // Update tip percentage display
        tipDisplay.textContent = `${tipSlider.value}%`;

        if (billValue === '' || isNaN(bill) || bill < 0) {
            billError.classList.add('show-error');
            tipAmount.value = '';
            totalWithTip.value = '';
            return;
        }

        billError.classList.remove('show-error');

        const fromCurrency = inputCurrency.value;
        const toCurrency = outputCurrency.value;

        const tipPercent = parseFloat(tipSlider.value);
        const tipValueInput = (bill * tipPercent) / 100;
        const totalInput = bill + tipValueInput;

        const tipValueOutput = convertCurrency(tipValueInput, fromCurrency, toCurrency);
        const totalOutput = convertCurrency(totalInput, fromCurrency, toCurrency);

        tipAmount.value = formatCurrency(tipValueOutput, toCurrency);
        totalWithTip.value = formatCurrency(totalOutput, toCurrency);

        updateExchangeRate();
    }

    // Event listeners
    billTotal.addEventListener('input', calculateTip);
    tipSlider.addEventListener('input', calculateTip);
    inputCurrency.addEventListener('change', function() {
        updateCurrencySymbol();
        calculateTip();
    });
    outputCurrency.addEventListener('change', calculateTip);

    updateCurrencySymbol();
    calculateTip();

function updateCurrencyDisplays() {
    const fromCurrencyDisplay = document.getElementById('fromCurrencyDisplay');
    const toCurrencyDisplay = document.getElementById('toCurrencyDisplay');
    
    fromCurrencyDisplay.textContent = inputCurrency.value;
    toCurrencyDisplay.textContent = outputCurrency.value;
}

function updateExchangeRate() {
    const fromCurrency = inputCurrency.value;
    const toCurrency = outputCurrency.value;
    const rate = convertCurrency(1, fromCurrency, toCurrency);
    exchangeRateDisplay.textContent = formatCurrency(rate, toCurrency);
    updateCurrencyDisplays();
}

inputCurrency.addEventListener('change', function() {
    updateCurrencySymbol();
    calculateTip();
    updateCurrencyDisplays();
});

outputCurrency.addEventListener('change', function() {
    calculateTip();
    updateCurrencyDisplays();
});

updateCurrencyDisplays();
});