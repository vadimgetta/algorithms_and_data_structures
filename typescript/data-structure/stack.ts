/**
 * Узел стека, хранящий значение и ссылку на следующий элемент
 */
class StackNodeTS<T> {
	value: T;
	next: StackNodeTS<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}

/**
 * Стек (структура данных LIFO — последний пришёл, первый ушёл)
 */
class StackTS<T> {
	root: StackNodeTS<T> | null = null;
	private n: number = 0;

	/**
	 * Проверяет, пуст ли стек
	 * @returns true, если стек пустой, иначе false
	 */
	isEmpty(): boolean {
		return this.n === 0;
	}

	/**
	 * Возвращает количество элементов в стеке
	 * @returns текущий размер стека
	 */
	size(): number {
		return this.n;
	}

	/**
	 * Добавляет элемент в вершину стека
	 * @param value значение, которое нужно добавить
	 */
	push(value: T): void {
		const oldFirst = this.root;
		this.root = new StackNode(value);
		this.root.next = oldFirst;
		this.n++;
	}

	/**
	 * Удаляет и возвращает верхний элемент стека
	 * @returns значение удалённого элемента, либо null если стек пуст
	 */
	pop(): T | null {
		if (this.isEmpty()) {
			return null;
		}
		const oldFirst = this.root!;
		this.root = oldFirst.next;
		this.n--;
		return oldFirst.value;
	}
}

// Создаём новый стек для чисел
const stackTS = new StackTS<number>();

console.log("Стек создан. Пустой?", stack.isEmpty()); // true

// Добавим элементы от 1 до 10
for (let i = 1; i <= 10; i++) {
	stackTS.push(i);
	console.log(`push(${i})`);
}

console.log("Размер после добавления:", stack.size()); // 10
console.log("Пустой?", stack.isEmpty()); // false

// Добавим ещё несколько элементов
stackTS.push(100);
stackTS.push(200);
console.log("Добавлены 100 и 200");
console.log("Текущий размер:", stackTS.size()); // 12

// Удалим 5 элементов
console.log("Удаляем 5 верхних элементов:");
for (let i = 0; i < 5; i++) {
	console.log(`pop() -> ${stackTS.pop()}`);
}

console.log("Размер после удаления:", stackTS.size()); // 7

// Удалим все оставшиеся элементы
console.log("Очистка стека:");
while (!stackTS.isEmpty()) {
	console.log(`pop() -> ${stackTS.pop()}`);
}

console.log("Пустой после очистки?", stackTS.isEmpty()); // true
console.log("Размер:", stackTS.size()); // 0

// Попробуем удалить из пустого стека
console.log("Удаление из пустого стека:", stackTS.pop()); // null

// Создадим стек для строк
const stringStackTS = new StackTS<string>();

// Снова добавим несколько значений
stringStackTS.push("A");
stringStackTS.push("B");
stringStackTS.push("C");

console.log("Добавлены A, B, C");

// Ручной обход стека
// Ручной обход стека с числами
console.log("Ручной обход:");
let currentNumber = stack.root;
while (currentNumber) {
	console.log("Значение в стеке:", currentNumber.value);
	currentNumber = currentNumber.next;
}

console.log("Ручной обход:");
let currentString = stringStackTS.root;
while (currentString) {
	console.log("Значение в стеке:", currentString.value);
	currentString = currentString.next;
}

// Проверим итоговый размер
console.log("Финальный размер:", stringStackTS.size()); // 3
