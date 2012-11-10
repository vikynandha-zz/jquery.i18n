jQuery( document ).ready( function ( $ ) {
	'use strict';
	$.i18n.debug = true;
	var i18n = $.i18n();
	//i18n.destroy();

	var message;

	function updateText( e ) {

		var $this = $( this ), input;
		i18n.locale = 'ta';
		input = $this.find( '.prefix' ).val() + ' ' + $this.find( '.suffix' ).val();

		if ( $this.find( '.prefix' ).data( 'i18n-type' ) === 'name' ) {
			message = '{{grammar:mergeNameSuffix|$1}}';
		} else {
			message = '{{grammar:merge|$1}}';
		}

		//console.log( message );

		$( '#result' )
			.text( $.i18n( message, input ) )
			.attr( 'title', message.toLocaleString() );

		e.preventDefault();
		e.stopPropagation();
	}

	$( 'form' ).on( 'submit', updateText );
} );
