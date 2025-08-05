import { Router } from "express";
import { generatePets, generateUsers } from '../utils/index.js';

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

export default router;