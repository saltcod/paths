import { observer } from "mobx-react-lite";

function PetList({ store }) {
	console.log(store.pets);
	return (
		<div>
			the PetList {store.storeDetails}
			<p className="mt-4">
				<button
					onClick={() => console.log(store.createPet({ name: "Victor" }))}
				>
					Add Victor
				</button>
			</p>
			<p>The current pets are:</p>
			<ul>
				{store.pets.length}
				{/* {store.pets.map((pet) => (
					<li>{pet}</li>
				))} */}
			</ul>
		</div>
	);
}

export default observer(PetList);
