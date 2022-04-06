import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Axios from "axios"
import "./ContactHome.css"

const ContactHome = () => {
  const [contactsList, setContactsList] = useState([])
  const navigate = useNavigate();

  const redirectToUpdate = (id) => navigate('/update/' + id);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllContacts").then((response) => {
      setContactsList(response.data)
    })
  })

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/deleteContact/${id}`).then(() => {
      alert("The selected contacted has been deleted!")
    })
  }

  return (
    <div className="contactsDisplay">
      {contactsList.map((contact) => {
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"http://localhost:3001/" + contact.image} />
            <Card.Body>
              <Card.Title>{contact.firstName + " " + contact.lastName}</Card.Title>
              <Card.Text>Email: {contact.email}</Card.Text>
              <Card.Text>Phone: {contact.phone}</Card.Text>
              <Button className="updateButton" variant="primary" onClick={() => {redirectToUpdate(contact._id)}}>Update</Button>
              <Button className="deleteButton" variant="danger" onClick={() => {deleteContact(contact._id)}} >Delete</Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
};

export default ContactHome;