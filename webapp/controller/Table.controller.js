sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Application.ExcelImportExport.controller.Table", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Application.ExcelImportExport.view.Table
		 */
		onInit: function () {

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Application.ExcelImportExport.view.Table
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Application.ExcelImportExport.view.Table
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Application.ExcelImportExport.view.Table
		 */
		//	onExit: function() {
		//
		//	}
		
		onUpload: function(){
			debugger;
			var oTable=this.getView().byId("idItemTbl");
			var oFileUploader=this.getView().byId("fileUploader");
			if(!oFileUploader.getValue()){
				sap.m.MessageToast.show("Choose File first");
			}
			else{
				var file=oFileUploader.getFocusDomRef().files[0];
				if(file && window.FileReader){
					var reader=new FileReader();
					reader.onload=function(e){
						var strcsv = e.target.result;
						var arrcsv=strcsv.match(/[\w.]+(?=,?)/g);
						var noOfCols=2;
						var hdrRow=arrcsv.splice(0,noOfCols);
						var data=[];
						while(arrcsv.length>0){
							var obj={};
							var row=arrcsv.splice(0,noOfCols);
							for(var i=0;i<row.length;i++){
								obj[hdrRow[i]]=row[i].trim();
							}
							data.push(obj);
						}
						var model = new sap.ui.model.json.JSONModel(data);
        				oTable.setModel(model);
					};
					
					reader.readAsText(file);
				}
			}
		}
		// onUpload: function(){
		// 	debugger;
		// 	var oTable=this.getView().byId("idItemTbl");
		// 	var oFileUploader=this.getView().byId("fileUploader");
		// 	if(!oFileUploader.getValue()){
		// 		sap.m.MessageToast.show("Choose File first");
		// 	}
		// 	else{//
		// 		var file=oFileUploader.getFocusDomRef().files[0];
		// 		if(file && window.FileReader){
		// 			var reader=new FileReader();
		// 			reader.onload=function(e){
		// 				debugger;
						
		// 			}.bind(this);
					
		// 			reader.readAsBinaryString(file);//
		// 		}
		// 	}
		// } 
	});

});