const CACHE_NAME="set-list-public-v3.0";
const INDEX="./index.html";
const APP_SHELL=[INDEX,"./manifest.json","./setlist-logo.png","./setlist-icon-192.png","./setlist-icon-512.png","./apple-touch-icon.png","./help-repertoire.png","./help-current.png","./help-saved.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 if(event.request.mode==="navigate"){
  event.respondWith(caches.match(INDEX).then(cached=>cached||fetch(event.request)));
  return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});