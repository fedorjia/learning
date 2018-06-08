const DEBUG = true;
const VER = 'v1';

self.addEventListener('install', function (event) {

	if(DEBUG) { // 开发环境，请设置
		event.waitUntil(self.skipWaiting());
	} else {
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
	}
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
								client.postMessage('sw.update');
							})
						}
					})
			})
		])
	);
});


self.addEventListener('fetch', function (event) {

	event.respondWith(caches.match(event.request).then(function (response) {
		// 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
		if (response) {
			return response;
		}

		let requestClone = event.request.clone();
		return fetch(requestClone).then(function (response) {
			// 请求失败了，直接返回失败的结果就好了。。
			if (!response || response.status !== 200) {
				return response;
			}

			// response may be used only once
			// we need to save clone to put one copy in cache
			// and serve second one
			let responseClone = response.clone();

			caches.open(VER).then(function (cache) {
				// 请求成功的话，将请求缓存起来。
				cache.put(event.request, responseClone);
			});
			return response;
		}).catch(function () {
			return caches.match('/gallery/myLittleVader.jpg');
		});
	}));
});
