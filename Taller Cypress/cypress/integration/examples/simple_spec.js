
describe('Creación de cuenta ya existente', function () {
    it('Creación de cuenta ya existente', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.contains('Ingresar').click();
        cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Jose Fabian");
        cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Laverde Triana");
        cy.get('.cajaSignUp').find('input[name="correo"]').click().type("jf.laverde@uniandes.edu.co");
        cy.get('.cajaSignUp').find('select[name="idUniversidad"]').select("Universidad de los Andes");
        cy.get('.cajaSignUp').find('select[name="idPrograma"]').select("Administración");
        cy.get('.cajaSignUp').find('input[name="password"]').click().type("12345678");
        cy.get('.cajaSignUp').find('input[name="acepta"]').click();
        cy.get('.cajaSignUp').find('.logInButton').click();
        cy.get('.sweet-alert', { timeout: 15000 }).contains('Ocurrió un error activando tu cuenta').should((container) => {
            expect(container).to.exist
        })

    })
});

describe('Pruebe el login correcto', function () {
    it('Pruebe el login correcto', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.contains('Ingresar').click();
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type("jf.laverde@uniandes.edu.co");
        cy.get('.cajaLogIn').find('input[name="password"]').click().type("12345678");
        cy.get('.cajaLogIn').contains('Ingresar').click();
        cy.get('#cuenta', { timeout: 10000 }).should((container) => {
            expect(container).to.exist
        })
    })
});

describe('Busqueda de profesores', function () {
    it('Busqueda de profesores', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-control').click()
        cy.focused().type("Mario Linares Vasquez", { force: true });
        cy.get('.Select-menu-outer', { timeout: 10000 }).contains('Mario Linares Vasquez - Ingeniería de Sistemas', { timeout: 10000 }).should((container) => {
            expect(container).to.exist
        })
    })
});

describe('Dirigirse a la página de un profesor', function () {
    it('Dirigirse a la página de un profesor', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-control').click()
        cy.focused().type("Mario Linares Vasquez", { force: true });
        cy.get('.Select-menu-outer', { timeout: 10000 }).contains('Mario Linares Vasquez - Ingeniería de Sistemas', { timeout: 10000 }).click();
        cy.get('.nombreProfesor', { timeout: 10000 }).should((container) => {
            expect(container.text()).to.eq("Mario Linares Vasquez");
        })
    })
});

describe('Filtros por materia en la página de un profesor', function () {
    it('Filtros por materia en la página de un profesor', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-control').click()
        cy.focused().type("Mario Linares Vasquez", { force: true });
        cy.get('.Select-menu-outer', { timeout: 10000 }).contains('Mario Linares Vasquez - Ingeniería de Sistemas', { timeout: 10000 }).click();
        cy.get('.materias', { timeout: 15000 }).find('input').first().click();
        cy.get('.post').find(".carreraCalificacion").contains('Constr. Aplicaciones Móviles', { timeout: 10000 }).should((container) => {
            expect(container.text()).to.eq("Constr. Aplicaciones Móviles");
        })

    })
});
