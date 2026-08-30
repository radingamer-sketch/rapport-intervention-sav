const C='sav-v3';
const ASSETS=['./','./index.html','./manifest.json','./logo.png'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(async c=>{
    for(const a of ASSETS){try{await c.add(a)}catch(err){}}
  }));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;
  }).catch(()=>caches.match(e.request)));
});
