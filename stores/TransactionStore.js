import {
	action,
	autorun,
	makeObservable,
	observable,
	computed,
	runInAction,
} from "mobx";

class TransactionStore {
	active = [];
	transactions = [];
	loading = false;
	searchTerm = "";

	constructor() {
		makeObservable(this, {
			active: observable,
			searchTerm: observable,
			logit: action,
			loading: observable,
			transactions: observable,
			setSearchTerm: action,
			setTransactions: action,
			filteredTransactions: computed,
			filteredTransactionsSubTotal: computed,
		});
		autorun(() => console.log(this.filteredTransactionsSubTotal));
	}

	logit(value) {
		console.log(`hiii + ${value}`);
	}

	get totalActive() {
		return this.active.length;
	}

	get filteredTransactions() {
		return this.transactions.filter((item) => {
			return item[1].toLowerCase().includes(this.searchTerm.toLowerCase());
		});
	}

	get filteredTransactionsSubTotal() {
		const amounts = this.filteredTransactions.map((item) => Number(item[2]));
		var sum = amounts.reduce((a, b) => a + b, 0);

		return sum;
	}

	setTransactions(transactions) {
		this.transactions = transactions;
	}

	setSearchTerm(value) {
		this.searchTerm = value;
	}

	clearSearchTerm() {
		this.searchTerm = "";
	}
}

export default new TransactionStore();
