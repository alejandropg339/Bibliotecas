const {updateDocument,createDocument,createFolder,deleteDocument} = require("../js/trys");


describe("Bibliotecas", () => {

    //TODO: CREATE FOLDERS

    test("Succes folder created!", async () => {

        const method = await createFolder("Dory");

        try {

            expect(method).toBe("Creacion exitosa");

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: CREATE DOCUMENT

    test("Succes document created!", async () => {

        const method = await createDocument("Jest", 16, "Estas pruebas fueron realizadas utilizando jest");

        try {

            expect(method).toBe("Creacion exitosa");

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: UPDATE DOCUMENT

    test("Succes document updated!", async () => {

        const method = await updateDocument("Jest", 16, "El contenido de jest lo estoy modificando nuevamente", 101);

        try {

            expect(method).toBe("Succes operation");

        } catch (error) {
            console.log(error);
        }
    });

    //TODO: DELETE DOCUMENT

    // test("Success document deleted!", async () => {

    //     const method = await deleteDocument(101);

    //     try {

    //         expect(method).toBe("Operación exitosa");

    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


});
