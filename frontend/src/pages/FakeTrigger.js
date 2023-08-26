import {Button} from "react-bootstrap";

const FakeTrigger = () => {

    const triggerAlarm = async () =>{

        //failsafe for pitch:
        //fake trigger alarm with hardcoded id
        const response = await fetch('/api/rasp/alarm/asdfb', {
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
export default FakeTrigger