
describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.Landing > a > .btn').click()
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
      })
    
    // Test if the added course appears in the course list
    it('course add to list', () => {

        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
        cy.get('.fc-event-title').should('contain', 'CIS*3750')

    })

    // Test if the remove button removes the course from the course list        
    it('course add to list then remove', () => {

        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > .btn').first().click()
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')

    })
    


})
