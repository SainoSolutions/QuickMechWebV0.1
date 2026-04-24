sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/ValueState",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Label",
    "sap/m/Column",
    "sap/ui/table/Column",
    "sap/m/Text",
    "sap/m/List",
    "sap/m/CustomListItem",
    "sap/m/HBox",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/ScrollContainer",
    "sap/m/CheckBox",
    "sap/ui/Device"
], function (Controller, JSONModel, MessageBox, MessageToast, ValueState, Dialog, Input, Select, Item, Button, VBox, Label, MobileColumn, UITableColumn, Text, List, CustomListItem, HBox, SimpleForm, ScrollContainer, CheckBox, Device) {
    "use strict";

    return Controller.extend("zmcwiseprdapp.controller.MainView", {
        
        /**
         * Helper to get i18n text
         */
        getText: function (sKey, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
        },
        
        // Store dynamic columns
        _dynamicColumns: [],
        _columnDialog: null,
        _addColumnDialog: null,
        
        
        onInit: function () {
            // Register device model so views can bind to device>/system/phone etc.
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.getView().setModel(oDeviceModel, "device");

            // Initialize models
            this._initModels();
            
            // Check admin authorization
            this._checkAdminAuthorization();
            
            // Load saved custom columns
            this._loadCustomColumns();
            
            // Set initial data
            this._setInitialData();
            
            // Check time window
            this._checkTimeWindow();
        },

        /**
         * Initialize all JSON Models
         */
        _initModels: function () {
            // Input Model - For header input fields
            var inputModel = new JSONModel({
                MATNR: "",
                WERKS: "",
                CHARG: "",
                AUFNR: "",
                materialState: ValueState.None,
                plantState: ValueState.None,
                batchState: ValueState.None,
                materialStateText: "",
                plantStateText: "",
                batchStateText: "",
                processOrderAuto: false
            });
            this.getView().setModel(inputModel, "inputModel");

            // Table Model - For table data
            var tableModel = new JSONModel({
                rows: [],
                hasSelection: false,
                selectedRowIndex: -1
            });
            this.getView().setModel(tableModel, "tableModel");

            // Configuration Model
            var configModel = new JSONModel({
                isAdmin: false,
                userName: "",
                customColumns: [],
                remainingTime: "",
                timerUrgency: "Normal",
                timerExpired: false,
                isSubmitted: false
            });
            this.getView().setModel(configModel, "configModel");

            // Dropdown Model - For select options
            var dropdownModel = new JSONModel({
                breakdownTypes: [
                    { key: "CUT", text: this.getText("cutting") },
                    { key: "MEC", text: this.getText("mechanical") },
                    { key: "ELE", text: this.getText("electrical") }
                ],
                shifts: [
                    { key: "SHIFT_1", text: this.getText("shift1") },
                    { key: "SHIFT_2", text: this.getText("shift2") },
                    { key: "SHIFT_3", text: this.getText("shift3") }
                ]
            });
            this.getView().setModel(dropdownModel, "dropdownModel");

            // Time Check Model
            var timeModel = new JSONModel({
                isWithinWindow: true,
                lastGRTime: null,
                timeRemaining: 240
            });
            this.getView().setModel(timeModel, "timeCheck");
        },

        /**
         * Set initial data for testing
         */
        _setInitialData: function () {
            var tableModel = this.getView().getModel("tableModel");
            var inputModel = this.getView().getModel("inputModel");

            // Set header fields
            inputModel.setProperty("/MATNR", "4000000090");
            inputModel.setProperty("/WERKS", "UN02");
            inputModel.setProperty("/CHARG", "BATCH-20260220-A");
            inputModel.setProperty("/AUFNR", "");
            inputModel.setProperty("/processOrderAuto", true);

            // Sample data
            var sampleRows = [
                {
                    lineNo: 1,
                    selected: false,
                    ZSKUGRCODECRS: "2000100012009",
                    ARBPL: "FILTU05",
                    ARBPL_DESC: "FILTU05 - Changeover",
                    WERKS: "UN02",
                    MENGE: "40000",
                    ZEQP_NO_DT: "2",
                    ZTOT_DT: "10",
                    ZTOT_PLANNED_DT: "18",
                    ZPL_DT: "30",
                    PRIORITY: "10",
                    ZEQP_BREAK_TOTAL: "14",
                    ZUTILITY_FAIL_DT: "2",
                    ZCUT_BLADE_DT: "4",
                    ZCHANGEOVER_DT: "6",
                    ZFILL_BULK_DT: "",
                    ZPM_STOCK_DT: "",
                    ZSHIFT: "SHIFT_1"
                },
                {
                    lineNo: 2,
                    selected: false,
                    ZSKUGRCODECRS: "2000100012009",
                    ARBPL: "FILTU06",
                    ARBPL_DESC: "FILTU06 - Packing",
                    WERKS: "UN02",
                    MENGE: "15000",
                    ZEQP_NO_DT: "1",
                    ZTOT_DT: "15",
                    ZTOT_PLANNED_DT: "20",
                    ZPL_DT: "40",
                    PRIORITY: "6",
                    ZEQP_BREAK_TOTAL: "10",
                    ZUTILITY_FAIL_DT: "1",
                    ZCUT_BLADE_DT: "3",
                    ZCHANGEOVER_DT: "4",
                    ZFILL_BULK_DT: "2",
                    ZPM_STOCK_DT: "1",
                    ZSHIFT: "SHIFT_1"
                },
                {
                    lineNo: 3,
                    selected: false,
                    ZSKUGRCODECRS: "2000100012009",
                    ARBPL: "FILTU08",
                    ARBPL_DESC: "FILTU08 - Filling",
                    WERKS: "UN02",
                    MENGE: "45000",
                    ZEQP_NO_DT: "3",
                    ZTOT_DT: "25",
                    ZTOT_PLANNED_DT: "29",
                    ZPL_DT: "23",
                    PRIORITY: "8",
                    ZEQP_BREAK_TOTAL: "18",
                    ZUTILITY_FAIL_DT: "3",
                    ZCUT_BLADE_DT: "4",
                    ZCHANGEOVER_DT: "5",
                    ZFILL_BULK_DT: "1",
                    ZPM_STOCK_DT: "2",
                    ZSHIFT: "SHIFT_1"
                }
            ];

            tableModel.setProperty("/rows", sampleRows);
            tableModel.setProperty("/hasSelection", false);
            tableModel.setProperty("/selectedRowIndex", -1);
        },

        /**
         * Check if current user is admin
         */
        _checkAdminAuthorization: function () {
            var that = this;
            
            // Simulate backend call to check admin authorization
            setTimeout(function () {
                var configModel = that.getView().getModel("configModel");
                
                // Mock admin check - Replace with actual authorization check
                var isAdmin = true; // Set to true for testing
                
                configModel.setProperty("/isAdmin", isAdmin);
                configModel.setProperty("/userName", "TEST_USER");
                
                if (isAdmin) {
                    console.log("Admin mode enabled - Column management available");
                }
            }, 100);
        },

        /**
         * Load saved custom columns from localStorage
         */
        _loadCustomColumns: function () {
            var configModel = this.getView().getModel("configModel");
            
            // Try to load from localStorage
            var savedColumns = localStorage.getItem("zmc_custom_columns");
            
            if (savedColumns) {
                try {
                    var columns = JSON.parse(savedColumns);
                    configModel.setProperty("/customColumns", columns);
                    this._dynamicColumns = columns;
                    this._addDynamicColumnsToTable();
                } catch (e) {
                    console.log("Error loading custom columns:", e);
                }
            }
        },

        /**
         * Save custom columns to localStorage
         */
        _saveCustomColumns: function () {
            var configModel = this.getView().getModel("configModel");
            var columns = configModel.getProperty("/customColumns") || [];
            localStorage.setItem("zmc_custom_columns", JSON.stringify(columns));
        },

        /**
         * Add dynamic columns to table
         */
         _addDynamicColumnsToTable: function () {
            var oTable = this.getView().byId("downtimeTable");
            var oMobileTable = this.getView().byId("mobileTable");
            var configModel = this.getView().getModel("configModel");
            var customColumns = configModel.getProperty("/customColumns") || [];
            
            // 1. Update Desktop Table
            if (oTable) {
                // Safely remove and destroy existing dynamic columns
                var aColumns = oTable.getColumns();
                for (var i = aColumns.length - 1; i >= 0; i--) {
                    var oCol = aColumns[i];
                    if (oCol.data && oCol.data("isDynamic")) {
                        oTable.removeColumn(oCol);
                        oCol.destroy();
                    }
                }
                
                // Reset to base width then add dynamic widths
                var baseWidth = 3320; 
                var dynamicWidth = 0;
                customColumns.forEach(function (colConfig) {
                    var w = parseInt(colConfig.width) || 150;
                    dynamicWidth += w;
                });
                oTable.setWidth((baseWidth + dynamicWidth) + "px");
                
                // Add each custom column
                customColumns.forEach(function (colConfig) {
                    var oColumn = this._createDynamicColumn(colConfig);
                    if (oColumn) {
                        oColumn.data("isDynamic", true);
                        oTable.addColumn(oColumn);
                    }
                }.bind(this));
            }

            // 2. Update Mobile Responsive Table using real sap.m columns/cells
            if (oMobileTable) {
                // Remove old dynamic mobile columns
                var aMobileColumns = oMobileTable.getColumns();
                for (var m = aMobileColumns.length - 1; m >= 0; m--) {
                    var oMobileCol = aMobileColumns[m];
                    if (oMobileCol.data && oMobileCol.data("isDynamic")) {
                        oMobileTable.removeColumn(oMobileCol);
                        oMobileCol.destroy();
                    }
                }

                var oBindingInfo = oMobileTable.getBindingInfo("items");
                if (oBindingInfo && oBindingInfo.template) {
                    var oTemplate = oBindingInfo.template;
                    // Remove old dynamic template cells
                    var aCells = oTemplate.getCells();
                    for (var j = aCells.length - 1; j >= 0; j--) {
                        var oCell = aCells[j];
                        if (oCell.data && oCell.data("isDynamic")) {
                            oTemplate.removeCell(oCell);
                            oCell.destroy();
                        }
                    }

                    // Add dynamic columns + matching dynamic cells
                    customColumns.forEach(function (colConfig) {
                        var oMobileColumn = new MobileColumn({
                            hAlign: colConfig.hAlign || "Begin",
                            minScreenWidth: "Desktop",
                            demandPopin: true,
                            popinDisplay: "WithoutHeader"
                        });
                        oMobileColumn.data("isDynamic", true);
                        oMobileTable.addColumn(oMobileColumn);

                        var oDynamicMobileCell = new VBox({
                            visible: "{= !!${tableModel>expanded} }",
                            width: "100%",
                            items: [
                                new VBox({
                                    width: "100%",
                                    items: [
                                        new Label({ text: colConfig.name }).addStyleClass("zmcMobileLbl"),
                                        new Input({
                                            value: "{tableModel>" + colConfig.property + "}",
                                            type: colConfig.type === "number" ? "Number" : "Text",
                                            textAlign: colConfig.hAlign === "End" ? "End" : (colConfig.hAlign === "Center" ? "Center" : "Begin"),
                                            width: "100%",
                                            editable: "{= !${configModel>/isSubmitted} }"
                                        })
                                    ]
                                }).addStyleClass("sapUiSmallMarginBottom")
                            ]
                        });
                        oDynamicMobileCell.data("isDynamic", true);
                        oTemplate.addCell(oDynamicMobileCell);
                    });

                    // Force refresh so template changes apply to existing rows
                    oMobileTable.bindItems(oBindingInfo);
                }
            }
            
            // Invalidate to force UI refresh
            if (oTable) oTable.invalidate();
        },

        /**
         * Create a dynamic column
         */
        _createDynamicColumn: function (colConfig) {
            var that = this;
            
            var oColumn = new UITableColumn({
                width: colConfig.width || "150px",
                hAlign: colConfig.hAlign || "Begin",
                vAlign: "Middle",
                resizable: false
            });
            
            // Create header with delete button
            var oHBox = new HBox({
                alignItems: "Center",
                justifyContent: "SpaceBetween",
                width: "100%"
            });
            
            var oLabel = new Label({
                text: colConfig.name,
                wrapping: true
            }).addStyleClass("zmcHeaderLabel");
            
            var oDeleteBtn = new Button({
                icon: "sap-icon://delete",
                tooltip: "Delete Column",
                type: "Transparent",
                press: function () {
                    that._deleteCustomColumn(colConfig.property);
                }
            }).addStyleClass("zmcDeleteColumnBtn");
            
            oHBox.addItem(oLabel);
            oHBox.addItem(oDeleteBtn);
            oColumn.setCustomHeader(oHBox);
            
            // Create template with proper submission-based editable binding
            var oTemplate = new Input({
                value: "{tableModel>" + colConfig.property + "}",
                editable: "{= !${configModel>/isSubmitted} }",
                textAlign: colConfig.hAlign === "End" ? "End" : (colConfig.hAlign === "Center" ? "Center" : "Begin"),
                width: "100%",
                change: function (oEvent) {
                    if (colConfig.type === "number") {
                        var sValue = oEvent.getParameter("value");
                        if (sValue && !/^\d*\.?\d*$/.test(sValue)) {
                            oEvent.getSource().setValue("");
                            MessageToast.show(that.getText("invalidNumber"));
                        }
                    }
                }
            }).addStyleClass("zmcTableInput");
            
            oColumn.setTemplate(oTemplate);
            return oColumn;
        },

        /**
         * Delete a custom column
         */
        _deleteCustomColumn: function (property) {
            var that = this;
            var configModel = this.getView().getModel("configModel");
            var customColumns = configModel.getProperty("/customColumns") || [];
            
            MessageBox.confirm(this.getText("confirmDeleteColumn"), {
                title: "Confirm Delete",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Remove column from configuration
                        var updatedColumns = customColumns.filter(function (col) {
                            return col.property !== property;
                        });
                        
                        configModel.setProperty("/customColumns", updatedColumns);
                        that._dynamicColumns = updatedColumns;
                        
                        // Save to localStorage
                        that._saveCustomColumns();
                        
                        // Remove property from all rows
                        var tableModel = that.getView().getModel("tableModel");
                        var rows = tableModel.getProperty("/rows");
                        rows.forEach(function (row) {
                            delete row[property];
                        });
                        tableModel.setProperty("/rows", rows);
                        
                        // Rebuild table
                        that._addDynamicColumnsToTable();
                        
                        MessageToast.show(this.getText("columnDeletedSuccess"));
                    }
                }
            });
        },

        /**
         * Open column management dialog
         */
        onManageColumns: function () {
            var that = this;
            var configModel = this.getView().getModel("configModel");
            
            // Check if user is admin
            if (!configModel.getProperty("/isAdmin")) {
                MessageBox.warning(this.getText("adminOnlyWarning"));
                return;
            }
            
            // Create dialog if not exists
            if (!this._columnDialog) {
                this._columnDialog = new Dialog({
                    title: "Manage Custom Columns",
                    contentWidth: "500px",
                    contentHeight: "500px",
                    resizable: true,
                    draggable: true,
                    class: "zmcColumnDialog",
                    buttons: [
                        new Button({
                            text: "Add New Column",
                            icon: "sap-icon://add",
                            type: "Accept",
                            press: function () {
                                that._openAddColumnDialog();
                            }
                        }),
                        new Button({
                            text: "Close",
                            press: function () {
                                that._columnDialog.close();
                            }
                        })
                    ]
                });
                
                this.getView().addDependent(this._columnDialog);
            }
            
            // Update content
            this._updateColumnList();
            
            this._columnDialog.open();
        },

        /**
         * Update column list in dialog
         */
        _updateColumnList: function () {
            var that = this;
            var configModel = this.getView().getModel("configModel");
            var customColumns = configModel.getProperty("/customColumns") || [];
            
            var oVBox = new VBox({
                width: "100%"
            });
            
            if (customColumns.length === 0) {
                oVBox.addItem(new Text({
                    text: "No custom columns added yet. Click 'Add New Column' to create one.",
                    textAlign: "Center",
                    class: "zmcColumnMeta"
                }));
            } else {
                customColumns.forEach(function (colConfig, index) {
                    var oListItem = new HBox({
                        justifyContent: "SpaceBetween",
                        alignItems: "Center",
                        width: "100%",
                        class: "zmcColumnListItem"
                    });
                    
                    var oInfo = new VBox({
                        items: [
                            new Text({
                                text: colConfig.name,
                                class: "zmcColumnName"
                            }),
                            new Text({
                                text: "Type: " + colConfig.type + " | Property: " + colConfig.property,
                                class: "zmcColumnMeta"
                            })
                        ]
                    });
                    
                    var oButtonBox = new HBox({
                        items: [
                            new Button({
                                icon: "sap-icon://navigation-up-arrow",
                                tooltip: "Move Left",
                                type: "Transparent",
                                enabled: index > 0,
                                press: function () {
                                    that._moveCustomColumn(colConfig.property, "left");
                                }
                            }),
                            new Button({
                                icon: "sap-icon://navigation-down-arrow",
                                tooltip: "Move Right",
                                type: "Transparent",
                                enabled: index < customColumns.length - 1,
                                press: function () {
                                    that._moveCustomColumn(colConfig.property, "right");
                                }
                            }),
                            new Button({
                                icon: "sap-icon://delete",
                                tooltip: "Delete",
                                type: "Transparent",
                                press: function () {
                                    that._columnDialog.close();
                                    that._deleteCustomColumn(colConfig.property);
                                }
                            })
                        ]
                    });
                    
                    oListItem.addItem(oInfo);
                    oListItem.addItem(oButtonBox);
                    oVBox.addItem(oListItem);
                });
            }
            
            var oScrollContainer = new ScrollContainer({
                height: "100%",
                width: "100%",
                vertical: true,
                content: [oVBox]
            });
            
            this._columnDialog.removeAllContent();
            this._columnDialog.addContent(oScrollContainer);
        },

        /**
         * Move custom column left or right
         */
        _moveCustomColumn: function (property, direction) {
            var configModel = this.getView().getModel("configModel");
            var customColumns = configModel.getProperty("/customColumns") || [];
            
            var index = customColumns.findIndex(function (col) {
                return col.property === property;
            });
            
            if (index === -1) return;
            
            if (direction === "left" && index > 0) {
                var temp = customColumns[index - 1];
                customColumns[index - 1] = customColumns[index];
                customColumns[index] = temp;
            } else if (direction === "right" && index < customColumns.length - 1) {
                var temp = customColumns[index + 1];
                customColumns[index + 1] = customColumns[index];
                customColumns[index] = temp;
            }
            configModel.setProperty("/customColumns", customColumns);
            this._dynamicColumns = customColumns;
            this._saveCustomColumns();
            this._addDynamicColumnsToTable();
            this._updateColumnList();
        },

        /**
         * Mobile row expand/collapse toggle (triggered by arrow Icon press only)
         * Walks up the parent chain from the Icon to find the ColumnListItem context.
         */
        onToggleMobileRow: function (oEvent) {
            var oSource = oEvent.getSource();

            // Walk up from Icon → HBox → HBox → ColumnListItem to get row context
            var oControl = oSource;
            var oContext = null;
            while (oControl) {
                oContext = oControl.getBindingContext("tableModel");
                if (oContext) break;
                oControl = oControl.getParent ? oControl.getParent() : null;
            }

            if (oContext) {
                var bExpanded = !!oContext.getProperty("expanded");
                oContext.getModel().setProperty(oContext.getPath() + "/expanded", !bExpanded);
            }
        },


        /**
         * Open add column dialog
         */
        _openAddColumnDialog: function () {
            var that = this;
            
            if (!this._addColumnDialog) {
                this._addColumnDialog = new Dialog({
                    title: "Add New Column",
                    contentWidth: "400px",
                    resizable: false,
                    draggable: true,
                    class: "zmcColumnDialog"
                });
                
                this.getView().addDependent(this._addColumnDialog);
            }
            
            var oForm = new SimpleForm({
                maxContainerCols: 1,
                content: [
                    new Label({ text: "Column Name", required: true }),
                    new Input("colName", {
                        placeholder: "e.g., Remarks",
                        width: "100%"
                    }),
                    new Label({ text: "Field Type" }),
                    new Select("colType", {
                        width: "100%",
                        items: [
                            new Item({ key: "text", text: "Text" }),
                            new Item({ key: "number", text: "Number" })
                        ]
                    }),
                    new Label({ text: "Width" }),
                    new Input("colWidth", {
                        placeholder: "e.g., 150px",
                        value: "150px",
                        width: "100%"
                    }),
                    new Label({ text: "Alignment" }),
                    new Select("colAlign", {
                        width: "100%",
                        items: [
                            new Item({ key: "Begin", text: "Left" }),
                            new Item({ key: "Center", text: "Center" }),
                            new Item({ key: "End", text: "Right" })
                        ]
                    })
                ]
            });
            
            this._addColumnDialog.removeAllContent();
            this._addColumnDialog.addContent(oForm);
            
            this._addColumnDialog.setBeginButton(new Button({
                text: "Add",
                type: "Accept",
                press: function () {
                    that._addNewColumn();
                }
            }));
            
            this._addColumnDialog.setEndButton(new Button({
                text: "Cancel",
                press: function () {
                    that._addColumnDialog.close();
                }
            }));
            
            this._addColumnDialog.open();
        },

        /**
         * Add new custom column
         */
        _addNewColumn: function () {
            var oNameInput = sap.ui.getCore().byId("colName");
            var oTypeSelect = sap.ui.getCore().byId("colType");
            var oWidthInput = sap.ui.getCore().byId("colWidth");
            var oAlignSelect = sap.ui.getCore().byId("colAlign");
            
            var sName = oNameInput.getValue();
            var sType = oTypeSelect.getSelectedKey();
            var sWidth = oWidthInput.getValue();
            var sAlign = oAlignSelect.getSelectedKey();
            
            if (!sName) {
                MessageToast.show(this.getText("columnNameRequired"));
                return;
            }
            
            // Create property name from column name
            var sProperty = "ZCUSTOM_" + sName.replace(/\s+/g, "_").toUpperCase() + "_" + Date.now();
            
            var configModel = this.getView().getModel("configModel");
            var customColumns = configModel.getProperty("/customColumns") || [];
            
            // Check if column name already exists
            var exists = customColumns.some(function (col) {
                return col.name === sName;
            });
            
            if (exists) {
                MessageToast.show(this.getText("duplicateColumnName"));
                return;
            }
            
            var newColumn = {
                name: sName,
                property: sProperty,
                type: sType || "text",
                width: sWidth || "150px",
                hAlign: sAlign || "Begin",
                editable: true,
                required: false
            };
            
            customColumns.push(newColumn);
            configModel.setProperty("/customColumns", customColumns);
            this._dynamicColumns = customColumns;
            
            // Save to localStorage
            this._saveCustomColumns();
            
            // Initialize the property in all existing rows
            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows");
            rows.forEach(function (row) {
                row[sProperty] = "";
            });
            tableModel.setProperty("/rows", rows);
            
            // Add column to table
            this._addDynamicColumnsToTable();
            
            this._addColumnDialog.close();
            this._updateColumnList();
            
            MessageToast.show(this.getText("columnAddedSuccess", [sName]));
        },

        /**
         * Keep lineNo in sync with row order
         */
        _renumberRows: function (rows) {
            rows.forEach(function (row, idx) {
                row.lineNo = idx + 1;
            });
            return rows;
        },

        /**
         * Auto-fetch defaults for read-only columns
         */
        _getAutoFetchedDefaults: function (rowIndex) {
            var inputModel = this.getView().getModel("inputModel");
            var plant = (inputModel && inputModel.getProperty("/WERKS")) || "UN02";
            var material = (inputModel && inputModel.getProperty("/MATNR")) || "2000100012009";
            var basePlanned = 18 + rowIndex;

            return {
                ZSKUGRCODECRS: material,
                WERKS: plant,
                ZTOT_PLANNED_DT: String(basePlanned),
                ZPL_DT: String(basePlanned + 10),
                ZSHIFT: "SHIFT_1"
            };
        },

        /**
         * Handle checkbox selection in row
         */
        onRowCheckboxSelect: function (oEvent) {
            var oSource = oEvent.getSource();
            var bSelected;
            var oContext;
            
            // Handle both sap.m.Table (Mobile) and CheckBox (Desktop)
            if (oEvent.getId() === "selectionChange" || (oSource.isA && oSource.isA("sap.m.Table"))) {
                var oListItem = oEvent.getParameter("listItem");
                if (!oListItem) return;
                bSelected = oListItem.getSelected();
                oContext = oListItem.getBindingContext("tableModel");
            } else if (oSource.getSelected) {
                bSelected = oSource.getSelected();
                oContext = oSource.getBindingContext("tableModel");
            } else {
                oContext = oSource.getBindingContext("tableModel");
                if (oContext) {
                    var oCurrentData = oContext.getObject();
                    bSelected = !oCurrentData.selected;
                }
            }
            
            if (!oContext) return;
            
            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows");
            var iIndex = parseInt(oContext.getPath().split("/").pop());
            
            // Single Selection: Uncheck others (Professional Grid behavior)
            rows.forEach(function (row, idx) {
                if (idx !== iIndex) {
                    row.selected = false;
                }
            });
            
            // Set current row state
            rows[iIndex].selected = bSelected;
            
            // Update models
            tableModel.setProperty("/rows", rows);
            tableModel.refresh(true);
            
            // Activate/Deactivate action buttons based on selection
            tableModel.setProperty("/hasSelection", bSelected);
            tableModel.setProperty("/selectedRowIndex", bSelected ? iIndex : -1);
            
            // Cleanup standard table selection highlights if triggered from elsewhere
            var oTable = this.getView().byId("downtimeTable");
            if (oTable && oSource !== oTable) {
                oTable.clearSelection();
            }
            
            this._updateSelectedCount();
        },

        /**
         * Toggle expanded state of mobile card
         */
        onToggleCardDetails: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("tableModel");
            var tableModel = this.getView().getModel("tableModel");
            
            // Toggle the 'expanded' property
            var bCurrentExpanded = oContext.getProperty("expanded") || false;
            tableModel.setProperty("expanded", !bCurrentExpanded, oContext);
            
            // Single Expansion Logic: Close others (Optional, usually better for mobile)
            var rows = tableModel.getProperty("/rows");
            var currentPath = oContext.getPath();
            rows.forEach(function(row, idx) {
                var path = "/rows/" + idx;
                if (path !== currentPath) {
                    tableModel.setProperty("expanded", false, oContext.getModel().getContext(path));
                }
            });
            
            tableModel.refresh(true);
        },

        /**
         * Update selected row count display
         */
        _updateSelectedCount: function () {
            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows") || [];
            var selectedCount = rows.filter(function (row) {
                return row.selected === true;
            }).length;
            
            console.log("Selected rows: " + selectedCount);
        },

        /**
         * Get selected row index
         */
        _getSelectedRowIndex: function () {
            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows") || [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].selected === true) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * ADD NEW ROW
         */
        onAddRow: function () {
            var that = this;
            var tableModel = this.getView().getModel("tableModel");
            var configModel = this.getView().getModel("configModel");
            
            // Check if header fields are filled
            if (!this._validateHeaderFields()) {
                MessageBox.warning(this.getText("fillRequiredFields"));
                return;
            }
            
            // Check time window
            if (!this._checkTimeWindowForEntry()) {
                MessageBox.warning(this.getText("timeWindowExpiredWarning"));
                return;
            }
            
            // Get current rows
            var rows = tableModel.getProperty("/rows");
            if (!rows) {
                rows = [];
            }
            
            // Uncheck all existing rows
            rows.forEach(function (row) {
                row.selected = false;
            });
            
            // Get auto-fetched values
            var autoVals = this._getAutoFetchedDefaults(rows.length);
            
            // Create new row
            var newRow = {
                lineNo: rows.length + 1,
                selected: false,
                ZSKUGRCODECRS: autoVals.ZSKUGRCODECRS,
                ARBPL: "",
                ARBPL_DESC: "",
                WERKS: autoVals.WERKS,
                MENGE: "",
                ZEQP_NO_DT: "",
                ZTOT_DT: "",
                ZTOT_PLANNED_DT: autoVals.ZTOT_PLANNED_DT,
                ZPL_DT: autoVals.ZPL_DT,
                PRIORITY: "",
                ZEQP_BREAK_TOTAL: "",
                ZUTILITY_FAIL_DT: "",
                ZCUT_BLADE_DT: "",
                ZCHANGEOVER_DT: "",
                ZFILL_BULK_DT: "",
                ZPM_STOCK_DT: "",
                ZSHIFT: autoVals.ZSHIFT
            };
            
            // Initialize custom column values
            var customColumns = configModel.getProperty("/customColumns") || [];
            customColumns.forEach(function (col) {
                newRow[col.property] = "";
            });
            
            // Add row
            rows.push(newRow);
            
            // Renumber
            rows = this._renumberRows(rows);
            
            // Update model
            tableModel.setProperty("/rows", rows);
            tableModel.refresh(true);
            
            // Refresh table
            var oTable = this.getView().byId("downtimeTable");
            if (oTable) {
                oTable.clearSelection();
                oTable.rerender();
            }
            
            tableModel.setProperty("/hasSelection", false);
            tableModel.setProperty("/selectedRowIndex", -1);
            
            MessageToast.show(this.getText("rowAddedSuccess", [newRow.lineNo]));
        },

        /**
         * Validate header fields
         */
        _validateHeaderFields: function () {
            var inputModel = this.getView().getModel("inputModel");
            var material = inputModel.getProperty("/MATNR");
            var plant = inputModel.getProperty("/WERKS");
            var batch = inputModel.getProperty("/CHARG");
            
            return material && plant && batch;
        },

        /**
         * Material field change handler
         */
        onMaterialChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var inputModel = this.getView().getModel("inputModel");
            
            if (sValue && !this._isValidMaterialType(sValue)) {
                inputModel.setProperty("/materialState", ValueState.Error);
                inputModel.setProperty("/materialStateText", "Material must be type FERT or FRT2");
            } else {
                inputModel.setProperty("/materialState", ValueState.None);
                inputModel.setProperty("/materialStateText", "");
                this._fetchProcessOrder();
            }
        },

        /**
         * Plant field change handler
         */
        onPlantChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var inputModel = this.getView().getModel("inputModel");
            
            if (sValue && !this._isValidPlant(sValue)) {
                inputModel.setProperty("/plantState", ValueState.Error);
                inputModel.setProperty("/plantStateText", "Invalid Plant");
            } else {
                inputModel.setProperty("/plantState", ValueState.None);
                inputModel.setProperty("/plantStateText", "");
                this._updatePlantInAllRows(sValue);
                this._fetchResources();
            }
        },

        /**
         * Update plant in all existing rows
         */
        _updatePlantInAllRows: function (plant) {
            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows") || [];
            
            rows.forEach(function (row) {
                row.WERKS = plant;
            });
            
            tableModel.setProperty("/rows", rows);
            tableModel.refresh(true);
            
            var oTable = this.getView().byId("downtimeTable");
            if (oTable) {
                oTable.rerender();
            }
        },

        /**
         * Batch field change handler
         */
        onBatchChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var inputModel = this.getView().getModel("inputModel");
            
            if (sValue) {
                inputModel.setProperty("/batchState", ValueState.None);
                inputModel.setProperty("/batchStateText", "");
                this._fetchProcessOrder();
            } else {
                inputModel.setProperty("/batchState", ValueState.Error);
                inputModel.setProperty("/batchStateText", "Batch is required");
            }
        },

        /**
         * Fetch Process Order
         */
        _fetchProcessOrder: function () {
            var inputModel = this.getView().getModel("inputModel");
            var material = inputModel.getProperty("/MATNR");
            var plant = inputModel.getProperty("/WERKS");
            var batch = inputModel.getProperty("/CHARG");
            
            if (!material || !plant || !batch) {
                return;
            }

            inputModel.setProperty("/AUFNR", "PO-200010045");
            inputModel.setProperty("/processOrderAuto", true);
            this._fetchResources();
        },

        /**
         * Fetch Resources
         */
        _fetchResources: function () {
            // Mock implementation
        },

        /**
         * Change selected row
         */
        onChangeRow: function () {
            var tableModel = this.getView().getModel("tableModel");
            var selectedIndex = this._getSelectedRowIndex();
            
            if (selectedIndex === -1) {
                MessageBox.warning(this.getText("selectRowEdit"));
                return;
            }
            
            MessageBox.information(this.getText("editModeRow", [selectedIndex + 1]), {
                title: "Edit Row"
            });
        },

        /**
         * Delete selected row
         */
        onDeleteRow: function () {
            var that = this;
            var tableModel = this.getView().getModel("tableModel");
            var selectedIndex = this._getSelectedRowIndex();
            
            if (selectedIndex === -1) {
                MessageBox.warning(this.getText("selectRowDelete"));
                return;
            }
            
            MessageBox.confirm(this.getText("confirmDeleteRow", [selectedIndex + 1]), {
                title: "Confirm Delete",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        var rows = tableModel.getProperty("/rows");
                        rows.splice(selectedIndex, 1);
                        rows = that._renumberRows(rows);
                        
                        tableModel.setProperty("/rows", rows);
                        tableModel.setProperty("/hasSelection", false);
                        tableModel.setProperty("/selectedRowIndex", -1);
                        tableModel.refresh(true);
                        
                        var oTable = that.getView().byId("downtimeTable");
                        if (oTable) {
                            oTable.clearSelection();
                            oTable.rerender();
                        }
                        
                        MessageToast.show(this.getText("rowDeletedSuccess"));
                    }
                }
            });
        },

        /**
         * Check time window and start countdown timer
         */
        _checkTimeWindow: function () {
            var that = this;
            var configModel = this.getView().getModel("configModel");
            
            // For Demo: Set Last GR Time to 3 hours and 30 minutes ago
            // So we have ~30 minutes left to show the countdown
            var now = new Date();
            var lastGRTime = new Date(now.getTime() - (3.5 * 60 * 60 * 1000));
            var expiryTime = new Date(lastGRTime.getTime() + (4 * 60 * 60 * 1000));
            
            // Clear any existing timer
            if (this._timerInterval) {
                clearInterval(this._timerInterval);
            }
            
            // Start the interval
            this._timerInterval = setInterval(function() {
                var currentTime = new Date();
                var diff = expiryTime.getTime() - currentTime.getTime();
                
                if (diff <= 0) {
                    // Time Expired
                    clearInterval(that._timerInterval);
                    configModel.setProperty("/remainingTime", "00:00:00");
                    configModel.setProperty("/timerUrgency", "Critical");
                    configModel.setProperty("/timerExpired", true);
                    
                    // Show message once
                    if (!that._expiryMessageShown) {
                        MessageBox.error(this.getText("entryWindowClosedError"));
                        that._expiryMessageShown = true;
                    }
                    return;
                }
                
                // Format time: HH:MM:SS
                var hours = Math.floor(diff / (1000 * 60 * 60));
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                var sHours = hours.toString().padStart(2, '0');
                var sMinutes = minutes.toString().padStart(2, '0');
                var sSeconds = seconds.toString().padStart(2, '0');
                
                var timeString = sHours + ":" + sMinutes + ":" + sSeconds;
                configModel.setProperty("/remainingTime", timeString);
                
                // Urgency Logic
                if (diff < (15 * 60 * 1000)) { // 15 mins
                    configModel.setProperty("/timerUrgency", "Critical");
                } else if (diff < (60 * 60 * 1000)) { // 1 hour
                    configModel.setProperty("/timerUrgency", "Urgent");
                } else {
                    configModel.setProperty("/timerUrgency", "Normal");
                }
            }, 1000);
        },

        onExit: function () {
            if (this._timerInterval) {
                clearInterval(this._timerInterval);
            }
        },

        /**
         * Validation helpers
         */
        _isValidMaterialType: function (material) {
            return true;
        },

        _isValidPlant: function (plant) {
            return true;
        },

        _checkTimeWindowForEntry: function () {
            var timeModel = this.getView().getModel("timeCheck");
            return timeModel.getProperty("/isWithinWindow");
        },

        /**
         * Value help handlers
         */
        onMaterialValueHelp: function (oEvent) {
            MessageBox.information(this.getText("materialSearchHelp"), {
                title: "Material Search"
            });
        },

        onPlantValueHelp: function (oEvent) {
            MessageBox.information(this.getText("plantSearchHelp"), {
                title: "Plant Search"
            });
        },

        /**
         * Table input field handlers
         */
        onQuantityChange: function (oEvent) {
            // Handle quantity change
        },

        onEqpBreakdownChange: function (oEvent) {
            // Handle breakdown change
        },

        onTotDownTimeChange: function (oEvent) {
            // Handle downtime change
        },

        /**
         * Submit data
         */
        onSubmit: function () {
            var that = this;
            var tableModel = this.getView().getModel("tableModel");
            
            if (!this._validateHeaderFields()) {
                MessageBox.error(this.getText("fillAllRequired"));
                return;
            }
            
            var rows = tableModel.getProperty("/rows");
            if (!rows || rows.length === 0) {
                MessageBox.warning(this.getText("addAtLeastOneRow"));
                return;
            }
            
            MessageBox.confirm(this.getText("confirmSaveRows", [rows.length]), {
                title: "Confirm Save",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        that._saveToDatabase();
                    }
                }
            });
        },

        /**
         * Final Submit by User
         */
        onFinalSubmit: function () {
            if (!this._validateHeaderFields()) {
                MessageBox.error(this.getText("fillAllRequired"));
                return;
            }

            var tableModel = this.getView().getModel("tableModel");
            var rows = tableModel.getProperty("/rows");
            if (!rows || rows.length === 0) {
                MessageBox.warning(this.getText("addAtLeastOneRow"));
                return;
            }

            // Check time window
            if (!this._checkTimeWindowForEntry()) {
                MessageBox.warning(this.getText("timeWindowExpiredWarning"));
                return;
            }

            MessageBox.confirm(this.getText("confirmSubmit"), {
                title: "Final Submit",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        this._performFinalSubmit();
                    }
                }.bind(this)
            });
        },

        /**
         * Perform final submission action
         */
        _performFinalSubmit: function () {
            sap.ui.core.BusyIndicator.show(0);
            
            // Simulate OData call
            setTimeout(function () {
                sap.ui.core.BusyIndicator.hide();
                this.getView().getModel("configModel").setProperty("/isSubmitted", true);
                
                MessageBox.success(this.getText("submitSuccess"), {
                    title: "Submitted"
                });
            }.bind(this), 2000);
        },
        /**
         * Save data to backend
         */
        _saveToDatabase: function () {
            sap.ui.core.BusyIndicator.show(0);
            
            setTimeout(function () {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.success(this.getText("saveSuccess"), {
                    onClose: function () {
                        MessageToast.show(this.getText("transactionComplete"));
                    }.bind(this)
                });
            }.bind(this), 1500);
        },

        /**
         * Cancel and reset
         */
        onCancel: function () {
            MessageBox.confirm(this.getText("confirmDiscard"), {
                title: "Confirm Cancel",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        this._initModels();
                        this._setInitialData();
                        this.getView().getModel("configModel").setProperty("/isSubmitted", false);
                        MessageToast.show(this.getText("changesDiscarded"));
                    }
                }.bind(this)
            });
        },

        /**
         * Refresh data
         */
        onRefresh: function () {
            MessageToast.show(this.getText("refreshingData"));
            this._fetchProcessOrder();
        },

        /**
         * Help press handler
         */
        onHelpPress: function () {
            MessageBox.information(
                "• Custom columns are saved per user", {
                title: "Help"
            });
        },


    });
});