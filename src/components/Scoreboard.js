import { getDisplayDistance } from "../utils/geoDistance";

const ScoreBoard = ( {distance, scores, round, isLastRound} ) => {
    const totalScore = scores.reduce((total, curr) => total + curr, 0);
    const finalScores = (<>
        <h5>- Score Board -</h5>
        <ol>
            {scores.map((score, i) => {
                return (<li key={i}>{`round: ${score}`}</li>)
            })}
        </ol>
    </>);
    
    return (<>
        Distance: {getDisplayDistance(distance)}
        <br />
        Score: {scores[round]}
        <br />
        Total Score: {totalScore}
        <br />
        <br />
        {isLastRound && finalScores}
    </>)
}

export default ScoreBoard;