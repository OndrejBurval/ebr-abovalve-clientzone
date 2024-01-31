const configElement = document.querySelector(".clientZoneConfig");

type WebConfig = {
	produktyLink?: string;
};

const useWebConfig = (): WebConfig => {
	if (!configElement) {
		return {};
	}

	try {
		const config = JSON.parse(configElement.innerHTML);
		return { ...config };
	} catch (error) {
		return {};
	}
};

export { useWebConfig };
