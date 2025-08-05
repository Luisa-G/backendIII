import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

import { fakerES as faker } from "@faker-js/faker";

export function generatePets() {
    let pets = [];
    let cantPets = 100;
    for (let index = 0; index < cantPets; index++) {
        const newPet = {
            _id: faker.string.uuid(),
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate({ mode: 'age', min: 0.5, max: 100}),
            adopted: false,
            image: faker.string.alphanumeric(10)
        };
        pets.push(newPet);
    };
    return pets;
}