/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["zmcwiseprdapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
