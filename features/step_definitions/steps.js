const { Given, When, Then, Before } = require('@cucumber/cucumber')
const { assertThat, is } = require('hamjest')

const { Person, Network } = require("../../src/shouty");

Before(function () {
  this.network = new Network();
  this.people = {};
});
Given("a person named {word}", function (name) {
  this.people[name] = new Person(this.network);
});

/*
Given("Lucy is {int} metres from Sean", function (distance) {
  this.network = new Network()
  this.lucy = new Person(this.network)
  this.sean = new Person(this.network)

  this.lucy.moveTo(distance)
});
*/
When("Sean shout(s) {string}", function (message) {
  this.people["Sean"].shout(message);
  this.messageFromSean = message;
});

Then("Lucy should hear Sean's message", function () {
  // Write code here that turns the phrase above into concrete actions
  assertThat(this.people["Lucy"].messagesHeard(), is([this.messageFromSean]));
});
