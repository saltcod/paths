import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard() {

	const [isCopied, setCopied] = useState( false );

	useEffect( () => {
		let timeout: ReturnType<typeof setTimeout>;
		if ( isCopied ) {
			timeout = setTimeout( () => setCopied( false ), 3000 )
		}
		return () => {
			clearTimeout( timeout );
		}
	}, [isCopied] )


	function handleCopy( text: string | undefined | null ) {
		if ( typeof text === 'string' || typeof text === 'number' ) {
			copy( text.toString() );
			setCopied( true );
		} else {
			setCopied( false );
			console.warn( 'Cannot copy this to the clipboard.' )
		}
	}
	return { isCopied, handleCopy }
}

