const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

const api_key = '767805956d468280d49b1ff1'; 
const api_url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/INR`;


fetch(api_url)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            const fromOption = document.createElement('option');
            fromOption.value = currency;
            fromOption.text = currency;
            fromSelect.add(fromOption);

            const toOption = document.createElement('option');
            toOption.value = currency;
            toOption.text = currency;
            toSelect.add(toOption);
        });
    })
    .catch(error => console.error('Error fetching API:', error));

convertButton.addEventListener('click', convertCurrency);

function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = 'Please enter a valid amount.';
        return;
    }

     fetch(`https://v6.exchangerate-api.com/v6/${api_key}/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[to];

            if (rate) {
                const result = amount * rate;
                resultDiv.innerHTML = `<strong>${amount} ${from} = ${result.toFixed(2)} ${to}</strong>`;
            } else {
                resultDiv.innerText = 'Conversion rate not found.';
            }
        })
        .catch(error => {
            resultDiv.innerText = 'Error fetching conversion rate.';
        });
}