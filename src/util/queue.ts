interface IQueue<T> {
	enqueue(item: T): void;
	dequeue(): T | undefined;
	size(): number;
	entries(): T[];
}

/**
 * Implements a FIFO queue.
 */
export class Queue<T> implements IQueue<T> {
	/** The queue item. */
	private items: T[] = [];

	/**
	 * Create a queue instance.
	 * @param {number} capacity The maximum capacity of the queue. If not set, the queue will have unlimited capacity.
	 */
	constructor(public readonly capacity: number = Infinity) {}

	/**
	 * Add item to the queue.
	 * @param {T} item The item to add.
	 * @throws {Error} Queue has reached max capacity.
	 */
	enqueue(item: T): void {
		if (this.size() === this.capacity) {
			throw Error('Queue has reached max capacity.');
		}
		this.items.push(item);
	}

	/**
	 * Remove item from the queue.
	 * @returns {T} The removed item.
	 */
	dequeue(): T | undefined {
		return this.items.shift();
	}

	/**
	 * Get the number of items in the queue.
	 * @returns {number} The number of items.
	 */
	size(): number {
		return this.items.length;
	}

	/**
	 * Get all items in the queue
	 * @returns {Array<T>} The items in the queue.
	 */
	entries(): Array<T> {
		return this.items;
	}
}
