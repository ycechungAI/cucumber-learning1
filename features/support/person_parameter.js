const Person = require('../../src/shouty')
const { defineParameterType } = require('@cucumber/cucumber')

defineParameterType({
  name: 'person',
  regexp: /Lucy|Sean/,
  transformer: name => new Person(name)
})