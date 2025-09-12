
import Adoption from "../src/dao/Adoption.js";
import mongoose from "mongoose";
import { expect } from "chai";
import { describe, it, before, after, beforeEach, afterEach } from "mocha";

import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI } = process.env;

before(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conexión a la base de datos exitosa.");
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error.message}`);
    }
});

describe("Test unitarios CRUD para el DAO de Adoption con MOCHA + CHAI", function () {
    this.timeout(5000); //* Va a tener una tolerancia de hasta 5 seg por it (por test)
    const daoAdoption = new Adoption();

    const adoptionMock = {
        owner: new mongoose.Types.ObjectId("689a9131219eaf020a5d16ee"),
        pet: new mongoose.Types.ObjectId("689a8df0efe1d08c22edd354"),
    };

    beforeEach(async () => {
        await mongoose.connection.collection("adoptions").deleteMany({
        owner: adoptionMock.owner,
        });
    });

    afterEach(async () => {
        await mongoose.connection.collection("adoptions").deleteMany({
        owner: adoptionMock.owner,
        });
    });

    it("save() debe crear y devolver una adopción con _id", async () => {
        const result = await daoAdoption.save(adoptionMock);
        expect(result).to.have.property("_id");
        expect(result.owner).to.equal(adoptionMock.owner);
    });

    it("get() debe obtener un arreglo de adopciones", async () => {
        await daoAdoption.save(adoptionMock);
        const result = await daoAdoption.get({});
        expect(result).to.be.an("array");
        expect(result.length).to.be.greaterThan(0);
    });

    it("getBy() debe obtener una única adopción por filtro", async () => {
        const adoption = await daoAdoption.save(adoptionMock);
        const result = await daoAdoption.getBy({ owner: adoptionMock.owner });
        expect(result).to.exist;
        expect(result.owner.toString()).to.equal(adoptionMock.owner.toString());
    });

    it("update() debe modificar una adopción existente", async () => {
        const adoption = await daoAdoption.save(adoptionMock);
        const dataUpdate = { pet: new mongoose.Types.ObjectId("689a9131219eaf020a5d16aa") };
        await daoAdoption.update(adoption._id, dataUpdate);
        const adoptionUpdate = await daoAdoption.getBy({ _id: adoption._id });
        expect(adoptionUpdate.pet.toString()).to.equal(dataUpdate.pet.toString());
    });

    it("delete() debe eliminar una adopción por su id", async () => {
        const adoption = await daoAdoption.save(adoptionMock);
        const deleted = await daoAdoption.delete(adoption._id);
        expect(deleted).to.exist;
        const found = await daoAdoption.getBy({ _id: adoption._id });
        expect(found).to.be.null;
        // assert.equal(found, null, "El usuario ya no debe existir");
    });
});