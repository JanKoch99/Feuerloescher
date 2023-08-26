import {Button} from "react-bootstrap";
import {config} from "../Constants";

const TestingTool = () => {

    const URL = config.url
    const triggerAlarm = async () =>{

        //fake trigger alarm with hardcoded id
        const response = await fetch(`${URL}/api/rasp/alarm/asdfb`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

    }

    return (
        <div>
            <Button onClick={triggerAlarm}>Trigger Alarm</Button>
        </div>
    )
}
export default TestingTool