// Дво́ичное дере́во по́иска (Binary Search Tree, BST) — это структура данных в виде дерева, в которой каждый узел содержит:

//     значение (ключ)

//     ссылку на левое поддерево (с меньшими значениями)

//     ссылку на правое поддерево (с большими значениями)

// 📌 Основные свойства BST:

// Для любого узла node:

//     Все значения в левом поддереве < node.value

//     Все значения в правом поддереве > node.value

//     Такое условие сохраняется рекурсивно для всех потомков

// Преимущества

//     Быстрый поиск, вставка и удаление (в среднем)
//     В среднем операции занимают O(log n) времени, так как при каждом шаге мы "отбрасываем" половину оставшихся узлов.

//     Простая структура и реализация
//     Дерево легко понять и реализовать, особенно для базовых операций.

//     Динамическое множество данных
//     Можно эффективно добавлять и удалять элементы, в отличие от отсортированных массивов, где вставка/удаление дороже.

//     Поддержка упорядоченных данных
//     Можно быстро получать элементы в отсортированном порядке (например, с помощью обхода In-Order).

// Недостатки

//     Худший случай — деградация в список
//     Если вставлять отсортированные или почти отсортированные данные, дерево может стать сильно несбалансированным — глубина вырастает до O(n), и операции превращаются в линейные.

//     Не гарантируется балансировка
//     Без дополнительных механизмов (например, AVL, красно-черные деревья) структура может стать неэффективной.

//     Сложность реализации сбалансированных версий
//     Чтобы гарантировать O(log n) во всех случаях, нужны более сложные структуры и алгоритмы.

/**
 * Класс узла бинарного дерева поиска.
 */
/**
 * Класс узла бинарного дерева поиска.
 */
class BinarySearchTreeNode<K, V> {
	key: K;
	value: V;
	size: number;
	left: BinarySearchTreeNode<K, V> | null = null;
	right: BinarySearchTreeNode<K, V> | null = null;

	/**
	 * Создает новый узел.
	 * @param key Ключ узла
	 * @param value Значение узла
	 * @param size Размер поддерева с корнем в этом узле
	 */
	constructor(key: K, value: V, size: number = 1) {
		this.key = key;
		this.value = value;
		this.size = size;
	}
}

/**
 * Класс бинарного дерева поиска (Binary Search Tree).
 */
export class BinarySearchTree<K, V> {
	private root: BinarySearchTreeNode<K, V> | null = null;

	/**
	 * Проверяет, пусто ли дерево.
	 * @returns true, если дерево не содержит элементов
	 */
	isEmpty(): boolean {
		return this.size() === 0;
	}

	/**
	 * Возвращает количество узлов в дереве.
	 */
	size(): number {
		return this._size(this.root);
	}

	private _size(node: BinarySearchTreeNode<K, V> | null): number {
		return node ? node.size : 0;
	}

	/**
	 * Проверяет, содержится ли в дереве заданный ключ.
	 * @param key Ключ для поиска
	 */
	contains(key: K): boolean {
		return this.get(key) !== null;
	}

	/**
	 * Получает значение, соответствующее ключу.
	 * @param key Ключ для поиска
	 */
	get(key: K): V | null {
		return this._get(this.root, key);
	}

	private _get(node: BinarySearchTreeNode<K, V> | null, key: K): V | null {
		if (key === null || key === undefined) {
			throw new Error("Key is null or undefined");
		}
		if (!node) return null;

		if (key < node.key) {
			return this._get(node.left, key);
		} else if (key > node.key) {
			return this._get(node.right, key);
		} else {
			return node.value;
		}
	}

	/**
	 * Вставляет пару ключ-значение в дерево.
	 * @param key Ключ
	 * @param value Значение
	 */
	put(key: K, value: V | null | undefined): void {
		if (key === null || key === undefined) {
			throw new Error("Key is null or undefined");
		}
		if (value === null || value === undefined) {
			return;
		}
		this.root = this._put(this.root, key, value);
	}

	private _put(
		node: BinarySearchTreeNode<K, V> | null,
		key: K,
		value: V
	): BinarySearchTreeNode<K, V> {
		if (!node) {
			return new BinarySearchTreeNode(key, value, 1);
		}

		if (key < node.key) {
			node.left = this._put(node.left, key, value);
		} else if (key > node.key) {
			node.right = this._put(node.right, key, value);
		} else {
			node.value = value;
		}

		node.size = 1 + this._size(node.left) + this._size(node.right);
		return node;
	}

	/**
	 * Удаляет узел по ключу из дерева.
	 * @param key Ключ для удаления
	 */
	delete(key: K): void {
		if (key === null || key === undefined) {
			throw new Error("Key is null or undefined");
		}
		this.root = this._delete(this.root, key);
	}
	private _delete(
		node: BinarySearchTreeNode<K, V> | null,
		key: K
	): BinarySearchTreeNode<K, V> | null {
		if (!node) return null;

		if (key < node.key) {
			node.left = this._delete(node.left, key);
		} else if (key > node.key) {
			node.right = this._delete(node.right, key);
		} else {
			// Узел найден
			if (!node.right) return node.left;
			if (!node.left) return node.right;

			// ✅ Здесь temp.right гарантированно не null, иначе предыдущий if сработал бы
			const temp = node;

			if (!temp.right) {
				throw new Error("Unexpected null right child");
			}

			const min = this._min(temp.right); // ⬅ теперь OK
			min.right = this._deleteMin(temp.right); // ⬅ тоже OK
			min.left = temp.left;
			node = min;
		}

		node.size = 1 + this._size(node.left) + this._size(node.right);
		return node;
	}

	private _min(node: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> {
		let current = node;
		while (current.left !== null) {
			current = current.left;
		}
		return current;
	}

	private _deleteMin(
		node: BinarySearchTreeNode<K, V>
	): BinarySearchTreeNode<K, V> | null {
		if (!node.left) return node.right;
		node.left = this._deleteMin(node.left);
		node.size = 1 + this._size(node.left) + this._size(node.right);
		return node;
	}
}

const bst = new BinarySearchTree();

bst.put(10, "десять");
bst.put(5, "пять");
bst.put(15, "пятнадцать");
bst.put(3, "три");
bst.put(7, "семь");
bst.put(12, "двенадцать");
bst.put(18, "восемнадцать");
bst.delete(15);
console.log("Размер дерева:", bst.size()); // 👉 7

console.log("Значение по ключу 7:", bst.get(7)); // 👉 "семь"
console.log("Значение по ключу 15:", bst.get(15)); // 👉 "пятнадцать"
console.log("Значение по ключу 100:", bst.get(100)); // 👉 null

console.log("Содержит ли ключ 12?", bst.contains(12)); // 👉 true
console.log("Содержит ли ключ 42?", bst.contains(42)); // 👉 false

console.log("Пустое ли дерево?", bst.isEmpty()); // 👉 false
