// JavaScript Document

var startup = {
	index: 0,
	
	tasklist: Array(),
	
	add: function( func, arg ){
		this.tasklist[this.index++] = {'func':func, 'arg':arg};
	},
	
	run: function(){
		
		if( this.tasklist.length <= 0 )  return;
		
		/*this.tasklist.forEach(function( func ){
			func['func'].apply( this, func['arg'] );
		});*/
		
		for( var i=0; i<this.tasklist.length; i++ ){
			this.tasklist[i]['func'].apply( this.tasklist[i]['func'], this.tasklist[i]['arg'] );
		}
	}
	
	/*scrollindex: 0,
	
	scrolltasklist: Array(),
	
	scroll: function( func, arg ){
		this.scrolltasklist[this.scrollindex++] = {'func':func, 'arg':arg, 'argc':arg.length};
	},
	
	move: function(e){
		
		if( this.scrolltasklist.length <= 0 )  return;
		
		var evt = e;
		this.scrolltasklist.forEach(function( func ){
			func['arg'][ func['argc'] ] = evt;
			func['func'].apply( this, func['arg'] );
		});
	}*/
};