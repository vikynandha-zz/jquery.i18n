/**
 * Tamil language functions
 *
 * @author Vignesh Nandha Kumar
 */
( function ( $ ) {
	'use strict';

	$.i18n.languages.ta = $.extend( {}, $.i18n.languages['default'], {
		/**
		 * Grammatical transformations, needed for inflected languages.
		 * Invoked by putting {{grammar:form|word}} in a message.
		 *
		 * @param form {String} rule to apply
		 * @param words {String} Word or List of words to operate on
		 * @return {String}
		 */
		convertGrammar: function ( word, form ) {
			var varumozhi = form.split( '__' )[ 1 ];
			form = form.split( '__' )[ 0 ];

			switch ( form ) {
			case 'join':
				var getSuffix = function( original ) {
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

				word += ( /.*[இஈஐிீை]$/.test( word ) ? 'ய' : 'வ' ) + varumozhi.replace( /^[அ-ஔ]/, getSuffix( varumozhi[0] ) );
				return word;
			}
		}
	} );

}( jQuery ) );
