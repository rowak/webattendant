
describe('testConflict', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
    
    it('Add 2 conflicting courses ', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.courseInput').clear()
        cy.get('.courseInput').type('CIS*2750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.fc-timegrid-event').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
})

