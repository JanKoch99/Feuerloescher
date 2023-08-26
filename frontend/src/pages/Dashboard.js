import {useAuthContext} from "../hooks/useAuthContext";
import {useEffect, useState} from "react";
import {config} from "../Constants";

const Dashboard = () => {
    const {user} = useAuthContext()
    const {smokeDetectors, setSmokeDetectors} = useState([])
    const URL = config.url

    useEffect(() => {
        const fetchSmokeDetectors = async () => {
            const response = await fetch(`${URL}/api/device/devicesForUser/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setSmokeDetectors(json)
            }
        }

        const deleteDevice = async () => {
            const response = await fetch(`${URL}/api/device/delete/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                const smokeDetectors = smokeDetectors
                setSmokeDetectors(smokeDetectors.remove(json))
            }
        }

        if (user) {
            fetchSmokeDetectors()
        }
    })

    return(
        <div className="dashboard">
            <div className="overview">

            </div>
            <div className="layout">

            </div>
            <div className="smokeDetectors">
                {smokeDetectors && smokeDetectors.map((smokeDetector) => (
                    Test
                ))}
            </div>
        </div>
    )
}

export default Dashboard