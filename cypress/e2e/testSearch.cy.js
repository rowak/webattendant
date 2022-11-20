
describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
    
    it('passes', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('passes', () => {
        cy.get('.courseInput').type('cis*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('passes', () => {
        cy.get('.courseInput').type('cIs*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })
    
    it('passes', () => {
        cy.get('.courseInput').type('CIS3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })

    it('passes', () => {
        cy.get('.courseInput').type('cis3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
    })

    it('passes', () => {
        cy.get('.courseInput').type('Introduction')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > p').should('contain', 'Introduction')
    })


})

