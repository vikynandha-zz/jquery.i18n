jQuery( document ).ready( function ( $ ) {
	'use strict';
	$.i18n.debug = true;
	var i18n = $.i18n();
	//i18n.destroy();

	$.extend( $.i18n.parser.emitter, {
		concatspecial: function( nodes ) {
			if( i18n.locale !== 'ta' ) {
				return _concat( nodes );
			}

			var result = '', getSuffix = function( original ) {
				return {
					'அ':'',
					'ஆ': 'ா',
					'இ': 'ி',
					'ஈ': 'ீ',
					'உ': 'ு',
					'ஊ': 'ூ',
					'எ': 'ெ',
					'ஏ': 'ே',
					'ஐ': 'ை',
					'ஒ': 'ொ',
					'ஓ': 'ோ',
					'ஔ': 'ௌ'
				} [ original ];
			};

			$.each( nodes, function ( i, node ) {
				if ( i === 0 ) {
					result = node;
				} else {
					result += ( /.*[இஈஐிீை]$/.test( result ) ? 'ய' : 'வ' ) + node.replace( /^[அ-ஔ]/, getSuffix( node[0] ) );
				}
			} );
			return result;
		}
	} );

	var message = '$1 has $2 {{plural:$2|kitten|kittens}}. ' +
		'{{gender:$3|He|She}} loves to play with {{plural:$2|it|them}}.';

	function updateText() {
		var language, person, sex, kittens;

		language = $( '.language option:selected' ).val();
		i18n.locale = language;
		person = $.i18n( $( '.person option:selected' ).text() );
		sex = $( '.person option:selected' ).val();
		kittens = $( '.kittens' ).val();
		$( '.result' )
			.text( $.i18n( message, person, kittens, sex ) )
			.attr( 'title', message.toLocaleString() );
	}
	updateText();
	$( '.kittens, .person, .language' ).on( 'change keyup', updateText );
} );
