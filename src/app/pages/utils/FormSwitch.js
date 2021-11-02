import React, {useState} from 'react'
import Switch from "react-switch";

export const FormSwitch = ({setFieldValue, name, value}) => {
    const [checked, setChecked] = useState(true);
    const handleChange = () => {
        setChecked(!checked);
        setFieldValue(name, !checked);
    }

    let defaultValue;

    if ( value && value === "Y") {
        defaultValue = true;
    } else if ( value && value === "N" ) {
        defaultValue = false;
    } else {
        defaultValue = true;
    }
    return (
        <div>
            <Switch
                checked={defaultValue}
                onChange={handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id={name}
            />
        </div>
    )
}
