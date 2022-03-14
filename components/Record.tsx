import React from 'react'
import Badge from './Badge';

export interface RecordProps {
	date: Date;
	name: string;
	amount: number;
}

const wordsToStrip = [
	'Point of Sale',
	'Interac',
	'Internet Banking',
	'Automated Banking Machine',
	'RETAIL PURCHASE',
	'E-TRANSFER',
	'Electronic Funds Transfer',
	'PREAUTHORIZED DEBIT',
	' - ',
];

// function cleanString( str: string ) {
// 	let description = str.replace( 'Point of Sale', '' ).replace( 'Interac', '' ).replace( 'RETAIL PURCHASE', '' ).replace( /[0-9]{6,}/, '' ).replace( ' - ', '' ).replace('Automated Banking Machine', '').replace('Electronic Funds Transfer', '')

// 	return description
// }

function cleanString( str: string ) {
	let description = str;
	wordsToStrip.forEach( words => {
		description = description.replace( words, '' );
	} )

	// remove the 10 digit id
	description = description.replace( /[0-9]{6,}/, '' );
	return description
}


// Get the type of record:  transaction,
function getRecordType( record: string ): RecordType {
	if ( record.includes( 'INTERNET TRANSFER' ) ) {
		return 'Payment Transfer'
	}
	if ( record.includes( 'RETAIL PURCHASE' ) ) {
		return 'Retail Purchase'
	}
	if ( record.includes( 'PREAUTHORIZED DEBIT' ) ) {
		return 'Debit'
	}
	if ( record.includes( 'E-TRANSFER' ) ) {
		return 'E-Transfer'
	}
	if ( record.includes( 'BILL PAY' ) ) {
		return 'Bill Pay'
	}
	if ( record.includes( 'E-TRANSFER' ) ) {
		return 'E-Transfer'
	} else {
		return undefined;
	}

}

export default function Record( { date, name, amount }: RecordProps ) {

	return (
		<div className='flex gap-4'>
			<span>{date.toLocaleDateString( "en-CA", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			} )}</span>

			<span>{cleanString( name )}</span>
			<span>${amount}</span>
			<Badge type={getRecordType( name )} />
		</div>
	)
}
