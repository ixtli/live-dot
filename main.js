'use strict';

require(['config'], function(config)
{
	require.config(config);
	require(['livedot'], function(LiveDOT)
	{
		var v = new LiveDOT();
		var editor = document.getElementById('editor');
		var view = document.getElementById('view');
		v.init(editor, view);
	});
});
