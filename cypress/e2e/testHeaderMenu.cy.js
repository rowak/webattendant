
describe('test error-notification', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        
        /* Add CIS*3750 to Fall schedule before each test */
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
      })

      it('test export to png', () => {

        /* Click clear all terms from the menu*/
        cy.get('#menu-button').click()
        cy.get('#export-menu-item').click()
        cy.readFile('cypress/downloads/Fall2022_Schedule.png').should('exist')
    })  
    
    it('test clear current schedule', () => {
        /* Check if the schedule for the current semester have been cleared */
        cy.get('#menu-button').click()
        cy.get('#clearCurr-menu-item').click()
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')

    })

    it('test clear all schedules', () => {
        /* Go to term Winter and add a course */
        cy.get('.term-selectors > .btn-group > .btn.btn-secondary').first().click()
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > .btn.btn-primary').first().click()
        
        /* Click clear all terms from the menu*/
        cy.get('#menu-button').click()
        cy.get('#clearAll-menu-item').click()

        /* Check if both the terms have been cleared */
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')
        cy.get('.term-selectors > .btn-group > .btn.btn-secondary').first().click()
        cy.get('.scheduledCoursesList >  .courseList > h5 ').should('contain', 'No courses have been added yet!')

    })



})
/* <div role="alert" class="fade alert alert-warning alert-dismissible show" bis_skin_checked="1">
<button type="button" class="btn-close" aria-label="Close alert"></button>
<div class="alert-heading h4" bis_skin_checked="1">Full Schedule</div>
<p>You can only have up to 5 courses selected at once.</p>
</div>*/

