describe('testSchedule', () => {
  // Test if the schedule appears
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Schedule')
  })
})
