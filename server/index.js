const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const app = express()
const ContactModel = require('./models/Contacts')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})



mongoose.connect("mongodb+srv://wzy:wzy980126@cluster0.joykp.mongodb.net/addressbook?retryWrites=true&w=majority")

app.get("/getAllContacts", async (req, res) => {
    await ContactModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getContact/:id", async (req, res) => {
    try{
        const result = await ContactModel.findById(req.params.id)
        res.status(200).json({
            success: true,
            contact: result,
        })
    } catch (err) {
        console.log(err)
    }
    
})

app.post("/createContact", upload.single('image'), async (req, res) => {
    const contact = req.body
    const newContact = new ContactModel(contact)
    await newContact.save()
    res.json(contact)
})

app.put("/updateContact/:id", async (req, res) => {
    const newFirstName = req.body.firstName
    const newLastName = req.body.lastName
    const newEmail = req.body.email
    const newPhone = req.body.phone
    try{
        await ContactModel.findById(req.params.id, (error, contactToUpdate) => {
            contactToUpdate.firstName = newFirstName
            contactToUpdate.lastName = newLastName
            contactToUpdate.email = newEmail
            contactToUpdate.phone = newPhone
            contactToUpdate.save()
        })
    } catch(err) {
        console.log(err)
    }
    res.send("updated")
})

app.delete("/deleteContact/:id", async (req, res) => {
    await ContactModel.findByIdAndRemove(req.params.id).exec()
    res.send("deleted")
})

app.listen(3001, () => {
    console.log("The server is running on port 3001")
})