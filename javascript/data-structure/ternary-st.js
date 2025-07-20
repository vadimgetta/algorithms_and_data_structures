/**
 * Ternary Search Tree (TST) (Тернарное дерево поиска) — это особенный способ хранить много слов в компьютере,
 * чтобы быстро находить нужные из них.
 *
 * Представь, что каждое слово — это цепочка букв.
 * В обычном словаре буквы идут одна за другой, а здесь мы разбиваем слова на маленькие кусочки — по одной букве в каждом узле.
 *
 * Каждый узел в дереве хранит одну букву и может иметь до трёх «путей» (детей):
 *  - Левый путь — для букв, которые идут в алфавите **до** буквы в узле.
 *  - Средний путь — если буква совпала, идём дальше по следующей букве в слове.
 *  - Правый путь — для букв, которые идут **после** буквы в узле.
 *
 * Такой способ помогает быстро понять, есть ли слово в нашем «дереве»,
 * и занимает меньше памяти, чем похожие структуры.
 *
 * Это как если бы ты искал слово в словаре, листая страницы не по алфавиту целиком,
 * а постепенно выбирая направление, где оно должно быть, буква за буквой.
 */

/**
 * Класс узла Ternary Search Tree (TST).
 */
class TernarySearchTreeNode {
	/**
	 * Создает узел с заданным символом.
	 * @param {string} char - Символ, хранящийся в узле.
	 */
	constructor(char) {
		/** @type {string} */
		this.char = char;
		/** @type {TernarySearchTreeNode|null} */
		this.left = null; // Узлы с символами меньше this.char
		/** @type {TernarySearchTreeNode|null} */
		this.middle = null; // Следующий символ в слове (если совпадает)
		/** @type {TernarySearchTreeNode|null} */
		this.right = null; // Узлы с символами больше this.char
		/** @type {boolean} */
		this.isEnd = false; // Флаг конца слова
	}
}

/**
 * Класс Ternary Search Tree (TST) для хранения и поиска строк.
 */
class TernarySearchTree {
	constructor() {
		/** @type {TernarySearchTreeNode|null} */
		this.root = null;
	}

	/**
	 * Вставляет слово в TST.
	 * @param {string} word - Слово для вставки.
	 */
	insert(word) {
		if (!word || word.length === 0) return;
		this.root = this._insert(this.root, word, 0);
	}

	/**
	 * Рекурсивный метод вставки символа слова в дерево.
	 * @private
	 * @param {TernarySearchTreeNode|null} node - Текущий узел дерева.
	 * @param {string} word - Слово для вставки.
	 * @param {number} index - Текущий индекс символа в слове.
	 * @returns {TernarySearchTreeNode} - Обновленный узел.
	 */
	_insert(node, word, index) {
		const char = word[index];

		if (!node) {
			node = new TernarySearchTreeNode(char);
		}

		if (char < node.char) {
			node.left = this._insert(node.left, word, index);
		} else if (char > node.char) {
			node.right = this._insert(node.right, word, index);
		} else {
			if (index + 1 === word.length) {
				node.isEnd = true;
			} else {
				node.middle = this._insert(node.middle, word, index + 1);
			}
		}
		return node;
	}

	/**
	 * Ищет слово в TST.
	 * @param {string} word - Слово для поиска.
	 * @returns {boolean} - Возвращает true, если слово найдено, иначе false.
	 */
	search(word) {
		if (!word || word.length === 0) return false;
		return this._search(this.root, word, 0);
	}

	/**
	 * Рекурсивный метод поиска слова в дереве.
	 * @private
	 * @param {TernarySearchTreeNode|null} node - Текущий узел дерева.
	 * @param {string} word - Слово для поиска.
	 * @param {number} index - Текущий индекс символа в слове.
	 * @returns {boolean} - true, если слово найдено, иначе false.
	 */
	_search(node, word, index) {
		if (!node) return false;

		const char = word[index];

		if (char < node.char) {
			return this._search(node.left, word, index);
		} else if (char > node.char) {
			return this._search(node.right, word, index);
		} else {
			if (index === word.length - 1) {
				return node.isEnd;
			} else {
				return this._search(node.middle, word, index + 1);
			}
		}
	}
}

// Пример использования:
const tst = new TernarySearchTree();
tst.insert("cat");
tst.insert("bat");
tst.insert("rat");

console.log(tst.search("cat")); // true
console.log(tst.search("bat")); // true
console.log(tst.search("rat")); // true
console.log(tst.search("car")); // false
