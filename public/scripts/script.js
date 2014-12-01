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

		self.addMark(
			e.offsetX - temp,
			e.offsetY - temp,
			'Title',
			'description',
			'#000'
		);

		self.showDialog(e.offsetX + mark_size + 10, e.offsetY - 100);
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


myMap.addMark(855, 280, 'title', 'You are here', 'red');

var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

myMap.addMark(740, 65, 'title', lorem, '#9b59b6');
myMap.addMark(700, 55, 'title', lorem, '#2ecc71');
myMap.addMark(705, 80, 'title', lorem, '#f1c40f');
myMap.addMark(650, 10, 'title', lorem, '#9b59b6');
myMap.addMark(600, 20, 'title', lorem, '#2ecc71');
myMap.addMark(600, 120, 'title', lorem, '#f1c40f');
myMap.addMark(650, 120, 'title', lorem, '#9b59b6');
myMap.addMark(500, 120, 'title', lorem, '#2ecc71');
myMap.addMark(400, 120, 'title', lorem, '#f1c40f');
myMap.addMark(225, 300, 'title', lorem, '#f1c40f');

myMap.addMark(740, 415, 'title', lorem, '#9b59b6');
myMap.addMark(700, 455, 'title', lorem, '#2ecc71');
myMap.addMark(705, 480, 'title', lorem, '#f1c40f');
myMap.addMark(650, 410, 'title', lorem, '#9b59b6');
myMap.addMark(600, 420, 'title', lorem, '#2ecc71');
myMap.addMark(200, 520, 'title', lorem, '#f1c40f');
myMap.addMark(250, 520, 'title', lorem, '#9b59b6');
myMap.addMark(300, 520, 'title', lorem, '#2ecc71');
myMap.addMark(400, 520, 'title', lorem, '#f1c40f');
myMap.addMark(225, 350, 'title', lorem, '#f1c40f');
