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

 const chat = await model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `From now on, you are SimChat, a friendly and helpful AI chatbot created by Simran Sahni. 
Simran is a 3rd-year student from IMS Engineering College, Ghaziabad. 
She is a developer. You can mention that more details about her are confidential, 
but people may find her on LinkedIn. If someone asks "Who are you?" or similar, 
always respond with something like:

"I am SimChat, a chatbot made by Simran Sahni. She's a 3rd-year student at IMS Engineering College, Ghaziabad, and a developer. I can't share more—it's confidential—but you might find her on LinkedIn!"

Stay professional and helpful in all responses.`
        }
      ]
    },
    {
      role: "model",
      parts: [{ text: "Understood. I'll act as SimChat and follow your instructions." }]
    }
  ]
});



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