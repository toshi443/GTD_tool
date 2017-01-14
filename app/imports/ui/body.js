import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
})

Template.body.helpers({
  tasks(){
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: 1}} );
    },
});

Template.body.helpers({
  finished(){
    return Tasks.find({ checked: { $ne: false } }, { sort: { createdAt: 1}} );
  },
});


Template.body.events({
  'submit .new-task'(event){
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call('tasks.insert', text);
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance){
    instance.state.set('hideCompleted', event.target.checked);
  },
});
