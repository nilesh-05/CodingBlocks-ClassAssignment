class Fetch {
	async getCurrent(input) {
		const myKey = "30c771852c9273b37e357f2a9892dba8";
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=metric`,
		);
		let data = await res.json();
		console.log(data);
		if (data.cod == "404") data = "none";
		return data;
	}
}
