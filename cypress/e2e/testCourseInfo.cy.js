

describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
      })
    
    it('course info box displays from course list', () => {

        
        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup').first().click()
        cy.get('.courseInfo >  h2').should('contain', 'CIS*3750')
        cy.get('.courseInfo > .sectionDetails >  h3').should('contain', 'Meetings')

    })
    
    it('course info box displays from search course list', () => {

        cy.get('.courseSearchContent >  .courseList > .courseListGroup').first().click()
        cy.get('.courseInfo >  h2').should('contain', 'CIS*3750')
        cy.get('.courseInfo > .sectionDetails >  h3').should('contain', 'Meetings')

    })
    
    it('course info box closes', () => {

        cy.get('.scheduledCoursesList >  .courseList > .courseListGroup').first().click()
        cy.get('.info-modal').click(15,15)
        cy.get('.info-modal').should('not.exist')

    })

})











