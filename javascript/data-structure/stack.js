// Стек в JavaScript — это структура данных, работающая по принципу LIFO (Last In, First Out — «последний пришёл — первый ушёл»). Это значит, что последний добавленный элемент будет удалён первым.
// Основные операции стека:

//     push(element) — добавляет элемент в конец стека.

//     pop() — удаляет последний элемент из стека и возвращает его.

//     peek() (или top) — возвращает последний элемент, не удаляя его.

//     isEmpty() — проверяет, пуст ли стек.

/**
 * Узел стека, хранящий значение и ссылку на следующий элемент
 */
class StackNode {
	/**
	 * @param {*} value - значение, которое сохраняется в узле
	 */
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

/**
 * Стек (структура данных LIFO — последний пришёл, первый ушёл)
 */
class Stack {
	constructor() {
		/** @type {StackNode|null} вершина стека (самый верхний элемент) */
		this.root = null;
		/** @type {number} количество элементов в стеке */
		this.n = 0;
	}

	/**
	 * Проверяет, пуст ли стек
	 * @returns {boolean} true, если стек пустой, иначе false
	 */
	isEmpty() {
		return this.n === 0;
	}

	/**
	 * Возвращает количество элементов в стеке
	 * @returns {number} текущий размер стека
	 */
	size() {
		return this.n;
	}

	/**
	 * Добавляет элемент в вершину стека
	 * @param {*} value - значение, которое нужно добавить
	 */
	push(value) {
		const oldFirst = this.root; // сохраняем текущую вершину
		this.root = new StackNode(value); // создаём новую вершину
		this.root.next = oldFirst; // новая вершина ссылается на предыдущую
		this.n++; // увеличиваем счётчик
	}

	/**
	 * Удаляет и возвращает верхний элемент стека
	 * @returns {*} значение удалённого элемента, либо null если стек пуст
	 */
	pop() {
		if (this.isEmpty()) {
			return null;
		}
		const oldFirst = this.root; // сохраняем текущую вершину
		this.root = oldFirst.next; // сдвигаем вершину на следующий элемент
		this.n--; // уменьшаем счётчик
		return oldFirst.value; // возвращаем удалённое значение
	}
}

// Создаём новый стек
const stack = new Stack();

console.log("Стек создан. Пустой?", stack.isEmpty()); // true

// Добавим элементы от 1 до 10
for (let i = 1; i <= 10; i++) {
	stack.push(i);
	console.log(`push(${i})`);
}

console.log("Размер после добавления:", stack.size()); // 10
console.log("Пустой?", stack.isEmpty()); // false

// Добавим ещё несколько элементов
stack.push(100);
stack.push(200);
console.log("Добавлены 100 и 200");
console.log("Текущий размер:", stack.size()); // 12

// Удалим 5 элементов
console.log("Удаляем 5 верхних элементов:");
for (let i = 0; i < 5; i++) {
	console.log(`pop() -> ${stack.pop()}`);
}

console.log("Размер после удаления:", stack.size()); // 7

// Удалим все оставшиеся элементы
console.log("Очистка стека:");
while (!stack.isEmpty()) {
	console.log(`pop() -> ${stack.pop()}`);
}

console.log("Пустой после очистки?", stack.isEmpty()); // true
console.log("Размер:", stack.size()); // 0

// Попробуем удалить из пустого стека
console.log("Удаление из пустого стека:", stack.pop()); // null

// Снова добавим несколько значений
stack.push("A");
stack.push("B");
stack.push("C");

console.log("Добавлены A, B, C");

// Ручной обход стека
console.log("Ручной обход:");
let current = stack.root;
while (current) {
	console.log("Значение в стеке:", current.value);
	current = current.next;
}

// Проверим итоговый размер
console.log("Финальный размер:", stack.size()); // 3
