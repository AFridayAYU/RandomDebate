
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../App";

export default function GeminiTest() {
    const {setPage, topic, team, chat, setChat, channel} = useContext(AppContext);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
    const config = {
        "temperature": 1,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
        "response_mime_type": "application/json"
    }
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: config,
    });
    const content = `
토론 주제: 주제

찬성측 입론:
입론 내용

반대측 입론:
입론 내용

찬성측 반론:
반론 내용

반대측 반론:
반론 내용

찬성측 최종 반론:
반론 내용

반대측 최종 반론:
반론 내용

최종 평가(JSON 출력):
{
	score: [
		// 내용 관련성 및 논리적 사고력 (40%), 의사소통 능력 (30%), 태도 및 참여도 (30%)
		0, // 찬성 측 점수 (100점 만점)
		0 // 반대 측 점수 (100점 만점)
	],
	feedback: [
		"", // 찬성 측에 대한 평가 및 피드백 (반대측 평가 금지)
		"" // 반대 측에 대한 평가 및 피드백 (찬성측 평가 금지)
	]
}


토론 주제: ${topic}

${chat[0]}

${chat[1]}

${chat[2]}

${chat[3]}

${chat[4]}

${chat[5]}

최종 평가(JSON 출력):

위 형식에 따라 JSON 내용을 출력해줘.
    `
    const mounted = useRef(false);
    const [result, setResult] = useState(undefined);
    useEffect(() => {
        model.generateContent(content).then((output) => setResult(JSON.parse(output.response.text())));
    }, []);
    return (
        <>
            {result ? 
            <>
                <h1>승자: {result.score[0] > result.score[1] ? "찬성" : "반대"}</h1>
                <h2>찬성측 점수</h2>
                <h1>{result.score[0]}</h1>
                <h2>반대측 점수</h2>
                <h1>{result.score[1]}</h1>
                <h2>찬성측 피드백</h2>
                <p>{result.feedback[0]}</p>
                <h2>반대측 피드백</h2>
                <p>{result.feedback[1]}</p>
            </>
            :
            <h2>토론 최종 평가 중...</h2>
            }
        </>
    )

}