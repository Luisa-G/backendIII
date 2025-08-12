import { Router } from "express";
import { generatePets, generateUsers } from '../utils/index.js';
import petModel from '../dao/models/Pet.js'
import userModel from '../dao/models/User.js'


const router = Router();

router.get('/mockingpets', (req, res) => {
    try {
        let pets = generatePets()
        res.send(pets)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/mockingusers', (req, res) => {
    try {
        let users = generateUsers()
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
})


router.post('/generateData', async (req, res) => {
    try {

        const { pets = 0, users = 0 } = req.body

        const petsArray = pets > 0 ? generatePets(pets) : []
        const usersArray = users > 0 ? generateUsers(users) : []
        
        const newPets = await petModel.insertMany(petsArray)
        const newUsers = await userModel.insertMany(usersArray)

        res.status(201).send({
            status: 'success',
            message: 'Datos generados e insertados de forma exitosa',
            inserted: {
                pets: newPets.length,
                users: newUsers.length
            }
        })


    } catch(error) {
        res.status(500).send(error)
    }
})


export default router;