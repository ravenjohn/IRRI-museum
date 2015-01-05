var db = openDatabase('IRRI', '1.0', 'So pro man', 5 * 1024 * 1024, function (success) {
	console.log('Database successfully createdins');
}, function (err) {
	console.log('err', err);
});


db_success = function () {
	console.log('success');
	console.log(arguments);
}

db_error = function () {
	console.log('error');
	console.log(arguments);
}


db.transaction(function (tx) {

	// tx.executeSql('DROP TABLE maps', [], db_success, db_error);

	// tx.executeSql('\
	// CREATE TABLE maps (\
	// 	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
	// 	x INTEGER not null,\
	// 	y INTEGER not null,\
	// 	title text not null,\
	// 	description text not null,\
	// 	color text not null\
	// )', [], db_success, db_error);

	var id = 0;

	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 855, 280, "title", "You are here", "red")');

	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 740, 65, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 700, 55, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 705, 80, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 650, 10, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 600, 20, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 600, 120, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 650, 120, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 500, 120, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 225, 120, "title", "lorem ipsum", "rgb(46, 204, 113)")');
	tx.executeSql('INSERT OR REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + (++id) + ', 225, 300, "title", "lorem ipsum", "rgb(46, 204, 113)")');

});

get_maps = function (cb) {
	db.transaction(function (tx) {
		tx.executeSql('select * from maps', [], function (tx, result) {
			var i = result.rows.length,
				temp = [];
			while (i--) {
				temp.push(result.rows.item(i));
			}
			cb(temp);
		});
	});
}

insert_map = function (x, y, title, description) {
	title = title.replace('\"', '\\"');
	description = description.replace('\"', '\\"');
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO maps(x, y, title, description, color) VALUES(' + x + ', ' + y + ', "' + title + '", "' + description + '", "rgb(46, 204, 113)")');
	});
}

update_map = function (id, x, y, title, description, color) {
	title = title.replace('\"', '\\"');
	description = description.replace('\"', '\\"');

	console.log('REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + id + ', ' + x + ', ' + y + ', "' + title + '", "' + description + '", "' + color + '");');

	db.transaction(function (tx) {
		tx.executeSql('REPLACE INTO maps(id, x, y, title, description, color) VALUES(' + id + ', ' + x + ', ' + y + ', "' + title + '", "' + description + '", "' + color + '");', [], db_success, db_error);
		// tx.executeSql('UPDATE maps SET x = ' + x + ', y =' +
	});
}


delete_map = function (id) {

	if (id && !confirm('Are you sure you want to delete this mark?')) {
		return false;
	}

	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM maps WHERE id = ' + id + ';', [], db_success, db_error);
		// tx.executeSql('UPDATE maps SET x = ' + x + ', y =' +
	});
	location.reload();
}



var Map = function (id, options) {
	var self = this,
		mark_size = 20,
		temp = mark_size / 2;

	this.id = id;
	this.$element = $('#' + id);


	this.$element.on('click', function (e) {

		if (e.target.id !== 'map_image') {
			return;
		}

		self.addMark(
			e.offsetX - temp,
			e.offsetY - temp,
			'Title',
			'description',
			'#000',
			0
		);

		self.showDialog(e.offsetX + mark_size + 10, e.offsetY - 100, e.offsetX - temp, e.offsetY - temp);
	});

	this.addMark = function (x, y, title, desc, color, id) {
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

		mark.setAttribute('data-x', x);
		mark.setAttribute('data-y', y);
		mark.setAttribute('data-title', title);
		mark.setAttribute('data-desc', desc);
		mark.setAttribute('data-color', color);
		mark.setAttribute('data-id', id);

		mark.title = title;

		mark.addEventListener('mouseover', function () {
			self.$desc_box && self.$desc_box.html(desc);
			mark.style.boxShadow = '0 5px 13px #000';
		}, true);

		mark.addEventListener('mouseout', function () {
			mark.style.boxShadow = '0 1px ' + temp + 'px #888';
		}, true);

		mark.addEventListener('click', function (e) {
			e.preventDefault();

			e = e.target;

			self.showDialog(
				+e.getAttribute('data-x') + temp,
				+e.getAttribute('data-y') + temp,
				e.getAttribute('data-x'),
				e.getAttribute('data-y'),
				e.getAttribute('data-desc'),
				e.getAttribute('data-title'),
				e.getAttribute('data-color'),
				e.getAttribute('data-id')
			);

			return false;
		}, true);

		this.$element.append(mark);
	};

	this.showDialog = function (x, y, _x, _y, desc, title, color, id) {
		var dialog = document.createElement('div');

		dialog.style.position = 'absolute';
		dialog.style.left = x + 'px';
		dialog.style.top = y + 'px';
		dialog.style.zIndex = '999999999999';
		dialog.style.width = '200px';
		dialog.style.height = '300px';
		dialog.style.background = '#FAFAFA';
		dialog.style.border = '1px solid #EEE';
		dialog.style.boxShadow = '5px 10px 20px #999';
		dialog.innerHTML = '\
			<form name="name me" onsubmit="return process_dialog(this)"> \
				Title\
				<br />\
				<input type="hidden" name="x" value="' + _x + '"/>\
				<input type="hidden" name="y" value="' + _y + '"/>\
				<input type="hidden" name="color" value="' + (color || '') + '"/>\
				<input type="hidden" name="id" value="' + (id || '') + '"/>\
				<input type="text" name="title" value="' + (title || '') + '"/>\
				<br />\
				Description\
				<br />\
				<textarea class="dialog_textarea" name="description">' + (desc || '') + '</textarea>\
				<br />\
				<br />\
				<input type="submit" value="Save"/>\
				<input type="button" onclick="delete_map(this.parentElement.id.value);" value="Delete">\
			</form>\
		';

		this.$element.append(dialog);
	};

	if (options.desc_box) {
		this.$desc_box = options.desc_box;
	}
},

process_dialog = function (rav) {
	if (rav.id.value == 0) {
		insert_map(rav.x.value, rav.y.value, rav.title.value, rav.description.value);
	}
	else {
		update_map(rav.id.value, rav.x.value, rav.y.value, rav.title.value, rav.description.value, rav.color.value);
	}

	rav.parentElement.parentElement.removeChild(rav.parentElement);
	location.reload();
	return false;
}

myMap = new Map('map', {
	desc_box : $('#map_info_div')
});

get_maps(function (marks) {
	marks.forEach(function (mark) {
		myMap.addMark(mark.x, mark.y, mark.title, mark.description, mark.color, mark.id);
	})
});


var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

