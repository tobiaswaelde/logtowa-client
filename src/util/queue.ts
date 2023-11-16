interface IQueue<T> {
	enqueue(item: T): void;
	dequeue(): T | undefined;
	size(): number;
	entries(): T[];
}

export class Queue<T> implements IQueue<T> {
	private items: T[] = [];

	constructor(private capacity: number = Infinity) {}

	enqueue(item: T): void {
		if (this.size() === this.capacity) {
			throw Error('Queue has reached max capacity.');
		}
		this.items.push(item);
	}

	dequeue(): T | undefined {
		return this.items.shift();
	}

	size(): number {
		return this.items.length;
	}

	entries() {
		return this.items;
	}
}
