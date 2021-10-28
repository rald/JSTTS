var synth = window.speechSynthesis;
var voices = [];

var output = document.getElementById("output");
var verses = document.querySelectorAll('.vers');



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

  	for(var i=0;i<voices.length;i++) {
		print("["+i+"] "+voices[i].name+" -> "+voices[i].lang+"<br>");
	}


}

function speak(text,voice,rate=1,pitch=1){
	if (synth.speaking) {
		console.error('speechSynthesis.speaking');
		return;
	}

	if (text !== '') {
		var utterThis = new SpeechSynthesisUtterance(text);

		utterThis.onend = function (event) {
			console.log('SpeechSynthesisUtterance.onend');
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

window.onload=function() {

	populateVoiceList();
	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = populateVoiceList;
	}

	var verses = document.querySelectorAll("div.vers");
	for(var i=0;i<verses.length;i++) {
		verses[i].innerHTML+="<br><br>";
		var link=verses[i].querySelectorAll("a")[0];
		link.onclick=function(e) {
			e.preventDefault();
			speak(this.textContent,voices[15],0.5,1);
		}
	}
}
