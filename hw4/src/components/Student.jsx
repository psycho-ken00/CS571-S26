
const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! Do NOT modify the element above that displays the name.*/}
        <strong>{props.major}</strong>
        <br /><br />
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin ? "is" : "is NOT"} from Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map(i => <li key={i}>{i}</li>)}
        </ul>
    </div>
}

export default Student;