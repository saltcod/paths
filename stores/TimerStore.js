import { makeAutoObservable } from "mobx";

class TimerStore {
	secondsPassed = 0;

	constructor() {
		makeAutoObservable(this);
	}

	increase() {
		this.secondsPassed += 1;
	}

	reset() {
		this.secondsPassed = 0;
	}
}

export default TimerStore;
