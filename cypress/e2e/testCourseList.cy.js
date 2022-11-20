
describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
    
    it('course add to list', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()

        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > div > h5').should('contain', 'CIS*3750')
        cy.get('.fc-event-title').should('contain', 'CIS*3750')

    })

        
    it('course add to list', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()

        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > .btn').first().click()
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')

    })
    


})
