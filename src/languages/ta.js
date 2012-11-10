/**
 * Tamil language functions
 *
 * @author Vignesh Nandha Kumar
 */
( function ( $ ) {
	'use strict';

	var reLeadingVowel = /^[அ-ஔ]/,
	reTrailingVowel = /[^்]$/;


	/* ===============================
	   Helper functions
	   =============================== */

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

	function isNedilThodarKutriyaluharam ( word ) {
		return ( /^(([ஆஈஊஏஐஓஔ])|(.*[க-ஹ][ாீூேைோௌ]))([கசடதபற]ு)$/.test( word ) );
	}

	function isKutriyaluharam( word ) {
		var rePrefixes = [
			'(([ஆஈஊஏஐஓஔ])|(.*[க-ஹ][ாீூேைோௌ]))', // நெடில்
			'.+(ஃ|([கசடதபறஙஞணநமனயரலவழள]்))', // ஆய்தம், வன், மென், இடை மெய்கள் (Grantha alphabets excluded),
			'^([அஇஉஎஒ]|(.*[கசடதபறஙஞணநமனயரலவழள][ிுெொ]?))'
		],
		reFullString = '',
		i, len = rePrefixes.length;

		reFullString = '(';
		for ( i = 0; i < len; i++ ) {
			reFullString += rePrefixes[i] + ( i !== len - 1  ? '|' : '' );
		}
		reFullString += ')[கசடதபற]ு';

		return RegExp( reFullString ).test( word );
	}

	window.isKutriyaluharam = isKutriyaluharam;

	function isVetrumaiUrubu( word ) {
		var collection = [ 'ஐ',
						   'ஆல்', 'ஆன்', 'ஓடு', 'உடன்', 'கொண்டு',
						   'கு',
						   'இன்', 'இல்',
						   'அது',
						   'கண்', 'இடம்' ],
		i, len = collection.length
		for ( i = 0; i < len; i++ ) {
			if ( word === collection[i] ) {
				return true;
			}
		}
		return false;
	}
	/* End of Helper functions */

	function mergeWords( pre, suf, preIsName ) {
		var _pre = pre;

		if ( !preIsName && isKutriyaluharam( pre ) ) {
			pre = pre.replace( /ு$/, '்' );
			if ( isNedilThodarKutriyaluharam( _pre ) && isVetrumaiUrubu( suf ) ) {
				pre = pre.replace( /([க-ஹ]்$)/, '$1$1' );
			}
		}

		/* Handlle 'கு' வேற்றுமை உருபு specially */
		if ( suf === 'கு' &&
			 ! /.*[இஈஐிீை]$/.test( pre ) ) {
			suf = 'இற்கு';
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
			case 'mergeNameSuffix':
				var words = word.split( /[ ]+/ );
				word = '';

				$.each( words, function ( i, node ) {
					if ( i === 0 ) {
						word = node;
					} else {
						word = mergeWords( word, node , form === 'mergeNameSuffix' );
					}
				} );
				return word;
			}
		}
	} );

}( jQuery ) );
