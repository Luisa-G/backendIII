import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { fakerES as faker } from "@faker-js/faker";

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


// MOCKINGS

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

export function generateUsers() {
    let users = [];
    let cantUsers = 50;
    for (let index = 0; index < cantUsers; index++) {
        let first_name = faker.person.firstName();
        let last_name = faker.person.lastName();
        const newUser = {
            _id: faker.string.uuid(),
            first_name,
            last_name,            
            email: faker.internet.email({ firstName: first_name, lastName: last_name }),
            password: 'coder123', //TODO Encriptado
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        }
        users.push(newUser);
    }
    return users;
}


let users = generateUsers()
console.log(users)
