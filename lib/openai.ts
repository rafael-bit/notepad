import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(prompt: string) {
	try {
		const response = await openai.createChatCompletion({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
				},
				{
					role: "user",
					content: `Please generate a thumbnail description for my notebook titles ${prompt}`,
				},
			],
		});

		const data = await response.json();
		console.log("OpenAI Response:", JSON.stringify(data, null, 2));

		if (!data || !data.choices || data.choices.length === 0 || !data.choices[0].message) {
			throw new Error("Invalid response from OpenAI API");
		}

		const image_description = data.choices[0].message.content

		return image_description as string;
	} catch (err) {
		console.error("OpenAI API Error:", err);
		return "Default thumbnail description";
	}
}

export async function generateImage(image_description: string) {
	try {
		const response = await openai.createImage({
			prompt: image_description,
			n: 1,
			size: "256x256",
		});
		const data = await response.json();
		const image_url = data.data[0].url;
		return image_url as string;
	} catch (err) {
		console.error(err);
	}
}