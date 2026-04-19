import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";


export default function FeaturedItem(props) {
    
    const [show, setShow] = useState(false);


    return <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "25rem"}}>
        {/* <p>I should display the feature that was passed to me...</p> */}
        <img src={props.img} alt={props.description}/>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{props.name}</p>
        <p><strong>${props.price} per unit</strong></p>
        <p style={{ fontSize: "1rem" }}>{props.description}</p>
        {show && <>
            <p style={{ fontWeight: "bold" }}>Nutrition Facts</p>
            <Table style={{margin: "auto"}}>
                <thead>
                    <tr>
                        <th>Calories</th>
                        <th> Fat</th>
                        <th>Carbohydrates</th>
                        <th>Protein</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.nutrition.calories}</td>
                        <td>{props.nutrition.fat ? props.nutrition.fat : "0g"}</td>
                        <td>{props.nutrition.carbohydrates ? props.nutrition.carbohydrates : "0g"}</td>
                        <td>{props.nutrition.protein ? props.nutrition.protein : "0g"}</td>
                    </tr>
                </tbody>
            </Table>
        </>}
        <Button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"} Nutrition Facts</Button>
    </Card>
}