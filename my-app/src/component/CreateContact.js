import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateContact.css"
import Axios from "axios"


function CreateContact() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageName, setImageName] = useState("")
    const navigate = useNavigate()


    const emailVerification = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) {
            return false;
        }
        return true;
    }

    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false);
    }

    const handleSubmit = () => {
        if (!emailVerification(email)) {
            alert("Pleasse input the correct email address!")
        } else if (!phoneValidation(phone)) {
            alert("Please input the correct phone number!")
        } else {
            Axios.post("http://localhost:3001/createContact", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                // image: imageName
            }).then((response) => {
                alert("New Contact Created!")
                navigate('/')
            })
        }
    }


    return (
        <div className="information">

            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" onChange={(e) => { setFirstName(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => { setLastName(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Phone Number" onChange={(e) => { setPhone(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Upload Image" onChange={(e) => { 
                    setSelectedImage(e.target.files[0]) 
                    setImageName(e.target.files[0].name)
                    console.log(e.target.files[0].name)
                    }} />
            </Form.Group>

            {selectedImage && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>

        </div>

    )
}

export default CreateContact