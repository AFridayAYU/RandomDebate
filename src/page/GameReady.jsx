import ShowTeam from "../components/ShowTeam";

export default function GameReady() {
    const topic = [
        '최저임금을 인상해야 하는가',
        '기후 변화 문제에 대해 개인의 노력이 중요한가',
        '사형제도가 필요한가',
        '온라인 교육이 오프라인 교육보다 효과적인가',
        '소셜미디어는 사회적으로 긍정적인 효과를 보이는가'
    ];

    return (
        <>
        <h2>토론 주제</h2>
        <h2>{topic[Math.floor(Math.random() * topic.length)]}</h2>
        <ShowTeam isPros={Math.floor(Math.random() * 2)} />
        </>
    )
}