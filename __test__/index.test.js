const createFolder = require("../js/trys");

describe("Bibliotecas", () => {
    test("Succes folder created!", async () => {

        const method = await createFolder("Dory");

        try {

            expect(method).toBe("Creacion exitosa");

        } catch (error) {
            console.log(error);
        }
    });
});
