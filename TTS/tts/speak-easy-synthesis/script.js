try {

	var synth = window.speechSynthesis;

	var voices=[];

	var inputForm = document.querySelector('form');
	var inputTxt = document.getElementById('text');
	var output = document.getElementById("output");

	function print(text) {
		output.innerHTML+=text;
	}

	function populateVoiceList() {
		voices = synth.getVoices().sort(function (a, b) {
			const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
			if ( aname < bname ) return -1;
			else if ( aname == bname ) return 0;
			else return +1;
		});
	}

	function speak(text,voice,rate=1,pitch=1){
		if (synth.speaking) {
			console.error('speechSynthesis.speaking');
			return;
		}
		if (text !== '') {
			var utterThis = new SpeechSynthesisUtterance(text);
			utterThis.onend = function (event) {
				print('SpeechSynthesisUtterance.onend');
			}
			utterThis.onerror = function (event) {
				console.error('SpeechSynthesisUtterance.onerror');
			}
			utterThis.voice = voice;
			utterThis.pitch = pitch;
			utterThis.rate = rate;
			synth.speak(utterThis);
		}
	}


	populateVoiceList();

	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = populateVoiceList();
	}

	inputForm.onSubmit(e) {
		e.preventDefault();
		speak(inputTxt.value,voice[i]);
	}

} catch(e) {
	print(e.message);
}
