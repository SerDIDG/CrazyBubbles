/* ******* Crazy Bubbles   ******* */
/* ******* @ Serhio Magpie ******* */

/* serdidg@gmail.com      */
/* http://screensider.com */

var Layout = function(o){
	var that = this,
		config = _.merge({
			'count' : 100,
			'colors' : ['#ca6464', '#ee0909', '#4d0404', '#fed6d6', '#bb3ea5', '#ff00d2', '#650955', '#8f09ec', '#cb89f9', '#ddcce9', '#0000ff', '#8c8cf1', '#00006a', '#00ccff', '#e3f9ff', '#50a6bc', '#00fcff', '#00ffb4', '#aefde6', '#0d926b', '#00ff18', '#92f59b', '#e4ffe7', '#43a04b', '#78ff00', '#87bc58', '#3b7805', '#d2ff00', '#edfab0', '#c2cf83', '#fff000', '#faf7c9', '#c1b93d', '#ffb400', '#fdeabd', '#ba9949'],
			'min' : 500,
			'max' : 2000,
			'minSize' : 10,
			'maxSize' : 50
		}, o),
		nodes = {
			'border' : null,
			'bubbles' : []
		},
		colors = config['colors'].length,
		pageSize;
		
	/* Border */
	
	var initBorderBubbles = function(){
		nodes['border'] = document.body.appendChild(_.node('div', {'class':'bubble-border'}));
		renderBorderBubbles();
		setInterval(function(){
			config['min'] = _.rand2(0, 1000);
			config['max'] = _.rand2(500, 2000);
		}, _.rand2(0, 5000));
	};
	
	var renderBorderBubbles = function(){
		// Clear
		_.clearNode(nodes['border']);
		nodes['bubbles'] = [];
		// Get window size
		getPageSize();
		// Render bubbles
		for(var i = 0; i < config['count']; i++){
			nodes['bubbles'].push(renderBubble());
		}
		// Animate
		animateBubles();
	};
	
	var getPageSize = function(){
		pageSize = _.getPageSize();
		pageSize['viewWidth'] = pageSize['width'] - config['maxSize'];
		pageSize['viewHeight'] = pageSize['height'] - config['maxSize'];
	}
	
	var renderBubble = function(){
		var bubble = nodes['border'].appendChild(_.node('div', {'class':'bubble'})),
			size = _.rand2(config['minSize'], config['maxSize']);
		bubble.style.width = size + 'px';
		bubble.style.height = size + 'px';
		bubble.style.borderRadius = config['maxSize'] + 'px';
		bubble.style.top = (pageSize['height'] - size)/2 + 'px';
		bubble.style.left = (pageSize['width'] - size)/2  + 'px';
		
		return bubble;
	};
	
	var animateBubles = function(){
		for(var i = 0, l = nodes['bubbles'].length; i < l; i++){
			animateBubble(nodes['bubbles'][i]);
		}
	};
	
	var animateBubble = function(el){
		var size = _.rand2(config['minSize'], config['maxSize']),
			style = [
				['background-color', config['colors'][_.rand(0, colors-1)], ''],
				['left', _.rand2(0, pageSize['viewWidth']), 'px'],
				['top', _.rand2(0, pageSize['viewHeight']), 'px'],
				['width', size, 'px'],
				['height', size, 'px']
			];
		new _.transition({'el' : el, 'style':style, 'time': _.rand2(config['min'], config['max']), 'delay_out' : 0, 'onend':function(){
			if(el && el.parentNode){
				animateBubble(el);
			}
		}});
	};
		
	/* Main */
	
	var windowResizeEvent = function(){
		getPageSize();
	};
	
	var init = function(){
		_.addEvent(window, 'resize', windowResizeEvent);
		// Border
		initBorderBubbles();
	}
	
	init();
}



var Init = function(){
	new Layout();
};

_.addEvent(window, 'load', Init);