
if ('serviceWorker' in navigator) {

	/**
	 * register service worker
	 */
	navigator.serviceWorker.register('/sw.js').then(function (reg) {
		if (reg.installing) {
			console.log('Service worker installing');
		} else if (reg.waiting) {
			console.log('Service worker installed');
		} else if (reg.active) {
			console.log('Service worker active');
		}
	}).catch(function (error) {
		// registration failed
		console.log('Registration failed with ' + error);
	});


	/**
	 * 监听message
	 */
	navigator.serviceWorker.addEventListener('message', function (e) {
		if (e.data === 'sw.update') {
			// 如果代码走到了在这里，就知道Service Worker 已经更新完成了
			// 可以做点什么事情让用户体验更好
			alert('new feature, try it.');
			location.reload();
		}
	});


	/**
	 * 手动更新 Service Worker
	 */
	// let version = 'v3';
	// navigator.serviceWorker.register('/sw-test/sw.js').then(function (reg) {
	// 	if (localStorage.getItem('sw_version') !== version) {
	// 		reg.update().then(function () {
	// 			localStorage.setItem('sw_version', version)
	// 		});
	// 	}
	// });
}

// function for loading each image via XHR
function imgLoad(imgJSON) {
	// return a promise for an image loading
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('GET', imgJSON.url);
		request.responseType = 'blob';

		request.onload = function () {
			if (request.status == 200) {
				var arrayResponse = [];
				arrayResponse[0] = request.response;
				arrayResponse[1] = imgJSON;
				resolve(arrayResponse);
			} else {
				reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
			}
		};

		request.onerror = function () {
			reject(Error('There was a network error.'));
		};

		// Send the request
		request.send();
	});
}

var imgSection = document.querySelector('section');

window.onload = function () {

	// load each set of image, alt text, name and caption
	for (var i = 0; i <= Gallery.images.length - 1; i++) {
		imgLoad(Gallery.images[i]).then(function (arrayResponse) {

			var myImage = document.createElement('img');
			var myFigure = document.createElement('figure');
			var myCaption = document.createElement('caption');
			var imageURL = window.URL.createObjectURL(arrayResponse[0]);

			myImage.src = imageURL;
			myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>';

			imgSection.appendChild(myFigure);
			myFigure.appendChild(myImage);
			myFigure.appendChild(myCaption);

		}, function (Error) {
			console.log(Error);
		});
	}
};
