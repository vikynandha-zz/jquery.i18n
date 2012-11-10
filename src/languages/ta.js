/**
 * Tamil language functions
 *
 * @author Vignesh Nandha Kumar
 */
( function ( $ ) {
	'use strict';

	var reLeadingVowel = /^[அ-ஔ]/,
	reTrailingVowel = /[^்]$/;

	function getVowelSuffix( original ) {
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

	function startsWithVowel( word ) {
		return reLeadingVowel.test( word );
	}

	function endsWithVowel( word ) {
		return reTrailingVowel.test( word );
	}

	function isKutriyaluharam( word ) {
		var re = /^(([ஆஈஊஏஐஓஔ])|(.*[க-ஹ][ாீூேைோௌ]))([கசடதபற]ு)$/;
		return re.test( word );
	}

	function mergeWords( pre, suf ) {

		if ( isKutriyaluharam( pre ) ) {
			console.log( 'Kutriyaluharam' );
			pre = pre.replace( /ு$/, '்' );
			pre = pre.replace( /([க-ஹ]்$)/, "$1$1" );
		}

		/* உடம்படுமெய் (vowel + vowel) */
		if ( endsWithVowel( pre ) && startsWithVowel( suf ) ) {
			pre += ( /.*[இஈஐிீை]$/.test( pre ) ? 'ய' : 'வ' );
			suf = suf.replace( reLeadingVowel, getVowelSuffix( suf[0] ) );
		} else if ( startsWithVowel( suf ) ) {
			pre = pre.replace( /்$/, '' );
			suf = suf.replace( reLeadingVowel, getVowelSuffix( suf[0] ) );
		}

		return pre + suf;
	}

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
			switch ( form ) {
			// Merge two words into single word
			case 'merge':
				var words = word.split( /[ ]+/ );
				word = '';

				$.each( words, function ( i, node ) {
					console.log( node );
					if ( i === 0 ) {
						word = node;
					} else {
						word = mergeWords( word, node );
					}
				} );
				return word;
			}
		}
	} );

}( jQuery ) );
