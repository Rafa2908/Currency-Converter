const fromExchange = document.getElementById("currency-option1");
const toExchange = document.getElementById("currency-option2");
const convertButton = document.querySelector(".convert-btn");

let country_code = {
  BRL: "BR",
  CAD: "CA",
  CNY: "CN",
  DOP: "DO",
  EUR: "FR",
  GBP: "GB",
  JPY: "JP",
  MXN: "MX",
  RUB: "RU",
  USD: "US",
};

const dropList = document.querySelectorAll(".currency select");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "DOP" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
}

convertButton.addEventListener("click", () => {
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.getElementById("currency-input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  let apiKey = "053731e9af182a6578946d39";
  let convertedUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromExchange.value}`;
  fetch(convertedUrl).then((response) =>
    response.json().then((result) => {
      let exchangeRate = result.conversion_rates[toExchange.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      const exchangeRateText = document.querySelector(".currency-display");
      exchangeRateText.innerHTML = `$${totalExchangeRate} ${toExchange.value}`;
    })
  );
}
