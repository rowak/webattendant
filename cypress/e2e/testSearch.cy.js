
describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
    
    it('regular search', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('lowercase search', () => {
        cy.get('.courseInput').type('cis*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('irregular capitalization', () => {
        cy.get('.courseInput').type('cIs*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('no asterisk', () => {
        cy.get('.courseInput').type('CIS3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })

    it('lowercase no asterisk', () => {
        cy.get('.courseInput').type('cis3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })

    it('introduction', () => {
        cy.get('.courseInput').type('Introduction')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > p').should('contain', 'Introduction')
    })

    it('Check for no courses found on invalid input', () => {
        cy.get('.courseInput').type('!!!##$%&@*^#&*^&*!*&*(&*(!@')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > h5 ').should('contain', 'No courses found.')
    })

})

