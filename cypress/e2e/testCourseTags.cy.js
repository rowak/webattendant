
describe('testCourseTags', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.Landing > a > .btn').click()
        cy.get('.courseInput').type('COOP*1100')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()

      })
    
    it('test if the tags are displayed', () => {

        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem div').should('contain', 'No Meetings')
        
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup > .courseListItem div').should('contain', 'No Exam')

    })

})
