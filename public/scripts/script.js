var map = function (id, options) {
	this.id = id;
	this.$element = $('#' + id);

	this.addMark = function (x, y, title, desc, color) {
		var mark = document.createElement('div'),
			self = this;

		mark.className = 'mark';
		mark.style.left = x + 'px';
		mark.style.top = y + 'px';
		mark.style.background = color;
		mark.title = title;

		mark.addEventListener('mouseover', function () {
			self.$desc_box && self.$desc_box.html(desc);
		});

		this.$element.append(mark);
	};

	if (options.desc_box) {
		this.$desc_box = options.desc_box;
	}
},

myMap = new map('map', {
	desc_box : $('#map_info_div')
});


myMap.addMark(135, 70, 'title', 'This is the CR', '#9b59b6');
myMap.addMark(615, 280, 'title', 'This is somewhere in the museum', '#2ecc71');
myMap.addMark(225, 300, 'title', 'Someone is here. Do not enter. LOL', '#f1c40f');
