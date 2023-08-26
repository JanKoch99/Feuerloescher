import {Button} from "react-bootstrap";
import {config} from "../Constants";

const TestingTool = () => {

    const URL = config.url
    const triggerAlarm = async () =>{

        //fake trigger alarm with hardcoded id
        await fetch(`${URL}/api/rasp/alarm/z76tuhgb6z7tuhg76zu8th`, {
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