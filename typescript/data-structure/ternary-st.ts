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
 * Узел Ternary Search Tree (TST).
 */
/**
 * Узел Ternary Search Tree (TST).
 */
class TernarySearchTreeNodeTS {
	/** Символ в узле */
	char: string;
	/** Левая ветвь (символы меньше this.char) */
	left: TernarySearchTreeNodeTS | null = null;
	/** Средняя ветвь (следующий символ, если совпадает) */
	middle: TernarySearchTreeNodeTS | null = null;
	/** Правая ветвь (символы больше this.char) */
	right: TernarySearchTreeNodeTS | null = null;
	/** Флаг конца слова */
	isEnd: boolean = false;

	/**
	 * Создает новый узел.
	 * @param char - Символ, хранящийся в узле
	 */
	constructor(char: string) {
		this.char = char;
	}
}

/**
 * Класс Ternary Search Tree (TST) для хранения и поиска строк.
 */
class TernarySearchTreeTS {
	private root: TernarySearchTreeNodeTS | null = null;

	/**
	 * Вставляет слово в TST.
	 * @param word - Слово для вставки.
	 */
	insert(word: string): void {
		if (!word || word.length === 0) return;
		this.root = this._insert(this.root, word, 0);
	}

	/**
	 * Рекурсивный метод вставки символа слова в дерево.
	 * @param node - Текущий узел дерева.
	 * @param word - Слово для вставки.
	 * @param index - Текущий индекс символа в слове.
	 * @returns Обновлённый узел.
	 */
	private _insert(
		node: TernarySearchTreeNodeTS | null,
		word: string,
		index: number
	): TernarySearchTreeNodeTS {
		const char = word[index];

		if (!node) {
			node = new TernarySearchTreeNodeTS(char);
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
	 * @param word - Слово для поиска.
	 * @returns true, если слово найдено, иначе false.
	 */
	search(word: string): boolean {
		if (!word || word.length === 0) return false;
		return this._search(this.root, word, 0);
	}

	/**
	 * Рекурсивный метод поиска слова в дереве.
	 * @param node - Текущий узел дерева.
	 * @param word - Слово для поиска.
	 * @param index - Текущий индекс символа в слове.
	 * @returns true, если слово найдено, иначе false.
	 */
	private _search(
		node: TernarySearchTreeNodeTS | null,
		word: string,
		index: number
	): boolean {
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

// Пример использования
const tstTS = new TernarySearchTreeTS();
tstTS.insert("cat");
tstTS.insert("bat");
tstTS.insert("rat");

console.log(tstTS.search("cat")); // true
console.log(tstTS.search("bat")); // true
console.log(tstTS.search("rat")); // true
console.log(tstTS.search("car")); // false
