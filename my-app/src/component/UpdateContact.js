import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import "./CreateContact.css"
import Axios from "axios"


function UpdateContact() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageName, setImageName] = useState("")
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get("http://localhost:3001/getContact/" + param.id).then((response) => {
            setFirstName(response.data.contact.firstName)
            setLastName(response.data.contact.lastName)
            setEmail(response.data.contact.email)
            setPhone(response.data.contact.phone)
        })
    }, [])


    const handleSubmit = () => {
        Axios.put("http://localhost:3001/updateContact/" + param.id, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            // image: imageName
        }).then((response) => {
            alert("The Current Contact Has Been Updated!")
            navigate('/')
        })
    }

    return (
        <div className="information">

            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Upload Image" onChange={(e) => { 
                    setSelectedImage(e.target.files[0]) 
                    setImageName(e.target.files[0].name)
                    console.log(e.target.files[0].name)
                    }} />
            </Form.Group> */}

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

export default UpdateContact