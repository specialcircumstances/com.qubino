'use strict';

const path = require('path');
const ZwaveDriver = require('node-homey-zwavedriver');

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
		onoff: {
			command_class: 'COMMAND_CLASS_SWITCH_BINARY',
			command_get: 'SWITCH_BINARY_GET',
			command_set: 'SWITCH_BINARY_SET',
			command_set_parser: value => ({
				'Switch Value': (value) ? 'on/enable' : 'off/disable',
			}),
			command_report: 'SWITCH_BINARY_REPORT',
			command_report_parser: report => {
				if (report['Value'] === 'on/enable') {
					return true;
				} else if (report['Value'] === 'off/disable') {
					return false;
				}
				return null;
			},
		},
		dim: {
			command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			command_get: 'SWITCH_MULTILEVEL_GET',
			command_set: 'SWITCH_MULTILEVEL_SET',
			command_set_parser: value => ({
				Value: value * 100,
				'Dimming Duration': 1,
			}),
			command_report: 'SWITCH_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report && report['Value (Raw)']) return report['Value (Raw)'][0] / 100;
				return null;
			},
		},
	},
	settings: {
		all_on_all_off: {
			index: 10,
			size: 2
		},
		power_report_on_power_change: {
			index: 40,
			size: 1
		},
		power_report_by_time_interval: {
			index: 42,
			size: 2
		},
		operating_modes: {
			index: 71,
			size: 1
		},
		slats_tilting_full_turn_time: {
			index: 72,
			size: 2
		},
		slats_position: {
			index: 73,
			size: 1
		},
		motor_moving_up_down_time: {
			index: 74,
			size: 2
		},
		motor_operation_detection: {
			index: 76,
			size: 1
		},
		forced_shutter_calibration: {
			index: 78,
			size: 1
		},
		power_reporting_to_controller: {
			index: 80,
			size: 1
		},
		power_consumption_max_delay_time: {
			index: 85,
			size: 1
		},
		power_consumption_at_limit_switch_delay_time: {
			index: 86,
			size: 1
		},
		delay_time_between_outputs: {
			index: 90,
			size: 1
		},
		temperature_sensor_offset_settings: {
			index: 110,
			size: 2
		},
		digital_temperature_sensor_reporting: {
			index: 120,
			size: 1
		}
	}
}