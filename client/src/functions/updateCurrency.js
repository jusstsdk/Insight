import axios from "axios";

export default async function updateCurrency(user) {
    if (!user.country) user.country = "USA";

			const responseCountryApi = await axios.get(
				`https://restcountries.com/v3.1/name/${user.country}`
			);

			const localCurrency = Object.keys(
				responseCountryApi.data[0].currencies
			)[0];

			user.currency = localCurrency;

			const responseExchangeRate = await axios.get(
				"https://api.apilayer.com/exchangerates_data/latest",
				{
					headers: {
						apikey: "XTIzFlOQ4PrtkEONKNHVZ3ztZFOzhLhA",
					},
					params: {
						base: "USD",
					},
				}
			);
			const exchangeRate = responseExchangeRate.data.rates[localCurrency];

			user.exchangeRate = exchangeRate;
            return user;
}