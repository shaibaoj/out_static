
define([ ], function() {
	return {
		css:function(path){
			if(path && path.length > 0){
				var head = document.getElementsByTagName('head')[0];
			    var link = document.createElement('link');
			    link.href = path;
			    link.rel = 'stylesheet';
			    link.type = 'text/css';
			    head.appendChild(link);
			}
		}
	};
});