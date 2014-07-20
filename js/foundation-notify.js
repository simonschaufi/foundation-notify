/**
 * foundation-notify.js v1.0
 * Copyright 2014 Simon Schaufelberger
 * 
 * Inspired by https://github.com/goodybag/bootstrap-notify
 * 
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
!function ($) {
	var Notification = function (element, options) {
		var self = this;

		// Element collection
		this.$element = $(element);
		this.$note    = $('<div data-alert class="alert-box"></div>');
		this.options  = $.extend({}, $.fn.notify.defaults, options);

		// Setup from options
		if (this.options.transition) {
			if (this.options.transition == 'fade') {
				this.$note.addClass('in').addClass(this.options.transition);
			}
			else {
				this.$note.addClass(this.options.transition);
			}
		}
		else {
			this.$note.addClass('fade').addClass('in');
		}

		if (this.options.type) {
			this.$note.addClass(this.options.type);
		}

		if (typeof this.options.message === 'object'){
			if (this.options.message.html)
				this.$note.html(this.options.message.html);
			else {
				if (this.options.message.text) {
					this.$note.text(this.options.message.text);
				}
				else {
					this.$note.html(this.options.message);
				}
			}
		}

		if (this.options.closable) {
			this.$note.prepend($('<a href="#" class="close">&times;</a>'));
		}

		return this;
	};

	Notification.prototype.show = function () {
		var self = this;

		if (this.options.fadeOut.enabled) {
			this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', function () {
				self.options.onClose();
				$(this).remove();
				self.options.onClosed()
			});
		}

		this.$element.append(this.$note);
		
		// Initialize foundation alert plugin
		this.$element.foundation('alert');
	};

	Notification.prototype.hide = function () {
		var self = this;

		if (this.options.fadeOut.enabled) {
			this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', function () {
				self.options.onClose();
				$(this).remove();
				self.options.onClosed()
			});
		}
		else {
			self.options.onClose();
			this.$note.remove();
			self.options.onClosed()
		}
	};

	$.fn.notify = function (options) {
		return new Notification(this, options)
	};

	$.fn.notify.defaults = {
		type: '',
		closable: true,
		transition: 'fade',
		fadeOut: {
			enabled: true,
			delay: 3000
		},
		message: {
			html: false,
			text: 'This is a message.'
		},
		onClose: function () {},
		onClosed: function () {}
	}
}(window.jQuery);