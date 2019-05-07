//var correctPage = !!document.URL.match(/event-specifications/)

//Get the current event specs: 
//_cs = gApp.utils.eventDefinition.getInstalledSpecNames()
window._importDeployerSpecs = function(a){
	var [obj] = a;
	console.log(obj);
	gApp.utils.eventDefinition.importDeployerSpecs(obj);
	setTimeout(function(){jQuery('.modalButton')[0].innerText = "OK" }, 200 )

}

window._addSpec = function addSpec(o){
	var [specToCopy, newSpecName] = o
		var obj = {
			"account": gApp.inMemoryModels.account,
			"profile": gApp.inMemoryModels.profile,
			"specs": [
		  		{
		  		"tealiumEvent": newSpecName || "testing",
		      	"dataSourceKeys": [],
		      	"eventAttributes": []
			    }
				]
		}


		//Using selected spec name get all attributes:
		spec_attributes = gApp.utils.eventDefinition.getInstalledSpecAttributes(specToCopy)
		spec_attributes.forEach((entry) => {
			var baseSpec = {
				"attribute": entry.attribute || "please add name",
			    "type": _getType(entry.attribute) || "string",
			    "required": entry.required || true
			}
			obj.specs[0].eventAttributes.push(baseSpec)

		})

	try {
		gApp.utils.eventDefinition.importDeployerSpecs(obj)
		setTimeout(function(){jQuery('.modalButton')[0].innerText = "OK" }, 200 )
	}catch(e){}
}
	
window._getType = function getType(name){
	//return the data type
	return gApp.utils.quantifier.getQuantifierByName(name).attributes.type.displayName
}



window._createEventSpecExport = function createEventSpecExport(){
	var obj = {
			"account": gApp.inMemoryModels.account,
			"profile": gApp.inMemoryModels.profile,
			"specs": []
		}

	currentSpecs = gApp.utils.eventDefinition.getInstalledSpecNames();

	currentSpecs.forEach((a) => {
		spec_attributes = gApp.utils.eventDefinition.getInstalledSpecAttributes(a)
		obj.specs.push({
		  		"tealiumEvent": a,
		      	"dataSourceKeys": [],
		      	"eventAttributes": []
			    })
		
		spec_attributes.forEach((entry) => {

			var baseSpec = {
				"attribute": entry.attribute || "please add name",
			    "type": _getType(entry.attribute) || "string",
			    "required": entry.required
			}
			obj.specs[obj.specs.length -1].eventAttributes.push(baseSpec)

		})
	})
	tealiumTools.send({
	"currentSpecs": JSON.stringify(gApp.utils.eventDefinition.getInstalledSpecNames()),
	"export" : JSON.stringify(obj)
	})
}

_createEventSpecExport();




//tealiumTools.send({
//	"currentSpecs": JSON.stringify(gApp.utils.eventDefinition.getInstalledSpecNames())
//})

