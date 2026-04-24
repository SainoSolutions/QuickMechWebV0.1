sap.ui.define([
    "sap/ui/core/UIComponent",
    "zmcwiseprdapp/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("zmcwiseprdapp.Component", {

        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }

    });
});