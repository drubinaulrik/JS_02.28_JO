import express from 'express'

const app = express()
const PORT = 3000

const users = [
    { firstName: "Harry", lastName: "Potter" },
    { firstName: "Ronald", lastName: "Bilius Weasley" },
    { firstName: "Hermione", lastName: "Jean Granger" },
    { firstName: "Draco", lastName: "Malfoy" },
    { firstName: "Cedric", lastName: "Diggory" },
    { firstName: "Luna", lastName: "Lovegood" },
  ]

app.use(express.json())

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.json({})
    }
    res.status(400).json(users[id])
})

app.post('/users', (req, res) => {
    const {firstName ,lastName} = req.body
    if (!firstName || !lastName){
        return res.status(400).json({ message: "Missing some data"})
    }
    const newUser = {firstName, lastName}
    users.push(newUser)
    res.json(newUser)
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(404).json({ message: "User not found" })
    }
    const {firstName ,lastName} = req.body
    if (!firstName || !lastName){
        return res.json({ message: "Missing some data"})
    }
    users[id] = {firstName, lastName}
    res.json(users[id])
})

app.patch('/users/:id', (req, res) => {
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(200).json({ message: "User not found" })
    }
    const {firstName ,lastName} = req.body
    users[id] = {
        firstName: firstName || users[id].firstName,
        lastName: lastName || users[id].lastName}
    res.json(users[id])
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    if (id < 0 || id >= users.length){
        return res.status(404).json({ message: "User not found" })
    }
    users.splice(id, 1)
    res.json({ message: "Delete successful"})
})

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
})