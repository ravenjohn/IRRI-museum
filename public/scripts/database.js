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

    tx.executeSql('\
    CREATE TABLE IF NOT EXISTS maps (\
     id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
     x INTEGER not null,\
     y INTEGER not null,\
     title text not null,\
     description text not null,\
     color text not null\
    )', [], db_success, db_error);

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
