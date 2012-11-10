jQuery( document ).ready( function ( $ ) {
	'use strict';
	$.i18n.debug = true;
	var i18n = $.i18n();
	//i18n.destroy();

	var message = '{{grammar:merge|$1}}';

	function updateText( e ) {
		var input;
		i18n.locale = 'ta';
		input = $( '#prefix' ).val() + ' ' + $( '#suffix' ).val();

		$( '#result' )
			.text( $.i18n( message, input ) )
			.attr( 'title', message.toLocaleString() );
		e.preventDefault();
		e.stopPropagation();
	}

	$( '#merge-form' ).on( 'submit', updateText );
} );
