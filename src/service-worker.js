const cacheArr =['/','./css/*']
self.addEventListener('install',(event)=>{
    console.log('worker is installed');
    event.waitUntil(
        caches.open('balhraWorld').then((cache)=>{
        console.log("opened Cache");
        cache.addAll(cacheArr).then(()=>
            self.skipWaiting())
    }))
})