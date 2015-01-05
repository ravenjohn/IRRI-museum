var map = function (id, options) {
	var self = this,
		mark_size = 20;

	this.id = id;
	this.$element = $('#' + id);


	this.$element.on('click', function (e) {
		var temp = mark_size / 2;

		if (e.target.id !== 'map_image') {
			return;
		}

		// self.addMark(
		// 	e.offsetX - temp,
		// 	e.offsetY - temp,
		// 	'Title',
		// 	'description',
		// 	'#000'
		// );

		// self.showDialog(e.offsetX + mark_size + 10, e.offsetY - 100);
	});

	this.addMark = function (x, y, title, desc, color) {
		var mark = document.createElement('div'),
			self = this;

		mark.className = 'mark';
		mark.style.width = mark_size + 'px';
		mark.style.height = mark_size + 'px';
		mark.style.borderRadius = mark_size + 'px';
		mark.style.boxShadow = '0 1px ' + (mark_size / 2) + 'px #888';
		mark.style.left = x + 'px';
		mark.style.top = y + 'px';
		mark.style.background = color;

		mark.title = title;

		mark.addEventListener('mouseover', function () {
			self.$desc_box && self.$desc_box.html(desc);
			mark.style.boxShadow = '0 5px 13px #000';
		}, true);

		mark.addEventListener('mouseout', function () {
			mark.style.boxShadow = '0 1px ' + (mark_size / 2) + 'px #888';
		}, true);

		mark.addEventListener('click', function (e) {
			console.log('eh');
			e.preventDefault();
			return false;
		}, true);

		this.$element.append(mark);
	};

	this.showDialog = function (x, y) {
		var dialog = document.createElement('div');

		dialog.style.position = 'absolute';
		dialog.style.left = x + 'px';
		dialog.style.top = y + 'px';
		dialog.style.width = '200px';
		dialog.style.height = '300px';
		dialog.style.background = '#FAFAFA';
		dialog.style.border = '1px solid #EEE';
		dialog.style.boxShadow = '5px 10px 20px #999';

		this.$element.append(dialog);
	};

	if (options.desc_box) {
		this.$desc_box = options.desc_box;
	}
},

myMap = new map('map', {
	desc_box : $('#map_info_div')
});


get_maps(function (marks) {
	marks.forEach(function (mark) {
		console.log(mark.color)
		myMap.addMark(mark.x, mark.y, mark.title, mark.description, mark.color);
	})
})
