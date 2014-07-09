'use strict';

define(function(require)
{

// Make hosting someone elses problem
var prefix = '//cdnjs.cloudflare.com/ajax/libs/';
var cpettitt = '//cpettitt.github.io/project/';

var config = {

	// Everything sucks at AMD
	shim: {
		'jquery': { exports: 'jQuery'},
		'dagre-d3': { exports: 'dagreD3' },
		'dot-lib': { exports: 'graphlibDot' },

		// The CDN version of ace doesn't like amd either :(
		'ace': { exports: 'ace' }
	},

	paths: {
		'jquery': prefix + 'jquery/2.1.1/jquery.min',
		'dot-lib': cpettitt + 'graphlib-dot/latest/graphlib-dot.min',
		'dagre-d3': cpettitt + 'dagre-d3/latest/dagre-d3.min',
		'ace': prefix + 'ace/1.1.3/ace'
	}
};

return config;

});
