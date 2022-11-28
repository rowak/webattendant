describe('testSchedule', () => {
  // Test if the schedule appears
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.Landing > a > .btn').click()
    cy.contains('Schedule')
  })
})
