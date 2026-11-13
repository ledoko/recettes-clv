// notifications de l'appli Recettes CLV (pas de cache : toujours à jour)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {}; try { d = e.data.json(); } catch (x) { d = { titre: 'Recettes CLV', corps: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.titre || 'Recettes CLV', { body: d.corps || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || undefined, data: { url: './#/alertes' } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => {
    for (const c of l) if ('focus' in c) { c.navigate && c.navigate('./#/alertes'); return c.focus(); }
    return self.clients.openWindow('./#/alertes');
  }));
});
