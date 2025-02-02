import { FC } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import "./InputField.css"

interface InputFieldProps {
    value: string,
    setValue: (value: string) => void,
    placeholder: string,
    buttonText: string,
    onSubmit: () => void
}

const InputField: FC<InputFieldProps> = ({value, setValue, placeholder, buttonText, onSubmit}) => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                className="inputText"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSubmit()
                    }
                }}
            />
            <Button className="customButton" variant="dark" onClick={() => onSubmit()}>
                {buttonText}
            </Button>
        </InputGroup>
    )
}
export default InputField;