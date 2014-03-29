var Doloco = Doloco || {};

Doloco.api = {
	sendToTwillio: function (number, message) {
		$('#twilio-number').val(number);
		$('#twilio-message').val(message);

		$.ajax({
			url: '/api/twilio',
			method: 'POST',
			data: $('#twilio-form').serialize(),
			success: function (data) {
				console.log(data);
			}
		})
	}
}

$(document).ready(function() {
	
});
