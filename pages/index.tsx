//const data = require('../data/cibc.json');
import { server } from "../config";
import * as Papa from "papaparse";

import Layout from "../components/Layout";
import Record from "../components/Record";
import { convertStringToDate } from "../lib/helpers";



interface APIResponse {
	transactions: {
		data: [],
		errors: []
		meta: {}
	}
}


export default function Home( { transactions }: APIResponse ) {

	return (
		<>
			<Layout>
				<div className="grid gap-4 font-mono text-sm">
					{transactions.data.map( ( item: any ) => item[0].length > 0 ? ( <Record key={item[1].replace( /\D+/g, '' )} date={convertStringToDate( item[0] )} name={item[1]} amount={item[2]} /> ) : null

					)}
				</div>
			</Layout>
		</>
	);
}

Home.getInitialProps = async () => {
	const res = await fetch( `${server}/data/cibc-short.csv` );

	const data = await res.text();
	const transactions = Papa.parse( data );
	return { transactions };
};
