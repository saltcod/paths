import {
	action,
	computed,
	makeObservable,
	observable,
	autorun,
	runInAction,
} from "mobx";

class PetOwnerStore {
	pets = ["Clarence", "Timmy"];

	constructor() {
		makeObservable(this, {
			pets: observable,
			totalPets: computed,
			storeDetails: computed,
			createPet: action,
			updatePet: action,
			deletePet: action,
		});
		autorun(this.logStoreDetails);
		// runInAction(this.prefetchData);
	}

	// total number of pets
	get totalPets() {
		return this.pets.length;
	}

	createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
		this.pets.push(pet);
		return pet;
	}

	updatePet(petId, update) {
		const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
		if (petIndexAtId > -1 && update) {
			this.pets[petIndexAtId] = update;
			return this.pets[petIndexAtId];
		}
	}

	deletePet(petId) {
		const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
		if (petIndexAtId > -1) {
			this.pets.splice(petIndexAtId, 1);
		}
	}

	get storeDetails() {
		return `We have ${this.totalPets} pets.`;
	}

	logStoreDetails = () => {
		console.log(this.storeDetails);
	};

	prefetchData = () => {
		// const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 1 }];
		// const pets = [
		// 	{
		// 		id: 1,
		// 		name: "Lincy",
		// 		breed: "Siamese",
		// 		type: "Cat",
		// 		ownerId: 1,
		// 	},
		// ];
		// setTimeout(() => {
		// 	console.log("Fetch complete update store");
		// 	owners.map((pet) => this.createOwner(pet));
		// 	pets.map((pet) => {
		// 		this.createPet(pet);
		// 		this.assignOwnerToPet(pet.ownerId, pet.id);
		// 		return pet;
		// 	});
		// }, 3000);
	};
}

export default PetOwnerStore;
