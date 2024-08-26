
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useRef, useState } from "react";

export default function GeminiTest() {
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


토론 주제: 최저임금을 인상해야한다.

찬성측 입론:
1. 최저임금 인상은 저소득층의 생활을 안정시키고, 소득 격차를 완화하며, 소비 촉진을 통해 경제 전체를 활성화합니다.
2. 노동자들의 근로 의욕과 생산성을 높여 기업 경쟁력을 강화하고, 노동력 부족 문제 해소에도 기여합니다.
3. 근로빈곤 문제를 해소하고, 사회적 안전망을 구축하며, 범죄 감소와 사회 안정에 기여합니다.

반대측 입론:
1. 최저임금 인상은 기업의 고용 감소와 투자 감소로 이어져 일자리 감소와 경제 성장 둔화를 초래할 수 있습니다.
2. 최저임금과 생산성 불일치는 저숙련 노동자의 취업 기회 감소, 청년 일자리 감소, 비정규직 증가를 초래할 수 있습니다.
3. 최저임금 인상은 기업의 해외 이전, 무역 적자 증가, 정부 재정 부담 증가를 초래할 수 있습니다.

찬성측 반론:
일자리 감소 논점: 단기적 일자리 감소 가능성 있지만, 정책적 지원과 저소득층 소비 증가로 장기적으로 경제 성장 촉진
저숙련 노동자 취업 감소 논점: 생산성 향상 유도, 예외 규정/단계적 인상/최저 생활임금 제도 도입 고려
기업 경쟁력 약화/정부 재정 부담 논점: 생산성 향상, 해외 이전 방지 정책, 세금 시스템 개선/낭비 지출 감축/재산세 도입 등으로 재정 확보

반대측 반론:
일자리 감소, 경제 성장 둔화: 단기 일자리 감소, 장기 경제 성장 둔화, 물가 상승 우려
저숙련 노동자 취업 감소: 생산성 미달, 청년 일자리 감소, 비정규직 증가 가능성
기업 경쟁력 약화, 정부 재정 부담 증가: 해외 기업 대비 경쟁력 약화, 해외 진출 기회 감소, 정부 재정 부담 증가 우려

찬성측 최종 변론:
반대측 주장 반박: 실증적 연구 및 경험적 사례로 반박, 저소득층 구매력 증가, 생산성 향상, 정부 재정 지원 가능성 강조
긍정적 효과: 사회적 불평등 해소, 노동 생산성 향상, 경제 활성화, 사회적 안전망 강화 기대
사회 정책: 최저임금 인상은 단순 경제 정책이 아닌 사회 정책, 공정하고 정의로운 사회를 위한 필수적 정책

반대측 최종 변론:
장기적 경제 성장 둔화 우려: 기업 투자 감소, 해외 진출 유도, 저숙련 노동자 해고 가능성, 물가 상승
정부 재정 부담 증가: 사회 안전망 사업 투자 제한, 기업 지원 정책 어려움
경제 성장, 일자리 창출, 사회 안전망 고려: 최저임금 인상보다 기업 지원, 직업 훈련, 사회 안전망 사업 확대 필요

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