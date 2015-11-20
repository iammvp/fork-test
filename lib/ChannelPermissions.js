"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChannelPermissions = (function () {
	function ChannelPermissions(data, channel) {
		_classCallCheck(this, ChannelPermissions);

		var self = this;

		function getBit(x) {
			return (self.packed >>> x & 1) === 1;
		}

		this.type = data.type; //either member or role
		this.id = data.id;

		if (this.type === "member") {
			this.packed = channel.server.getMember("id", data.id).evalPerms.packed;
		} else {
			this.packed = channel.server.getRole("id", data.id).packed;
		}

		this.packed = this.packed & ~data.deny;
		this.packed = this.packed | data.allow;

		this.deny = data.deny;
		this.allow = data.allow;
	}

	ChannelPermissions.prototype.serialise = function serialise() {
		return {
			createInstantInvite: this.createInstantInvite,
			manageRoles: this.manageRoles,
			manageChannels: this.manageChannels,
			readMessages: this.readMessages,
			sendMessages: this.sendMessages,
			sendTTSMessages: this.sendTTSMessages,
			manageMessages: this.manageMessages,
			embedLinks: this.embedLinks,
			attachFiles: this.attachFiles,
			readMessageHistory: this.readMessageHistory,
			mentionEveryone: this.mentionEveryone,
			voiceConnect: this.voiceConnect,
			voiceSpeak: this.voiceSpeak,
			voiceMuteMembers: this.voiceMuteMembers,
			voiceDeafenMembers: this.voiceDeafenMembers,
			voiceMoveMember: this.voiceMoveMembers,
			voiceUseVoiceActivation: this.voiceUseVoiceActivation
		};
	};

	ChannelPermissions.prototype.serialize = function serialize() {
		return this.serialise();
	};

	ChannelPermissions.prototype.getBit = function getBit(x) {
		if ((this.packed >>> 3 & 1) === 1) {
			return true;
		}
		return (this.packed >>> x & 1) === 1;
	};

	ChannelPermissions.prototype.setBit = function setBit(location, value) {

		if (value) {
			// allow that permission
			this.packed |= 1 << location;
		} else {
			// not allowed
			this.packed &= 1 << location;
		}
	};

	_createClass(ChannelPermissions, [{
		key: "asAllowDisallow",
		get: function get() {

			var allow = 0,
			    disallow = 0;

			function ad(value, position) {
				if (value) {
					allow |= 1 << position;
				} else {
					disallow |= 1 << position;
				}
			}

			ad(this.createInstantInvite, 0);
			ad(this.manageRoles, 3);
			ad(this.manageChannels, 4);
			ad(this.readMessages, 10);
			ad(this.sendMessages, 11);
			ad(this.sendTTSMessages, 12);
			ad(this.manageMessages, 13);
			ad(this.embedLinks, 14);
			ad(this.attachFiles, 15);
			ad(this.readMessageHistory, 16);
			ad(this.mentionEveryone, 17);
			ad(this.voiceConnect, 20);
			ad(this.voiceSpeak, 21);
			ad(this.voiceMuteMembers, 22);
			ad(this.voiceDeafenMembers, 23);
			ad(this.voiceMoveMembers, 24);
			ad(this.voiceUseVoiceActivation, 25);

			return {
				allow: allow,
				deny: disallow
			};
		}
	}, {
		key: "createInstantInvite",
		get: function get() {
			return this.getBit(0);
		},
		set: function set(val) {
			this.setBit(0, val);
		}
	}, {
		key: "manageRoles",
		get: function get() {
			return this.getBit(3);
		},
		set: function set(val) {
			this.setBit(3, val);
		}
	}, {
		key: "manageChannels",
		get: function get() {
			return this.getBit(4);
		},
		set: function set(val) {
			this.setBit(4, val);
		}
	}, {
		key: "readMessages",
		get: function get() {
			return this.getBit(10);
		},
		set: function set(val) {
			this.setBit(10, val);
		}
	}, {
		key: "sendMessages",
		get: function get() {
			return this.getBit(11);
		},
		set: function set(val) {
			this.setBit(11, val);
		}
	}, {
		key: "sendTTSMessages",
		get: function get() {
			return this.getBit(12);
		},
		set: function set(val) {
			this.setBit(12, val);
		}
	}, {
		key: "manageMessages",
		get: function get() {
			return this.getBit(13);
		},
		set: function set(val) {
			this.setBit(13, val);
		}
	}, {
		key: "embedLinks",
		get: function get() {
			return this.getBit(14);
		},
		set: function set(val) {
			this.setBit(14, val);
		}
	}, {
		key: "attachFiles",
		get: function get() {
			return this.getBit(15);
		},
		set: function set(val) {
			this.setBit(15, val);
		}
	}, {
		key: "readMessageHistory",
		get: function get() {
			return this.getBit(16);
		},
		set: function set(val) {
			this.setBit(16, val);
		}
	}, {
		key: "mentionEveryone",
		get: function get() {
			return this.getBit(17);
		},
		set: function set(val) {
			this.setBit(17, val);
		}
	}, {
		key: "voiceConnect",
		get: function get() {
			return this.getBit(20);
		},
		set: function set(val) {
			this.setBit(20, val);
		}
	}, {
		key: "voiceSpeak",
		get: function get() {
			return this.getBit(21);
		},
		set: function set(val) {
			this.setBit(21, val);
		}
	}, {
		key: "voiceMuteMembers",
		get: function get() {
			return this.getBit(22);
		},
		set: function set(val) {
			this.setBit(22, val);
		}
	}, {
		key: "voiceDeafenMembers",
		get: function get() {
			return this.getBit(23);
		},
		set: function set(val) {
			this.setBit(23, val);
		}
	}, {
		key: "voiceMoveMembers",
		get: function get() {
			return this.getBit(24);
		},
		set: function set(val) {
			this.setBit(24, val);
		}
	}, {
		key: "voiceUseVoiceActivation",
		get: function get() {
			return this.getBit(25);
		},
		set: function set(val) {
			this.setBit(25, val);
		}
	}]);

	return ChannelPermissions;
})();

module.exports = ChannelPermissions;