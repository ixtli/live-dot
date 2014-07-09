'use strict';

define(function(require)
{


var $ = require('jquery');
var ace = require('ace');
var dot = require('dot-lib');
var d3 = window.d3;
var dagre = require('dagre-d3');

function transition(selection)
{
	return selection.transition().duration(500);
}



function LiveDOT()
{
	this.svgElement = null;
	this.editor = null;
}


LiveDOT.prototype.init = function(editorElement, viewElement)
{
	this.editor = ace.edit(editorElement);
	this.editor.setTheme('ace/theme/monokai');
	this.editor.getSession().setMode('ace/mode/dot');
	this.editor.on('change', this.onChange.bind(this));

	this.svgElement = $(viewElement).children('svg')[0];

	return this;
};


LiveDOT.prototype.onChange = function(diff)
{

	var raw = this.editor.getValue();

	var parseOutput = null;

	try {
		parseOutput = dot.parse(raw);
	} catch (e) {

	}

	if (!parseOutput)
	{
		return;
	}

	var svg = d3.select(this.svgElement);
	var renderer = new dagre.Renderer();

	renderer.transition(transition);
	var layout = renderer.run(parseOutput, d3.select('svg g'));
};


return LiveDOT;


});
