const CACHE="fukuoka-companion-v2";const BASE="/zhan-lan-japan-trip";const CORE=[`${BASE}/`,`${BASE}/manifest.webmanifest`,`${BASE}/icon-192.png`,`${BASE}/icon-512.png`,`${BASE}/offline.html`];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(hit=>hit||caches.match(`${BASE}/offline.html`))))});
