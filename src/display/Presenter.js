class Presenter {
	createViewModel(...responseModels) {
		var viewModel = {};
		responseModels.forEach(model => viewModel = {...viewModel, ...model});
		return viewModel;
	}
}

module.exports = Presenter;