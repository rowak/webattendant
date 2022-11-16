describe('First Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Schedule')
  })
})