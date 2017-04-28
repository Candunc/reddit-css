// From http://stackoverflow.com/a/1181586/1687505
var arrayContains = function(needle) {
	// Per spec, the way to identify NaN is that it is not equal to itself
	var findNaN = needle !== needle;
	var indexOf;

	if(!findNaN && typeof Array.prototype.indexOf === 'function') {
		indexOf = Array.prototype.indexOf;
	} else {
		indexOf = function(needle) {
			var i = -1, index = -1;

			for(i = 0; i < this.length; i++) {
				var item = this[i];

				if((findNaN && item !== item) || item === needle) {
					index = i;
					break;
				}
			}

			return index;
		};
	}

	return indexOf.call(this, needle) > -1;
};

// From http://stackoverflow.com/a/18278346/1687505
function loadJSON(path, success, error)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	};
	xhr.open('GET', path, true);
	xhr.send();
}

loadJSON(window.location.origin + '/r/' + window.location.pathname.split('/')[2] + '/wiki/stylesheet.json',
	function(arrayValue) {
		if (arrayValue['data'] && arrayValue['data']['content_md']) {
			console.log(arrayValue['data']['content_md']);
			//From http://stackoverflow.com/a/524721/1687505
			var css = arrayValue['data']['content_md'],
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');

			style.type = 'text/css';
			if (style.styleSheet){
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
		}
		// Else assume subreddit css doesn't exist and quit
	},
	function(err) {
		console.error(err);
	}
);