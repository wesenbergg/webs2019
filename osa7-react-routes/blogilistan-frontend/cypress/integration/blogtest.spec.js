describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('boriss')
  })

  it('login form can be opened', function() {
    cy.contains('login')
  })
})

describe('DB', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'herman4',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('boriss')
  })

  it('login form works', function() {
    cy.get('#username')
      .type('herman4')
    cy.get('#password')
      .type('salasana')
    cy.contains('login')
      .click()
    cy.contains('logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('herman4')
      cy.get('#password')
        .type('salasana')
      cy.contains('login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('logged in')
      cy.contains('herman4')
    })

    it('Kayttajat sivu renderoityy', function() {
      cy.contains('Kayttajat')
        .click()
      cy.contains('Matti Luukkainen')
    })

    it('a new blog can be created', function() {
      cy.contains('Create')
        .click()
      cy.get('#newBlogTitle')
        .type('a blog created by cypress')
      cy.get('#newBlogAuthor')
        .type('a blog created by cypress')
      cy.get('#newBlogURL')
        .type('a blog created by cypress')
      cy.contains('Submit')
        .click()
      cy.contains('a blog created by cypress')
    })
  })

  describe('when added post in', function() {
    beforeEach(function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('herman4')
      cy.get('#password')
        .type('salasana')
      cy.contains('login')
        .click()

      cy.contains('Create')
        .click()
      cy.get('#newBlogTitle')
        .type('a blog created by cypress')
      cy.get('#newBlogAuthor')
        .type('a blog created by cypress')
      cy.get('#newBlogURL')
        .type('a blog created by cypress')
      cy.contains('Submit')
        .click()
    })

    it('a new blog can be liked', function() {
      cy.get('.blogilinkki')
        .click()
      cy.get('.mx-3')
        .click()
      
      cy.contains('1 like(s)')
    })
    
    it('a new blog can be deleted', function() {
      cy.get('.blogilinkki')
        .click()
      cy.get('.delete')
        .click()
      
      cy.get('.hidden')
    })
  })
})