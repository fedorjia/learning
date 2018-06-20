const VER = 'v1';

self.addEventListener('install', function (event) {

	// event.waitUntil(self.skipWaiting());
	event.waitUntil(
		caches.open(VER).then(function (cache) {

			// 缓存一些非重要资源，即使加载失败页不影响安装
			// cache.addAll([
			// 	'/', '/index.html', '/style.css',
			// ])

			// 缓存一些轻量、重要的资源
			return cache.addAll([
				'/',
				'/index.html',
				'/style.css',
				'/app.js',
				'/image-list.js',
				'/gallery/bountyHunters.jpg',
				'/gallery/myLittleVader.jpg',
				'/gallery/snowTroopers.jpg'
			]);
		})
	);
});


self.addEventListener('activate', function (event) {

	event.waitUntil(
		Promise.all([
			// 更新客户端
			self.clients.claim(),

			// 删除缓存
			caches.keys().then(function (cacheList) {
				return Promise.all(
					cacheList.map(function (key) {
						if (key !== VER) { // 清除cache
							return caches.delete(key);
						}
					})
				);
			}).then(function () {
				// 缓存删除之后就可以通知浏览器主线程了
				return self.clients.matchAll()
					.then(function (clients) {
						// 当然这里也可以判断如果缓存内本来就没内容, 就代表是首次安装，就不要发 message了 (这个逻辑略过...)
						if (clients && clients.length) {
							clients.forEach(function (client) {
								// 给每个已经打开的标签都 postMessage
								// client.postMessage('sw.update');
							})
						}
					})
			})
		])
	);
});


self.addEventListener('fetch', function (event) {

	event.respondWith(caches.match(event.request).then(function (response) {
		if (response) { // 如果cache match就直接返回，减少一次 http 请求
			return response;
		}

		// 发http请求
		return fetch(event.request);

		// return fetch(event.request).then(function (response) {
		// 	if (!response || response.status !== 200) {
		// 		return response;
		// 	}
		// 	let responseClone = response.clone();
		// 	caches.open(VER).then(function (cache) {
		// 		cache.put(event.request, responseClone); // 请求成功的话，将请求缓存起来。
		// 	});
		// 	return response;
		// }).catch(function () {
		// 	return caches.match('/gallery/myLittleVader.jpg');
		// });
	}));
});
