"use strict";System.register(["./libs/d3/d3","app/core/time_series2","app/core/utils/kbn","app/plugins/sdk","./properties","lodash","moment","./series_overrides_heatmap_ctrl","./css/heatmap.css!"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function ensureArrayContains(array,value){array.indexOf(value)==-1&&array.push(value)}function colorToHex(color){if("#"===color.substr(0,1))return color;for(var digits=color.replace(/[rgba\(\)\ ]/g,"").split(",");digits.length<3;)digits.push(255);var red=parseInt(digits[0]),green=parseInt(digits[1]),blue=parseInt(digits[2]),rgba=blue|green<<8|red<<16;return"#"+rgba.toString(16)}function getColorByXPercentage(canvas,xPercent){var x=canvas.width*xPercent||0,context=canvas.getContext("2d"),p=context.getImageData(x,1,1,1).data,color="rgba("+[p[0]+","+p[1]+","+p[2]+","+p[3]]+")";return color}var TimeSeries,kbn,MetricsPanelCtrl,heatmapEditor,displayEditor,pluginName,_,moment,_createClass,panelOptions,panelDefaults,HeatmapCtrl;return{setters:[function(_libsD3D){},function(_appCoreTime_series){TimeSeries=_appCoreTime_series["default"]},function(_appCoreUtilsKbn){kbn=_appCoreUtilsKbn["default"]},function(_appPluginsSdk){MetricsPanelCtrl=_appPluginsSdk.MetricsPanelCtrl},function(_properties){heatmapEditor=_properties.heatmapEditor,displayEditor=_properties.displayEditor,pluginName=_properties.pluginName},function(_lodash){_=_lodash["default"]},function(_moment){moment=_moment["default"]},function(_series_overrides_heatmap_ctrl){},function(_cssHeatmapCss){}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),panelOptions={aggregationFunctions:["avg","min","max","total","current","count"],treeMap:{modes:["squarify","slice","dice","slice-dice"],aggregationFunctions:["sum","min","max","extent","mean","median","quantile","variance","deviation"],timestampFormats:["YYYY-MM-DDTHH","YYYY-MM-DDTHH:mm","YYYY-MM-DDTHH:mm:ss","YYYY-MM-DDTHH:mm:ss.sssZ"]}},panelDefaults={seriesOverrides:[],thresholds:"0,10",colors:["rgba(50, 172, 45, 1)","rgba(241, 255, 0, 1)","rgba(245, 54, 54, 1)"],legend:{show:!0,min:!0,max:!0,avg:!0,current:!0,total:!0},detangle:{coupling:!1,sortingOrder:"desc",limit:null,metric:"coupling",sourceType:"$issue_type",targetType:"$target_issue_type",sourceTypeData:"",targetTypeData:""},maxDataPoints:100,mappingType:1,nullPointMode:"connected",format:"none",valueMaps:[{value:"null",op:"=",text:"N/A"}],treeMap:{mode:"squarify",groups:[{key:"server",value:"/^.*./g"}],colorByFunction:"max",sizeByFunction:"constant",enableTimeBlocks:!1,enableGrouping:!0,debug:!1,depth:0,ids:["alias"],nodeSizeProperty:"value"}},_export("MetricsPanelCtrl",_export("HeatmapCtrl",HeatmapCtrl=function(_MetricsPanelCtrl){function HeatmapCtrl($scope,$injector,$sce,detangleSrv,templateSrv){_classCallCheck(this,HeatmapCtrl);var _this2=_possibleConstructorReturn(this,(HeatmapCtrl.__proto__||Object.getPrototypeOf(HeatmapCtrl)).call(this,$scope,$injector));return _.defaults(_this2.panel,panelDefaults),_this2.detangleSrv=detangleSrv,_this2.templateSrv=templateSrv,_this2.options=panelOptions,_this2.panel.chartId="chart_"+_this2.panel.id,_this2.containerDivId="container_"+_this2.panel.chartId,_this2.$sce=$sce,_this2.events.on("init-edit-mode",_this2.onInitEditMode.bind(_this2)),_this2.events.on("data-received",_this2.onDataReceived.bind(_this2)),_this2.events.on("data-snapshot-load",_this2.onDataReceived.bind(_this2)),_this2.initializePanel(),_this2}return _inherits(HeatmapCtrl,_MetricsPanelCtrl),_createClass(HeatmapCtrl,[{key:"initializePanel",value:function(){var d3plusPath="plugins/"+pluginName+"/libs/d3plus/d3plus.full.js",_this=this,meta={};meta[d3plusPath]={format:"global"},SystemJS.config({meta:meta}),SystemJS["import"](d3plusPath).then(function(){_this.events.emit("data-received")}),this.sortingOrder=[{text:"Ascending",value:"asc"},{text:"Descending",value:"desc"}],this.couplingMetrics=[{text:"Coupling Value",value:"coupling"},{text:"Num. of Couples",value:"couplecounts"}]}},{key:"handleError",value:function(err){this.getPanelContainer().html("<p>Error:</p><pre>"+err+"</pre>")}},{key:"onInitEditMode",value:function(){this.addEditorTab("Heatmap",heatmapEditor,2),this.addEditorTab("Display",displayEditor,3),this.addEditorTab("Detangle","public/app/plugins/panel/graph/detangle.html",4)}},{key:"getPanelContainer",value:function(){return $(document.getElementById(this.containerDivId))}},{key:"onDataReceived",value:function(dataList){void 0!=dataList&&(this.panel.detangle.sourceTypeData=this.templateSrv.replaceWithText(this.panel.detangle.sourceType,this.panel.scopedVars),this.panel.detangle.targetTypeData=this.templateSrv.replaceWithText(this.panel.detangle.targetType,this.panel.scopedVars),this.panel.detangle.coupling&&(dataList=this.detangleSrv.dataConvertor(dataList,this.panel.detangle,"file")),this.series=dataList.map(this.seriesHandler.bind(this)));var preparedData=this.d3plusDataProcessor(this.series);this.render(preparedData)}},{key:"getGroupKeys",value:function(){return this.panel.treeMap.groups.map(function(group){return group.key})}},{key:"d3plusDataProcessor",value:function(dataArray){var resultArray=[],hasGroups=this.panel.treeMap.groups.length>0;if(hasGroups){for(var groupArray=[],groupIndex=0;groupIndex<this.panel.treeMap.groups.length;groupIndex++)groupArray.push({key:this.panel.treeMap.groups[groupIndex].key,regex:kbn.stringToJsRegex(this.panel.treeMap.groups[groupIndex].value)});for(var dataIndex=0;dataIndex<dataArray.length;dataIndex++){var newDataItem=Object.assign({},dataArray[dataIndex]);this.panel.treeMap.enableTimeBlocks||Object.assign(newDataItem,dataArray[dataIndex].stats),delete newDataItem.stats;for(var groupIndex=0;groupIndex<groupArray.length;groupIndex++){var key=groupArray[groupIndex].key,regex=groupArray[groupIndex].regex,matches=newDataItem.alias.match(regex);matches&&matches.length>0?newDataItem[key]=matches[0]:newDataItem[key]="NA"}resultArray.push(newDataItem)}}else for(var dataIndex=0;dataIndex<dataArray.length;dataIndex++){var newDataItem=Object.assign({},dataArray[dataIndex],dataArray[dataIndex].stats);resultArray.push(newDataItem)}if(this.panel.treeMap.enableTimeBlocks){console.info("creating timeblock records");for(var timeBlockArray=[],dataIndex=0;dataIndex<resultArray.length;dataIndex++){console.debug("dataIndex:"+dataIndex+", alias:"+resultArray[dataIndex].alias);for(var dataSeries=resultArray[dataIndex],dataPointIndex=0;dataPointIndex<dataSeries.flotpairs.length;dataPointIndex++){var dataSeriesCopy=Object.assign({},dataSeries);delete dataSeriesCopy.datapoints,delete dataSeriesCopy.flotpairs,dataSeriesCopy.count=1,dataSeriesCopy.timestamp=dataSeries.flotpairs[dataPointIndex][0],dataSeriesCopy.value=dataSeries.flotpairs[dataPointIndex][1],timeBlockArray.push(dataSeriesCopy)}}resultArray=timeBlockArray}return resultArray}},{key:"seriesHandler",value:function(seriesData){var series=new TimeSeries({datapoints:seriesData.datapoints,alias:seriesData.target.replace(/"|,|;|=|:|{|}/g,"_")});return series.flotpairs=series.getFlotPairs(this.panel.nullPointMode),series}},{key:"addSeriesOverride",value:function(override){this.panel.seriesOverrides.push(override||{})}},{key:"addTreeMapGroup",value:function(group){this.panel.treeMap.groups.push(group||{})}},{key:"removeSeriesOverride",value:function(override){this.panel.seriesOverrides=_.without(this.panel.seriesOverrides,override),this.render()}},{key:"removeTreeMapGroup",value:function(group){this.panel.treeMap.groups=_.without(this.panel.treeMap.groups,group),this.render()}},{key:"updateThresholds",value:function(){this.panel.thresholds.length,this.panel.colors.length;this.refresh()}},{key:"changeColor",value:function(colorIndex,color){this.panel.colors[colorIndex]=color}},{key:"removeColor",value:function(colorIndex){this.panel.colors.splice(colorIndex,1)}},{key:"addColor",value:function(){this.panel.colors.push("rgba(255, 255, 255, 1)")}},{key:"getGradientForValue",value:function(data,value){var min=Math.min.apply(Math,data.thresholds),max=Math.max.apply(Math,data.thresholds),absoluteDistance=max-min,valueDistanceFromMin=value-min,xPercent=valueDistanceFromMin/absoluteDistance;return xPercent=Math.min(.99,xPercent),xPercent=Math.max(.01,xPercent),getColorByXPercentage(this.canvas,xPercent)}},{key:"applyOverrides",value:function(seriesItemAlias){var seriesItem={},colorData={},overrides={};console.info("applying overrides for seriesItem"),console.debug(seriesItemAlias),console.debug(this.panel.seriesOverrides);for(var i=0;i<=this.panel.seriesOverrides.length;i++)console.debug("comparing:"),console.debug(this.panel.seriesOverrides[i]),this.panel.seriesOverrides[i]&&this.panel.seriesOverrides[i].alias==seriesItemAlias&&(overrides=this.panel.seriesOverrides[i]);return colorData.thresholds=(overrides.thresholds||this.panel.thresholds).split(",").map(function(strVale){return Number(strVale.trim())}),colorData.colorMap=this.panel.colors,seriesItem.colorData=colorData,seriesItem.valueName=overrides.valueName||this.panel.valueName,seriesItem}},{key:"invertColorOrder",value:function(){this.panel.colors.reverse(),this.refresh()}},{key:"addTreeMapId",value:function(){this.panel.treeMap.ids.push(""),this.refresh()}},{key:"removeTreeMapId",value:function(pos){this.panel.treeMap.ids.splice(pos,1),this.refresh()}},{key:"changeTreeMapId",value:function(idString,pos){this.panel.treeMap.ids[pos]=idString}},{key:"link",value:function(scope,elem,attrs,ctrl){function render(data){updateSize(),updateCanvasStyle(),updateChart(data)}function updateCanvasStyle(){canvas.width=Math.max(chartElement[0].clientWidth,100);var canvasContext=canvas.getContext("2d");canvasContext.clearRect(0,0,canvas.width,canvas.height);for(var grd=canvasContext.createLinearGradient(0,0,canvas.width,0),colorWidth=1/Math.max(ctrl.panel.colors.length,1),i=0;i<ctrl.panel.colors.length;i++){var currentColor=ctrl.panel.colors[i];grd.addColorStop(Math.min(colorWidth*i,1),currentColor)}canvasContext.fillStyle=grd,canvasContext.fillRect(0,0,canvas.width,3),ctrl.canvasContext=canvasContext,gradientValueMax.innerText=Math.max.apply(Math,ctrl.panel.thresholds.split(",")),gradientValueMin.innerText=Math.min.apply(Math,ctrl.panel.thresholds.split(","))}function updateSize(){elem.css("height",ctrl.height+"px")}function getVisSize(dataPoint){return"constant"==ctrl.panel.treeMap.sizeByFunction?1:dataPoint[ctrl.panel.treeMap.sizeByFunction]||dataPoint.value}function getVisColor(dataPoint){var value=dataPoint[ctrl.panel.treeMap.colorByFunction]||dataPoint.value,rgbColor=ctrl.getGradientForValue({thresholds:ctrl.panel.thresholds.split(",")},value),hexColor=colorToHex(rgbColor);return hexColor}function updateChart(data){d3.select("#"+ctrl.containerDivId).selectAll("*").remove();var idKeys=Array.from(ctrl.panel.treeMap.ids);0==idKeys.length&&ensureArrayContains(idKeys,"alias"),ctrl.panel.treeMap.enableTimeBlocks&&ensureArrayContains(idKeys,"timestamp");var aggs={};aggs.value=ctrl.panel.treeMap.aggregationFunction,aggs.current=ctrl.panel.treeMap.aggregationFunction,aggs.count="sum",aggs.total="sum",aggs.avg="mean",aggs.min="min",aggs.max="max",d3plus.viz().dev(ctrl.panel.treeMap.debug).aggs(aggs).container("#"+ctrl.containerDivId).legend(ctrl.panel.treeMap.showLegend).data(data).type({mode:ctrl.panel.treeMap.mode}).id({value:_.uniq(idKeys),grouping:ctrl.panel.treeMap.enableGrouping}).depth(Number(ctrl.panel.treeMap.depth)).size(getVisSize).height(ctrl.height).width(ctrl.width).color(getVisColor).format(visFormat).draw()}var chartElement=elem.find(".heatmap");chartElement.append('<div id="'+ctrl.containerDivId+'"></div>');var chartContainer=$(document.getElementById(ctrl.containerDivId));console.debug("found chartContainer"),console.debug(chartContainer),elem.css("height",ctrl.height+"px");var canvas=elem.find(".canvas")[0];ctrl.canvas=canvas;var gradientValueMax=elem.find(".gradient-value-max")[0],gradientValueMin=elem.find(".gradient-value-min")[0],visFormat={text:function(_text,opts){if("timestamp"==opts.key){var timestamp=moment(Number(_text));return timestamp.format(ctrl.panel.treeMap.timestampFormat)}return ctrl.getGroupKeys().indexOf(opts.key)>-1?_text:d3plus.string.title(_text,opts)}};this.events.on("render",function(data){"undefined"!=typeof d3plus&&data?(render(data),ctrl.renderingCompleted()):console.info("d3plus is not loaded yet")})}}]),HeatmapCtrl}(MetricsPanelCtrl))),HeatmapCtrl.templateUrl="module.html",_export("HeatmapCtrl",HeatmapCtrl),_export("MetricsPanelCtrl",HeatmapCtrl)}}});