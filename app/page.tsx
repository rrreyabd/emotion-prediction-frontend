"use client";

import { useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("english");
  const [prediction, setPrediction] = useState("");
  const [emotion, setEmotion] = useState("");
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: any) => {
    const inputText = e.target.value;
    setText(inputText);

    const words = inputText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleCombinedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleTextChange(e);
    setInputValue(e.target.value);
  };

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict-emotion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue, language }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.message);
        setEmotion(data.emotion);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center gap-16 bg-[#f0f1f2]">
      <div className="w-full h-16 bg-[#008847] flex gap-1 items-center px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile text-white"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 10l.01 0" />
          <path d="M15 10l.01 0" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
        <h1 className="font-bold text-xl text-white">Emotion Prediction</h1>
      </div>
      <div className="w-[85%] lg:w-[70%] h-screen flex flex-col gap-4">
        <div className="w-full h-[75%] rounded-b-2xl shadow-lg shadow-black/10 flex overflow-hidden">
          {/* Input Section */}
          <div className="w-[65%] h-full flex flex-col border-r border-black/5">
            <textarea
              value={text}
              onChange={handleCombinedChange}
              name=""
              id=""
              placeholder="Enter your text here..."
              className="w-full h-[85%] p-6 resize-none bg-white focus:outline-none placeholder:text-xl text-xl"
            />
            <div className="w-full flex justify-between items-center h-[15%] p-6 bg-white">
              <p className="font-semibold">
                {wordCount} {wordCount > 1 ? "Words" : "Word"}
              </p>
              <button
                className="bg-[#008847] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#115735] transition-colors focus:outline-none"
                onClick={handlePredict}
              >
                Predict
              </button>
            </div>
          </div>

          {/* Response Section */}
          <div className="w-[35%] h-full bg-white p-6">
            {emotion && (
              <h1 className="text-center text-xl font-bold mt-4 uppercase">
                {emotion}
              </h1>
            )}
            {prediction && <p className="mt-4">{prediction}</p>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
