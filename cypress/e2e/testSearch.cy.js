
describe('testSearch', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.Landing > a > .btn').click()
      })
    
    // Check if course is found with regular search query
    it('regular search', () => {
        cy.get('.courseInput').type('CIS*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
    })
    
    // Check if course is found with all lowercase search query
    it('lowercase search', () => {
        cy.get('.courseInput').type('cis*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
    })
    
    // Check if course is found with some capitalized and some lowercase letters in search query
    it('irregular capitalization', () => {
        cy.get('.courseInput').type('cIs*3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
    })
    
    // Check if course is found with no asterisk
    it('no asterisk', () => {
        cy.get('.courseInput').type('CIS3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
    })

    // Check if course is found with all lowercase search query and no asterisk
    it('lowercase no asterisk', () => {
        cy.get('.courseInput').type('cis3750')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > div > h5').should('contain', 'CIS*3750')
    })

    // Check if the course is found with partial course name
    it('introduction', () => {
        cy.get('.courseInput').type('Introduction')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > .courseListGroup > .courseListItem > div > p').should('contain', 'Introduction')
    })

    // Check if no course is found when invalid input is given
    it('Check for no courses found on invalid input', () => {
        cy.get('.courseInput').type('!!!##$%&@*^#&*^&*!*&*(&*(!@')
        cy.get('.courseSearchContent > .mb-3 > .btn').click()
        cy.get('.courseSearchContent >  .courseList > h5 ').should('contain', 'No courses found.')
    })

})

