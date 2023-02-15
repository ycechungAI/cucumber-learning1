const { Given, When, Then, Before } = require('@cucumber/cucumber')
const { assertThat, is } = require('hamjest')

const { Person, Network } = require("../../src/shouty");

const default_range = 100;

Before(function () {
  this.network = new Network(default_range);
  this.people = {};
});

Given("the range is {int}", function (range) {
  this.network = new Network(range);
});

Given("a person named {word}", function (name) {
  this.people[name] = new Person(this.network, 0);
});

Given("a person named {word} is located at {int}", function (name, location) {
  this.people[name] = new Person(this.network, location);
});

Given("people are located at", function (dataTable) {
  dataTable.hashes().forEach((person) => {
    this.people[person.name] = new Person(this.network, person.location);
  });
});

When("Sean shouts", function () {
  this.people["Sean"].shout("Hello, world");
  this.messageFromSean = "Hello, world";
});

When("Sean shout(s) {string}", function (message) {
  this.people["Sean"].shout(message);
  this.messageFromSean = message;
});

Then("{person} should not hear Sean's message", function (person) {
  assertThat(this.people[person].messagesHeard(), is(this.messageFromSean));
});

Then("Lucy should hear a shout", function () {
  assertThat(this.people["Lucy"].messagesHeard().length, is(1));
});

Then("Lucy should hear Sean's message", function () {
  assertThat(this.people["Lucy"].messagesHeard(), is([this.messageFromSean]));
});

Then("Larry should not hear Sean's message", function () {
  // Write code here that turns the phrase above into concrete actions
  assertThat(this.people["Larry"].messagesHeard(), is([this.messageFromSean]));
});