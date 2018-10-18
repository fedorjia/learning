// let version = '1.0.2';

if ('serviceWorker' in navigator) {

  /**
   * 注册
   */
  navigator.serviceWorker.register('/sw.js').then(function (reg) {
    if (reg.installing) {
      console.log('[main] Service worker installing');
    } else if (reg.waiting) {
      console.log('[main] Service worker installed');
    } else if (reg.active) {
      console.log('[main] Service worker active');
    }

    // 手动更新
    // if (localStorage.getItem('sw_version') !== version) {
    //   reg.update().then(function () {
    //     localStorage.setItem('sw_version', version)
    //   });
    // }
  }).catch(function (error) {
    console.log('[main] Registration failed with ' + error);
  });


  /**
   * 监听
   */
  navigator.serviceWorker.addEventListener('message', function (e) {
    if (e.data === 'sw.update') {
      // 如果代码走到了在这里，就知道Service Worker 已经更新完成了
      // 可以做点什么事情让用户体验更好
      alert('new feature, try it.');
      location.reload();
    }
  });
}


// function for loading each image via XHR
function imgLoad(imgJSON) {
	// return a promise for an image loading
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.open('GET', imgJSON.url);
		request.responseType = 'blob';

		request.onload = function () {
			if (request.status === 200) {
				let arrayResponse = [];
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


window.onload = function () {
  let imgSection = document.querySelector('section');

	// load each set of image, alt text, name and caption
	for (let i = 0; i <= Gallery.images.length - 1; i++) {
		imgLoad(Gallery.images[i]).then(function (arrayResponse) {

      let myImage = document.createElement('img');
      let myFigure = document.createElement('figure');
      let myCaption = document.createElement('caption');
      let imageURL = window.URL.createObjectURL(arrayResponse[0]);

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
