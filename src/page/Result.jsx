
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../App";
import supabase from "../supabase";

export default function Result() {
    const { topic, team, chat, channel, code, setCode } = useContext(AppContext);
    const mounted = useRef(false);
    const [result, setResult] = useState(undefined);
    const [totalScore, setTotalScore] = useState([]);
    useEffect(() => {
        if (team) {
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
        
        찬성측 최종 변론:
        반론 내용
        
        반대측 최종 변론:
        반론 내용
        
        최종 평가(JSON 출력):
        {
            score: {
                pos: [ // 찬성측 점수
                    0, // 논리적 일관성: 10점 만점
                    0, //논리적 반박력: 10점 만점
                    0, //주제에 대한 이해도: 10점 만점
                    0, //명확한 주제 전달: 10점 만점
                    0, //표현의 설득력: 10점 만점
                    0, //상대측 주장에 대한 대응력: 10점 만점
                    0, //발언의 일관성: 10점 만점
                    0, //태도: 10점 만점
                    0, //대안 제시 능력: 10점 만점
                    0, //최종 변론의 설득력: 10점 만점
                ]
                neg: [ // 반대측 점수
                    0, // 논리적 일관성: 10점 만점
                    0, //논리적 반박력: 10점 만점
                    0, //주제에 대한 이해도: 10점 만점
                    0, //명확한 주제 전달: 10점 만점
                    0, //표현의 설득력: 10점 만점
                    0, //상대측 주장에 대한 대응력: 10점 만점
                    0, //발언의 일관성: 10점 만점
                    0, //태도: 10점 만점
                    0, //대안 제시 능력: 10점 만점
                    0, //최종 변론의 설득력: 10점 만점
                ]
                
            }
            feedback: {
                pos: [ // 찬성측 피드백
                    ", // 논리적 일관성
                    ", // 논리적 반박력
                    ", // 주제에 대한 이해도
                    ", // 명확한 주제 전달
                    ", // 표현의 설득력
                    ", // 상대측 주장에 대한 대응력
                    ", // 발언의 일관성
                    ", // 태도
                    ", // 대안 제시 능력
                    ", // 최종 변론의 설득력
                ]
                neg: [ // 반대측 피드백
                    ", // 논리적 일관성
                    ", // 논리적 반박력
                    ", // 주제에 대한 이해도
                    ", // 명확한 주제 전달
                    ", // 표현의 설득력
                    ", // 상대측 주장에 대한 대응력
                    ", // 발언의 일관성
                    ", // 태도
                    ", // 대안 제시 능력
                    ", // 최종 변론의 설득력
                ]
        
            }
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
            model.generateContent(content).then((output) => {
                const resultObj = JSON.parse(output.response.text());
                channel.send({
                    type: 'broadcast',
                    event: 'result',
                    payload: { message: resultObj },
                }).then(() => {
                    setResult(resultObj);
                    setTotalScore(() => [resultObj.score.pos.reduce((acc, curr) => acc + curr), resultObj.score.neg.reduce((acc, curr) => acc + curr)])
                    supabase.removeAllChannels();
                });
            });
        }
        else {
            channel.on(
                'broadcast',
                { event: 'result' },
                (payload) => {
                    const resultObj = payload.payload.message
                    setResult(resultObj);
                    setTotalScore(() => [resultObj.score.pos.reduce((acc, curr) => acc + curr), resultObj.score.neg.reduce((acc, curr) => acc + curr)])
                    supabase.removeAllChannels();
                    supabase.from('room_list').delete().eq('id', code).then(() => { });
                }
            );
        }
        setCode("");
    }, []);
    return (
        <>
            {result ?
                <>
                    <h1>승자: {totalScore[0] > totalScore[1] ? "찬성" : totalScore[0] < totalScore[1] ? "반대" : "무승부"}</h1>
                    <h2>찬성측 점수</h2>
                    <h1>총점: {totalScore[0]}</h1>
                    <p>논리적 일관성: {result.score.pos[0]}</p>
                    <p>논리적 반박력: {result.score.pos[1]}</p>
                    <p>주제에 대한 이해도: {result.score.pos[2]}</p>
                    <p>명확한 주제 전달: {result.score.pos[3]}</p>
                    <p>표현의 설득력: {result.score.pos[4]}</p>
                    <p>상대측 주장에 대한 대응력: {result.score.pos[5]}</p>
                    <p>발언의 일관성: {result.score.pos[6]}</p>
                    <p>태도: {result.score.pos[7]}</p>
                    <p>대안 제시 능력: {result.score.pos[8]}</p>
                    <p>최종 변론의 설득력: {result.score.pos[9]}</p>
                    <h2>반대측 점수</h2>
                    <h1>총점: {totalScore[1]}</h1>
                    <p>논리적 일관성: {result.score.neg[0]}</p>
                    <p>논리적 반박력: {result.score.neg[1]}</p>
                    <p>주제에 대한 이해도: {result.score.neg[2]}</p>
                    <p>명확한 주제 전달: {result.score.neg[3]}</p>
                    <p>표현의 설득력: {result.score.neg[4]}</p>
                    <p>상대측 주장에 대한 대응력: {result.score.neg[5]}</p>
                    <p>발언의 일관성: {result.score.neg[6]}</p>
                    <p>태도: {result.score.neg[7]}</p>
                    <p>대안 제시 능력: {result.score.neg[8]}</p>
                    <p>최종 변론의 설득력: {result.score.neg[9]}</p>
                    <h2>찬성측 피드백</h2>
                    <p>논리적 일관성: {result.feedback.pos[0]}</p>
                    <p>논리적 반박력: {result.feedback.pos[1]}</p>
                    <p>주제에 대한 이해도: {result.feedback.pos[2]}</p>
                    <p>명확한 주제 전달: {result.feedback.pos[3]}</p>
                    <p>표현의 설득력: {result.feedback.pos[4]}</p>
                    <p>상대측 주장에 대한 대응력: {result.feedback.pos[5]}</p>
                    <p>발언의 일관성: {result.feedback.pos[6]}</p>
                    <p>태도: {result.feedback.pos[7]}</p>
                    <p>대안 제시 능력: {result.feedback.pos[8]}</p>
                    <p>최종 변론의 설득력: {result.feedback.pos[9]}</p>
                    <h2>반대측 피드백</h2>
                    <p>논리적 일관성: {result.feedback.neg[0]}</p>
                    <p>논리적 반박력: {result.feedback.neg[1]}</p>
                    <p>주제에 대한 이해도: {result.feedback.neg[2]}</p>
                    <p>명확한 주제 전달: {result.feedback.neg[3]}</p>
                    <p>표현의 설득력: {result.feedback.neg[4]}</p>
                    <p>상대측 주장에 대한 대응력: {result.feedback.neg[5]}</p>
                    <p>발언의 일관성: {result.feedback.neg[6]}</p>
                    <p>태도: {result.feedback.neg[7]}</p>
                    <p>대안 제시 능력: {result.feedback.neg[8]}</p>
                    <p>최종 변론의 설득력: {result.feedback.neg[9]}</p>
                    <button onClick={() => window.location.reload()}>메인화면으로 돌아가기</button>
                </>
                :
                <h2>토론 최종 평가 중...</h2>
            }
        </>
    )

}