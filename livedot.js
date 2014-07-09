'use strict';

define(function(require)
{

// Currently Dagre-D3 doesn't play well with amd loaded d3 despite being an
// amd module itself :)
// Relevant issue: https://github.com/cpettitt/dagre-d3/issues/50
var d3 = window.d3;

// We use libraries to do things for fun and profit
var $ = require('jquery');
var ace = require('ace');
var dot = require('dot-lib');
var dagre = require('dagre-d3');


/**
 * Reusable transition function
 * @param  {Object} selection a D3 DOM selection
 */
function transition(selection)
{
	return selection.transition().duration(500);
}



/**
 * A constructor that manages the view and the editor
 * @constructor
 */
function LiveDOT()
{
	this.svgElement = null;
	this.editor = null;
}


/**
 * Initialize the editor with a DOM element for the view and the editor
 * @param  {HTMLElement} editorElement element into which the editor will be put
 * @param  {HTMLElement} viewElement   svg element into which the graph will be
 * rendered by dagre
 * @return {LiveDOT}                   This instance
 */
LiveDOT.prototype.init = function(editorElement, viewElement)
{
	// Create the ace editor and save it
	this.editor = ace.edit(editorElement);
	this.editor.setTheme('ace/theme/monokai');
	this.editor.getSession().setMode('ace/mode/dot');
	this.editor.on('change', this.onChange.bind(this));

	// Grab the svg element and add the g tag
	this.svgElement = $(viewElement).children('svg')[0];

	return this;
};


/**
 * Editor on-change callback that re-renders the graph and transitions it iff
 * the content itself is a valid dot diagram
 * @param  {Object} diff ace gives us a diff since last event was fired
 */
LiveDOT.prototype.onChange = function(diff)
{
	// The raw DOT language text from the editor
	var raw = this.editor.getValue();

	// JavaScript is a Fun language!
	var parseOutput = null;

	// This DOT parser throws exceptions for errors for some reason!
	// If this doesn't get caught, the event doesn't complete and ace poops.
	try {
		// Save it if it works
		parseOutput = dot.parse(raw);
	} catch (e) {
		// Nothing more to do if we have invalid syntax
		return;
	}

	// Make a selection and a new renderer
	var svg = d3.select(this.svgElement);
	var renderer = new dagre.Renderer();

	// Transition whats in the renderer
	renderer.transition(transition);

	// Layout the new graph into the old one's container
	var layout = renderer.run(parseOutput, d3.select('svg g'));
};

return LiveDOT;

});
