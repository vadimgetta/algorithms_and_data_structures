// Очередь — это структура данных, работающая по принципу FIFO (First In — First Out).

/**
 * Узел очереди, содержащий значение и ссылку на следующий узел.
 */
class QueueNodeTS<T> {
	value: T;
	next: QueueNodeTS<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}

/**
 * Класс, реализующий структуру данных "очередь" (FIFO).
 */
class QueueTS<T> {
	private first: QueueNodeTS<T> | null = null;
	private last: QueueNodeTS<T> | null = null;
	private n: number = 0;

	/**
	 * Проверяет, пуста ли очередь.
	 * @returns `true`, если очередь пуста, иначе `false`.
	 */
	isEmpty(): boolean {
		return this.first === null;
	}

	/**
	 * Возвращает количество элементов в очереди.
	 * @returns Размер очереди.
	 */
	size(): number {
		return this.n;
	}

	/**
	 * Добавляет элемент в конец очереди.
	 * @param value Элемент для добавления.
	 */
	enqueue(value: T): void {
		const oldLast = this.last;
		this.last = new QueueNodeTS(value);
		if (this.isEmpty()) {
			this.first = this.last;
		} else if (oldLast) {
			oldLast.next = this.last;
		}
		this.n++;
	}

	/**
	 * Удаляет и возвращает элемент из начала очереди.
	 * @returns Удалённый элемент или `null`, если очередь пуста.
	 */
	dequeue(): T | null {
		if (this.isEmpty()) {
			this.last = null;
			return null;
		}

		const item = this.first!.value;
		this.first = this.first!.next;
		this.n--;
		return item;
	}
}

// Создание новой очереди
const queueTS = new QueueTS<string>();
console.log("Очередь создана:", queueTS);

// Проверка: очередь пуста?
console.log("Очередь пуста?", queueTS.isEmpty()); // true

// Добавление элементов
queueTS.enqueue("A");
console.log("После enqueue('A'):", queueTS);

queueTS.enqueue("B");
console.log("После enqueue('B'):", queueTS);

queueTS.enqueue("C");
console.log("После enqueue('C'):", queueTS);

// Проверка размера
console.log("Размер очереди:", queueTS.size()); // 3

// Проверка: очередь пуста?
console.log("Очередь пуста?", queueTS.isEmpty()); // false

// Извлечение элементов
console.log("dequeue():", queueTS.dequeue()); // A
console.log("После dequeue(), очередь:", queueTS);

console.log("dequeue():", queueTS.dequeue()); // B
console.log("После dequeue(), очередь:", queueTS);

console.log("Размер очереди:", queueTS.size()); // 1

// Добавление ещё одного элемента
queueTS.enqueue("D");
console.log("После enqueue('D'):", queueTS);

// Продолжение извлечения
console.log("dequeue():", queueTS.dequeue()); // C
console.log("dequeue():", queueTS.dequeue()); // D

// Очередь снова должна быть пуста
console.log("Очередь пуста?", queueTS.isEmpty()); // true
console.log("Размер очереди:", queueTS.size()); // 0

// Попытка удалить из пустой очереди
console.log("dequeue() из пустой:", queueTS.dequeue()); // null

// Финальное состояние
console.log("Финальное состояние очереди:", queueTS);
