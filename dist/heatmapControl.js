'use strict';

System.register(['./libs/d3/d3', 'app/core/time_series2', 'app/core/utils/kbn', 'app/plugins/sdk', './properties', 'lodash', './series_overrides_heatmap_ctrl', './css/heatmap.css!'], function (_export, _context) {
	"use strict";

	var TimeSeries, kbn, MetricsPanelCtrl, heatmapEditor, displayEditor, _, _createClass, _init, panelDefaults, HeatmapCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	function getColorForValue(data, value) {
		console.info('Getting color for value');
		console.debug(data);
		console.debug(value);
		for (var i = data.thresholds.length; i > 0; i--) {
			if (value >= data.thresholds[i - 1]) {
				return data.colorMap[i];
			}
		}
		return _.first(data.colorMap);
	}

	return {
		setters: [function (_libsD3D) {}, function (_appCoreTime_series) {
			TimeSeries = _appCoreTime_series.default;
		}, function (_appCoreUtilsKbn) {
			kbn = _appCoreUtilsKbn.default;
		}, function (_appPluginsSdk) {
			MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
		}, function (_properties) {
			heatmapEditor = _properties.heatmapEditor;
			displayEditor = _properties.displayEditor;
		}, function (_lodash) {
			_ = _lodash.default;
		}, function (_series_overrides_heatmap_ctrl) {}, function (_cssHeatmapCss) {}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			System.config({
				meta: {
					'plugins/savantly-heatmap-panel/libs/d3plus/d3plus.full.js': {
						format: 'global'
					}
				}
			});

			System.import('plugins/savantly-heatmap-panel/libs/d3plus/d3plus.full.js');

			panelDefaults = {
				// other style overrides
				seriesOverrides: [],
				thresholds: '0,10',
				colors: ['rgba(50, 172, 45, 0.97)', 'rgba(237, 129, 40, 0.89)', 'rgba(245, 54, 54, 0.9)'],
				legend: {
					show: true,
					min: true,
					max: true,
					avg: true,
					current: true,
					total: true,
					gradient: {
						enabled: true,
						show: true
					}
				},
				maxDataPoints: 100,
				mappingType: 1,
				nullPointMode: 'connected',
				format: 'none',
				valueName: 'avg',
				valueOptions: ['avg', 'min', 'max', 'total', 'current'],
				valueMaps: [{ value: 'null', op: '=', text: 'N/A' }],
				content: 'graph LR\n' + 'A[Square Rect] -- Link text --> B((Circle))\n' + 'A --> C(Round Rect)\n' + 'B --> D{Rhombus}\n' + 'C --> D\n',
				init: (_init = {
					startOnLoad: false,
					logLevel: 2, //1:debug, 2:info, 3:warn, 4:error, 5:fatal
					cloneCssStyles: false }, _defineProperty(_init, 'startOnLoad', false), _defineProperty(_init, 'arrowMarkerAbsolute', true), _defineProperty(_init, 'flowchart', {
					htmlLabels: true,
					useMaxWidth: true
				}), _defineProperty(_init, 'sequenceDiagram', {
					diagramMarginX: 50, // - margin to the right and left of the sequence diagram
					diagramMarginY: 10, // - margin to the over and under the sequence diagram
					actorMargin: 50, // - Margin between actors
					width: 150, // - Width of actor boxes
					height: 65, // - Height of actor boxes00000000001111
					boxMargin: 10, // - Margin around l01oop boxes
					boxTextMargin: 5, // - margin around the text in loop/alt/opt boxes
					noteMargin: 10, // - margin around notes
					messageMargin: 35, // - Space between messages
					mirrorActors: true, // - mirror actors under diagram
					bottomMarginAdj: 1, // - Depending on css styling this might need adjustment. Prolongs the edge of the diagram downwards
					useMaxWidth: true }), _defineProperty(_init, 'gantt', {
					titleTopMargin: 25, // - margin top for the text over the gantt diagram
					barHeight: 20, // - the height of the bars in the graph
					barGap: 4, // - the margin between the different activities in the gantt diagram
					topPadding: 50, // - margin between title and gantt diagram and between axis and gantt diagram.
					leftPadding: 75, // - the space allocated for the section name to the left of the activities.
					gridLineStartPadding: 35, // - Vertical starting position of the grid lines
					fontSize: 11, // - font size ...
					fontFamily: '"Open-Sans", "sans-serif"', // - font family ...
					numberSectionStyles: 3 }), _init)
			};

			_export('MetricsPanelCtrl', _export('HeatmapCtrl', HeatmapCtrl = function (_MetricsPanelCtrl) {
				_inherits(HeatmapCtrl, _MetricsPanelCtrl);

				function HeatmapCtrl($scope, $injector, $sce) {
					_classCallCheck(this, HeatmapCtrl);

					var _this = _possibleConstructorReturn(this, (HeatmapCtrl.__proto__ || Object.getPrototypeOf(HeatmapCtrl)).call(this, $scope, $injector));

					_.defaults(_this.panel, panelDefaults);

					_this.panel.chartId = 'chart_' + _this.panel.id;
					_this.containerDivId = 'container_' + _this.panel.chartId;
					_this.$sce = $sce;
					_this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
					_this.events.on('data-received', _this.onDataReceived.bind(_this));
					_this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
					_this.initializePanel();
					return _this;
				}

				_createClass(HeatmapCtrl, [{
					key: 'initializePanel',
					value: function initializePanel() {}
				}, {
					key: 'handleParseError',
					value: function handleParseError(err, hash) {
						this.getPanelContainer().html('<p>Error:</p><pre>' + err + '</pre>');
					}
				}, {
					key: 'onInitEditMode',
					value: function onInitEditMode() {
						this.addEditorTab('Heatmap', heatmapEditor, 2);
						this.addEditorTab('Display', displayEditor, 3);
					}
				}, {
					key: 'getPanelContainer',
					value: function getPanelContainer() {
						return $(document.getElementById(this.containerDivId));
					}
				}, {
					key: 'onDataReceived',
					value: function onDataReceived(dataList) {
						console.info('received data');
						console.debug(dataList);
						this.series = dataList.map(this.seriesHandler.bind(this));
						console.info('mapped dataList to series');
						console.debug(this.series);

						var data = {};
						this.setValues(data);

						this.render();
					}
				}, {
					key: 'seriesHandler',
					value: function seriesHandler(seriesData) {
						var series = new TimeSeries({
							datapoints: seriesData.datapoints,
							alias: seriesData.target.replace(/"|,|;|=|:|{|}/g, '_')
						});
						series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
						return series;
					}
				}, {
					key: 'addSeriesOverride',
					value: function addSeriesOverride(override) {
						this.panel.seriesOverrides.push(override || {});
					}
				}, {
					key: 'removeSeriesOverride',
					value: function removeSeriesOverride(override) {
						this.panel.seriesOverrides = _.without(this.panel.seriesOverrides, override);
						this.render();
					}
				}, {
					key: 'updateThresholds',
					value: function updateThresholds() {
						var thresholdCount = this.panel.thresholds.length;
						var colorCount = this.panel.colors.length;
						this.refresh();
					}
				}, {
					key: 'changeColor',
					value: function changeColor(colorIndex, color) {
						this.panel.colors[colorIndex] = color;
					}
				}, {
					key: 'removeColor',
					value: function removeColor(colorIndex) {
						this.panel.colors.splice(colorIndex, 1);
					}
				}, {
					key: 'addColor',
					value: function addColor() {
						this.panel.colors.push('rgba(255, 255, 255, 1)');
					}
				}, {
					key: 'clearPanel',
					value: function clearPanel() {
						$('#' + this.panel.graphId).remove();
					}
				}, {
					key: 'setValues',
					value: function setValues(data) {
						if (this.series && this.series.length > 0) {
							for (var i = 0; i < this.series.length; i++) {
								var seriesItem = this.series[i];
								console.debug('setting values for series');
								console.debug(seriesItem);
								data[seriesItem.alias] = this.applyOverrides(seriesItem.alias);
								var lastPoint = _.last(seriesItem.datapoints);
								var lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;

								if (this.panel.valueName === 'name') {
									data[seriesItem.alias].value = 0;
									data[seriesItem.alias].valueRounded = 0;
									data[seriesItem.alias].valueFormated = seriesItem.alias;
								} else if (_.isString(lastValue)) {
									data[seriesItem.alias].value = 0;
									data[seriesItem.alias].valueFormated = _.escape(lastValue);
									data[seriesItem.alias].valueRounded = 0;
								} else {
									data[seriesItem.alias].value = seriesItem.stats[data[seriesItem.alias].valueName];
									//data[seriesItem.alias].flotpairs = seriesItem.flotpairs;

									var decimalInfo = this.getDecimalsForValue(data[seriesItem.alias].value);
									var formatFunc = kbn.valueFormats[this.panel.format];
									data[seriesItem.alias].valueFormatted = formatFunc(data[seriesItem.alias].value, decimalInfo.decimals, decimalInfo.scaledDecimals);
									data[seriesItem.alias].valueRounded = kbn.roundValue(data[seriesItem.alias].value, decimalInfo.decimals);
								}
								if (this.panel.legend.gradient.enabled) {
									data[seriesItem.alias].color = this.getGradientForValue(data[seriesItem.alias].colorData, data[seriesItem.alias].value);
								} else {
									data[seriesItem.alias].color = getColorForValue(data[seriesItem.alias].colorData, data[seriesItem.alias].value);
								}
							}
						}
					}
				}, {
					key: 'getGradientForValue',
					value: function getGradientForValue(data, value) {
						console.info('Getting gradient for value');
						console.debug(data);
						console.debug(value);
						var min = Math.min.apply(Math, data.thresholds);
						var max = Math.max.apply(Math, data.thresholds);
						var absoluteDistance = max - min;
						var valueDistanceFromMin = value - min;
						var xPercent = valueDistanceFromMin / absoluteDistance;
						// Get the smaller number to clamp at 0.99 max
						xPercent = Math.min(0.99, xPercent);
						// Get the larger number to clamp at 0.01 min
						xPercent = Math.max(0.01, xPercent);

						return getColorByXPercentage(this.canvas, xPercent);
					}
				}, {
					key: 'applyOverrides',
					value: function applyOverrides(seriesItemAlias) {
						var seriesItem = {},
						    colorData = {},
						    overrides = {};
						console.info('applying overrides for seriesItem');
						console.debug(seriesItemAlias);
						console.debug(this.panel.seriesOverrides);
						for (var i = 0; i <= this.panel.seriesOverrides.length; i++) {
							console.debug('comparing:');
							console.debug(this.panel.seriesOverrides[i]);
							if (this.panel.seriesOverrides[i] && this.panel.seriesOverrides[i].alias == seriesItemAlias) {
								overrides = this.panel.seriesOverrides[i];
							}
						}
						colorData.thresholds = (overrides.thresholds || this.panel.thresholds).split(',').map(function (strVale) {
							return Number(strVale.trim());
						});
						colorData.colorMap = this.panel.colors;
						seriesItem.colorData = colorData;

						seriesItem.valueName = overrides.valueName || this.panel.valueName;

						return seriesItem;
					}
				}, {
					key: 'invertColorOrder',
					value: function invertColorOrder() {
						this.panel.colors.reverse();
						this.refresh();
					}
				}, {
					key: 'getDecimalsForValue',
					value: function getDecimalsForValue(value) {
						if (_.isNumber(this.panel.decimals)) {
							return { decimals: this.panel.decimals, scaledDecimals: null };
						}

						var delta = value / 2;
						var dec = -Math.floor(Math.log(delta) / Math.LN10);

						var magn = Math.pow(10, -dec),
						    norm = delta / magn,
						    // norm is between 1.0 and 10.0
						size;

						if (norm < 1.5) {
							size = 1;
						} else if (norm < 3) {
							size = 2;
							// special case for 2.5, requires an extra decimal
							if (norm > 2.25) {
								size = 2.5;
								++dec;
							}
						} else if (norm < 7.5) {
							size = 5;
						} else {
							size = 10;
						}

						size *= magn;

						// reduce starting decimals if not needed
						if (Math.floor(value) === value) {
							dec = 0;
						}

						var result = {};
						result.decimals = Math.max(0, dec);
						result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

						return result;
					}
				}, {
					key: 'link',
					value: function link(scope, elem, attrs, ctrl) {
						var chartElement = elem.find('.heatmap');
						chartElement.append('<div id="' + ctrl.containerDivId + '"></div>');
						var chartContainer = $(document.getElementById(ctrl.containerDivId));
						console.debug('found chartContainer');
						console.debug(chartContainer);
						elem.css('height', ctrl.height + 'px');

						function render() {
							updateChart();
						}

						function updateChart() {
							var data = [{ "value": 100, "name": "alpha" }, { "value": 70, "name": "beta" }];

							d3plus.viz().container("#" + ctrl.containerDivId).data(data).type("tree_map").id("name").size("value").draw();
						}

						this.events.on('render', function () {
							render();
							ctrl.renderingCompleted();
						});
					}
				}]);

				return HeatmapCtrl;
			}(MetricsPanelCtrl)));

			HeatmapCtrl.templateUrl = 'module.html';

			_export('HeatmapCtrl', HeatmapCtrl);

			_export('MetricsPanelCtrl', HeatmapCtrl);
		}
	};
});
//# sourceMappingURL=heatmapControl.js.map
