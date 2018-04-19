var ITEMS = [], ID, $todo = q('#todo'), $text = q('#text');

listTasks();

function listTasks() {
    var tasks = localStorage.getItem('tasks');
    var $items = q('#todo .items');
    $todo.className = '';
    $text.value = '';

    if (tasks.length > 10) {
        ITEMS = JSON.parse(tasks);
        var completedTasks = 0;
        q('#all').innerHTML = ITEMS.length;

        var items = '';
        ITEMS.forEach(function (item, id) {
            items += '<div data-id="' + id + '" class="item ' + item['status'] + '"><a data-id="' + id + '" class="check"></a><div data-id="' + id + '" class="text">' + item['text'] + '</div></div>';
            if (item['status'] == 'completed') completedTasks++;
        });

        $items.innerHTML = items;

        q('#completed').innerHTML = completedTasks;
        q('#active').innerHTML = ITEMS.length - completedTasks;

        ITEMS.forEach(function (item, id) {
            q('#todo .text[data-id="' + id + '"]').addEventListener('click', function () {
                ID = this.getAttribute('data-id');
                $text.value = ITEMS[ID]['text'];
                $todo.className = 'edit';
                q('#todo .item[data-id="' + ID + '"]').className = 'item active ' + ITEMS[ID]['status'];
            });
            q('#todo .check[data-id="' + id + '"]').addEventListener('click', function () {
                ID = this.getAttribute('data-id');
                ITEMS[ID]['status'] = (ITEMS[ID]['status'] == 'completed') ? '' : 'completed';
                localStorage.setItem('tasks', JSON.stringify(ITEMS));
                listTasks();
            });

        });
    } else {
        $items.innerHTML = 'Задач нет! Приятного отдыха ;)';
        q('#all').innerHTML = q('#completed').innerHTML = q('#active').innerHTML = '0';
    }

}

q('#save').addEventListener('click', function () {
    var text = $text.value;
    ITEMS[ID] = {'status': ITEMS[ID]['status'], 'text': text};
    localStorage.setItem('tasks', JSON.stringify(ITEMS));
    listTasks();
});

q('#add').addEventListener('click', function () {
    var text = $text.value;
    if (text.length > 0) {
        var item = {'status': '', 'text': text};
        ITEMS.push(item);
        localStorage.setItem('tasks', JSON.stringify(ITEMS));
        listTasks();
    }
});

q('#delete').addEventListener('click', function () {
    if (confirm('Удалить')) {
        ITEMS.splice(ID, 1);
        localStorage.setItem('tasks', JSON.stringify(ITEMS));
        listTasks();
    }
});

q('#cancel').addEventListener('click', function () {
    listTasks();
});


function q(query) {
    return document.querySelector(query);
}
