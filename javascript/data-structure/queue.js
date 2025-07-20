// // Очередь — это структура данных, работающая по принципу FIFO (First In — First Out), то есть первым пришёл — первым вышел.

// /**
//  * Узел очереди, содержащий значение и ссылку на следующий узел.
//  */
// class QueueNode {
// 	/**
// 	 * @param {*} value Значение, хранящееся в узле.
// 	 */
// 	constructor(value) {
// 		/** @type {*} */
// 		this.value = value;

// 		/** @type {QueueNode|null} */
// 		this.next = null;
// 	}
// }

// /**
//  * Класс, реализующий структуру данных "очередь" (FIFO).
//  */
// class Queue {
// 	constructor() {
// 		/** @type {QueueNode|null} */
// 		this.first = null;

// 		/** @type {QueueNode|null} */
// 		this.last = null;

// 		/** @type {number} */
// 		this.n = 0;
// 	}

// 	/**
// 	 * Проверяет, пуста ли очередь.
// 	 * @returns {boolean} `true`, если очередь пуста, иначе `false`.
// 	 */
// 	isEmpty() {
// 		return this.first === null;
// 	}

// 	/**
// 	 * Возвращает количество элементов в очереди.
// 	 * @returns {number} Размер очереди.
// 	 */
// 	size() {
// 		return this.n;
// 	}

// 	/**
// 	 * Добавляет элемент в конец очереди.
// 	 * @param {*} value Элемент для добавления.
// 	 */
// 	enqueue(value) {
// 		const oldlast = this.last;
// 		this.last = new QueueNode(value);
// 		if (this.isEmpty()) {
// 			this.first = this.last;
// 		} else {
// 			oldlast.next = this.last;
// 		}
// 		this.n++;
// 	}

// 	/**
// 	 * Удаляет и возвращает элемент из начала очереди.
// 	 * @returns {*|null} Удалённый элемент или `null`, если очередь пуста.
// 	 */
// 	dequeue() {
// 		if (this.isEmpty()) {
// 			this.last = null;
// 			return null;
// 		}

// 		let item = this.first.value;
// 		this.first = this.first.next;
// 		this.n--;
// 		return item;
// 	}
// }
// // Создание новой очереди
// const queue = new Queue();
// console.log("Очередь создана:", queue);

// // Проверка: очередь пуста?
// console.log("Очередь пуста?", queue.isEmpty()); // true

// // Добавление элементов
// queue.enqueue("A");
// console.log("После enqueue('A'):", queue);

// queue.enqueue("B");
// console.log("После enqueue('B'):", queue);

// queue.enqueue("C");
// console.log("После enqueue('C'):", queue);

// // Проверка размера
// console.log("Размер очереди:", queue.size()); // 3

// // Проверка: очередь пуста?
// console.log("Очередь пуста?", queue.isEmpty()); // false

// // Извлечение элементов
// console.log("dequeue():", queue.dequeue()); // A
// console.log("После dequeue(), очередь:", queue);

// console.log("dequeue():", queue.dequeue()); // B
// console.log("После dequeue(), очередь:", queue);

// console.log("Размер очереди:", queue.size()); // 1

// // Добавление ещё одного элемента
// queue.enqueue("D");
// console.log("После enqueue('D'):", queue);

// // Продолжение извлечения
// console.log("dequeue():", queue.dequeue()); // C
// console.log("dequeue():", queue.dequeue()); // D

// // Очередь снова должна быть пуста
// console.log("Очередь пуста?", queue.isEmpty()); // true
// console.log("Размер очереди:", queue.size()); // 0

// // Попытка удалить из пустой очереди
// console.log("dequeue() из пустой:", queue.dequeue()); // null

// // Финальное состояние
// console.log("Финальное состояние очереди:", queue);
