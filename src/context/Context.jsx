
import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing animation
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord + " ");
    }, 75 * index);
  };
  const newChat =()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setLoading(true);
    setResultData("");
    setShowResult(true);

    let finalPrompt = prompt !== undefined ? prompt : input;
    setRecentPrompt(finalPrompt);

    // ✅ Add prompt only once
    setPrevPrompts((prev) => {
      if (!prev.includes(finalPrompt)) {
        return [...prev, finalPrompt];
      }
      return prev;
    });

    try {
      const response = await runChat(finalPrompt);
      const responseArray = response.split("");

     let newResponse = "";

for (let i = 0; i < responseArray.length; i++) {
  if (i % 2 === 1) {
    newResponse += `<span style="color:white">${responseArray[i]}</span>`;
  } else {
    newResponse += responseArray[i];
  }
}


      const newResponse2 = newResponse.split("*").join("<br>");
      const words = newResponse2.split(" ");

      for (let i = 0; i < words.length; i++) {
        delayPara(i, words[i]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setResultData("Something went wrong");
    }

    setLoading(false);
    setInput("");
  };

  // ✅ THIS WAS MISSING IN YOUR CODE!
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;