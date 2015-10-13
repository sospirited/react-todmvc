'use strict';

var unexpected = require('unexpected');
var unexpectedReactShallow = require('unexpected-react-shallow');

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var renderer = ReactTestUtils.createRenderer();
var TestUtils = React.addons.TestUtils;
var TodoApp = require('../src/TodoApp.jsx');
var Container = require('../src/Container.jsx');
var TodoHeader = require('../src/TodoHeader.jsx');
var TodoModel = require('../src/TodoModel.js');
var ReactDOM = require('react-dom');
require('chai');


describe('TodoMVC App', function() {

	beforeEach(function() {
		this.timeout(60000);
		localStorage.clear();
	});


	it('only renders a header when there are no items in the list', function() {
		 //Given
		renderer.render(<TodoApp model={new TodoModel()}/>);

		// Then
		expect(renderer, 'to have rendered',
		  <Container componentName="TodoApp">
			<TodoHeader/>
		  </Container>
		);
	});

	// model test
	it('Updates TodoItem when user enters a value via Model', function() {
		//Given
		this.component = TestUtils.renderIntoDocument(<TodoApp model={ new TodoModel() }/>);

		//When
		this.component.addTodo('abcdefg');

		//Then
		expect(this.component.props.model.todos.length).equals(1);
		expect(this.component.props.model.todos[0].title).equals('abcdefg');
	});


	it('Updates TodoItem with Simulated events', function() {
		//Given
		this.component = TestUtils.renderIntoDocument(<TodoApp model={ new TodoModel() }/>);
		this.renderedDOM = ReactDOM.findDOMNode(this.component);


		//When
		var inputDOM = this.renderedDOM.querySelector('.new-todo');
		inputDOM.value = 'ABCDEF';
		TestUtils.Simulate.change(inputDOM);
		TestUtils.Simulate.keyDown(inputDOM, {key: "Enter", keyCode: 13, which: 13});

		//Then
		expect(this.component.props.model.todos[0].title).equals('ABCDEF');
	});



});
