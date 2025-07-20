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
 * Класс, представляющий узел бинарного дерева поиска.
 */
class BinarySearchTreeNode {
	/**
	 * @param {*} key Ключ узла (обычно строка или число)
	 * @param {*} value Значение, связанное с ключом
	 * @param {number} size Размер поддерева, включая этот узел
	 */
	constructor(key, value, size = 1) {
		this.key = key;
		this.value = value;
		this.size = size;
		this.left = null;
		this.right = null;
	}
}

/**
 * Класс бинарного дерева поиска (Binary Search Tree).
 */
class BinarySearchTree {
	constructor() {
		/** @type {BinarySearchTreeNode | null} */
		this.root = null;
	}

	/**
	 * Проверяет, пусто ли дерево.
	 * @returns {boolean}
	 */
	isEmpty() {
		return this.size() === 0;
	}

	/**
	 * Возвращает количество элементов в дереве.
	 * @returns {number}
	 */
	size() {
		return this._size(this.root);
	}

	/**
	 * Возвращает размер поддерева с заданным корнем.
	 * @param {BinarySearchTreeNode | null} node
	 * @returns {number}
	 */
	_size(node) {
		return node ? node.size : 0;
	}

	/**
	 * Проверяет, содержится ли в дереве ключ.
	 * @param {*} key
	 * @returns {boolean}
	 */
	contains(key) {
		return this.get(key) !== null;
	}

	/**
	 * Получает значение, связанное с ключом.
	 * @param {*} key
	 * @returns {* | null}
	 */
	get(key) {
		return this._get(this.root, key);
	}

	/**
	 * Рекурсивный метод для поиска значения по ключу.
	 * @param {BinarySearchTreeNode | null} node
	 * @param {*} key
	 * @returns {* | null}
	 */
	_get(node, key) {
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
	 * @param {*} key
	 * @param {*} value
	 */
	put(key, value) {
		if (key === null || key === undefined) {
			throw new Error("Key is null or undefined");
		}
		if (value === null || value === undefined) {
			return; // можно добавить delete(key)
		}
		this.root = this._put(this.root, key, value);
	}

	/**
	 * Рекурсивная вставка пары ключ-значение в поддерево.
	 * @param {BinarySearchTreeNode | null} node
	 * @param {*} key
	 * @param {*} value
	 * @returns {BinarySearchTreeNode}
	 */
	_put(node, key, value) {
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
	 * Удаляет узел с заданным ключом из дерева.
	 * @param {*} key
	 */
	delete(key) {
		if (key === null || key === undefined) {
			throw new Error("Key is null or undefined");
		}
		this.root = this._delete(this.root, key);
	}

	/**
	 * Рекурсивно удаляет узел по ключу.
	 * @param {BinarySearchTreeNode | null} node
	 * @param {*} key
	 * @returns {BinarySearchTreeNode | null}
	 */
	_delete(node, key) {
		if (!node) return null;

		if (key < node.key) {
			node.left = this._delete(node.left, key);
		} else if (key > node.key) {
			node.right = this._delete(node.right, key);
		} else {
			// Найден узел для удаления
			if (!node.right) return node.left;
			if (!node.left) return node.right;

			// Узел с двумя потомками: заменяем на минимальный из правого поддерева
			const t = node;
			node = this._min(t.right);
			node.right = this._deleteMin(t.right);
			node.left = t.left;
		}

		node.size = 1 + this._size(node.left) + this._size(node.right);
		return node;
	}

	/**
	 * Удаляет минимальный узел в поддереве.
	 * @param {BinarySearchTreeNode} node
	 * @returns {BinarySearchTreeNode | null}
	 */
	_deleteMin(node) {
		if (!node.left) return node.right;
		node.left = this._deleteMin(node.left);
		node.size = 1 + this._size(node.left) + this._size(node.right);
		return node;
	}

	/**
	 * Возвращает узел с минимальным ключом в поддереве.
	 * @param {BinarySearchTreeNode} node
	 * @returns {BinarySearchTreeNode}
	 */
	_min(node) {
		while (node.left !== null) {
			node = node.left;
		}
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

console.log("Размер дерева:", bst.size()); // 👉 7

console.log("Значение по ключу 7:", bst.get(7)); // 👉 "семь"
console.log("Значение по ключу 15:", bst.get(15)); // 👉 "пятнадцать"
console.log("Значение по ключу 100:", bst.get(100)); // 👉 null

console.log("Содержит ли ключ 12?", bst.contains(12)); // 👉 true
console.log("Содержит ли ключ 42?", bst.contains(42)); // 👉 false

console.log("Пустое ли дерево?", bst.isEmpty()); // 👉 false

bst.delete(15);
console.log(bst.get(15)); // 👉 null
console.log("Новый размер:", bst.size()); // 👉 4
