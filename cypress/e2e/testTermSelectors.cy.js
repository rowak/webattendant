describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        

      })
    
    // Check if states are saved when switching between fall and winter
    it('course info box displays from course list', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        
        cy.get('.term-selectors > .btn-group > .btn.btn-secondary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')

        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()

        cy.get('.term-selectors > .btn-group > .btn.btn-primary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')

        cy.get('.term-selectors > .btn-group > .btn.btn-secondary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')

    })


})