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

$(function() {
	$(document).on('click', '.js-invite-contacts', function(e) {
		var numbers = $('.contact-number:checked').map(function () {
				return this.value;
			}).get(),
			message = "You have been invited to join a DoLoCo community lending circle";

		for (var i = 0; i < numbers.length; i++) {
			var telNum = numbers[i];

			Doloco.api.sendToTwillio(telNum, message);
		}
	});
});
