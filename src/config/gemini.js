import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const API_KEY = "AIzaSyCJSvvO7Q0hxTvIecPFw122uEkdwglF7Kg"; 
const MODEL_NAME = "gemini-1.5-flash"; // or another available Gemini model

async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });

    const chat = await model.startChat();

    const result = await chat.sendMessage(prompt);

    const response = result.response;

    console.log(response.text());

    return response.text();
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, something went wrong.";
  }
}

export default runChat;