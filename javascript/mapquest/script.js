L.mapquest.key = '8bjlbcHoGVSkdZiGpfRlGbHFIItuSEnO';

// 'map' refers to a <div> element with the ID map
const map = L.mapquest.map('map', {
  center: [39.6198613, -104.9848951],
  layers: L.mapquest.tileLayer('light'),
  zoom: 12
});

map.addControl(L.mapquest.control({
  position: 'bottomright'
}));

map.addControl(L.mapquest.satelliteControl());
// map.addControl(L.mapquest.searchControl());


window.onload = L.marker([39.6198613, -104.9848951], {
  icon: L.mapquest.icons.marker({
    primaryColor: '#22407F',
    secondaryColor: '#3B5998',
    shadow: true,
    size: 'sm',
    symbol: 'T'
  })
})
  .bindPopup('This is Thanh\' house!')
  .addTo(map);
