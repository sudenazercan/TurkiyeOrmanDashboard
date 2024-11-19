document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([39.92077, 32.85411], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '©️ OpenStreetMap contributors'
    }).addTo(map);

    const regions = [
        { name: 'Marmara', lat: 40.7769, lng: 29.9458 },
        { name: 'Ege', lat: 38.4192, lng: 27.1287 },
        { name: 'Akdeniz', lat: 37.1835, lng: 30.321 },
        { name: 'İç Anadolu', lat: 39.9208, lng: 32.8541 },
        { name: 'Karadeniz', lat: 40.7685, lng: 37.4201 },
        { name: 'Doğu Anadolu', lat: 39.9208, lng: 41.2679 },
        { name: 'Güneydoğu Anadolu', lat: 37.2153, lng: 38.2766 }
    ];

    // Orman verileri
    const forests = {
        'Marmara': [
            { name: 'Kaz Dağları Ormanı', lat: 39.678, lng: 26.747, area: 20792 },
            { name: 'Belgrad Ormanı', lat: 41.184, lng: 28.914, area: 5442 },
            { name: 'İğneada Longoz Ormanları', lat: 41.883, lng: 27.986, area: 3155 }
        ],
        'Ege': [
            { name: 'Bozdağ Ormanları', lat: 38.262, lng: 28.117, area: 12500 },
            { name: 'Spil Dağı Milli Parkı', lat: 38.585, lng: 27.426, area: 6800 }
        ],
        'Akdeniz': [
            { name: 'Toros Dağları Ormanları', lat: 37.028, lng: 32.404, area: 17000 },
            { name: 'Beydağları Milli Parkı', lat: 36.830, lng: 30.589, area: 15000 },
            { name: 'Köprülü Kanyon Ormanları', lat: 37.224, lng: 31.240, area: 9250 },
            { name: 'Termessos Milli Parkı', lat: 36.991, lng: 30.506, area: 6800 }
        ],
        'İç Anadolu': [
            { name: 'Bolkar Dağları Ormanları', lat: 37.280, lng: 34.526, area: 12500 },
            { name: 'Türkmen Dağı Ormanları', lat: 38.706, lng: 31.927, area: 8600 },
            { name: 'Sündiken Ormanları', lat: 39.784, lng: 31.140, area: 5400 }
        ],
        'Karadeniz': [
            { name: 'Kaçkar Dağları Ormanları', lat: 40.910, lng: 41.235, area: 20000 },
            { name: 'Küre Dağları Milli Parkı', lat: 41.837, lng: 33.476, area: 13800 },
            { name: 'Yedigöller Milli Parkı', lat: 40.937, lng: 31.735, area: 6800 }
        ],
        'Doğu Anadolu': [
            { name: 'Munzur Dağları Ormanları', lat: 39.084, lng: 39.537, area: 18500 },
            { name: 'Bingöl Dağları Ormanları', lat: 39.042, lng: 40.591, area: 12500 },
            { name: 'Palandöken Dağları Ormanları', lat: 39.888, lng: 41.278, area: 7200 }
        ],
        'Güneydoğu Anadolu': [
            { name: 'Karacadağ Ormanları', lat: 37.472, lng: 39.797, area: 9500 },
            { name: 'Dicle Ormanları', lat: 37.914, lng: 40.240, area: 7200 },
            { name: 'Birecik Ormanları', lat: 37.034, lng: 37.978, area: 5400 }
        ]
    };

    const trees = {
        'Belgrad Ormanı': [
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 41.185, lng: 28.910 },
            { name: 'Kayın', kesilebilir: 'Hayır', yas: '150-200 yıl', lat: 41.186, lng: 28.906 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 41.188, lng: 28.888 },
            { name: 'Çınar', kesilebilir: 'Evet', yas: '200-300 yıl', lat: 41.187, lng: 28.902 },
            { name: 'Kestane', kesilebilir: 'Hayır', yas: '100-150 yıl', lat: 41.189, lng: 28.884 }
        ],
        'Kaz Dağları Ormanı': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 39.679, lng: 26.743 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 39.680, lng: 26.739 },
            { name: 'Kazdağı Göknarı', kesilebilir: 'Hayır', yas: '200-300 yıl', lat: 39.681, lng: 26.735 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 39.682, lng: 26.731 },
            { name: 'Çınar', kesilebilir: 'Hayır', yas: '200-300 yıl', lat: 39.683, lng: 26.727 }
        ],
        'İğneada Longoz Ormanları': [
            { name: 'Dişbudak', kesilebilir: 'Hayır', yas: '80-150 yıl', lat: 41.884, lng: 27.982 },
            { name: 'Kızılağaç', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 41.885, lng: 27.978 },
            { name: 'Söğüt', kesilebilir: 'Evet', yas: '30-70 yıl', lat: 41.886, lng: 27.974 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 41.887, lng: 27.970 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 41.888, lng: 27.966 }
        ],
        'Spil Dağı Milli Parkı': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 38.586, lng: 27.422 },
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 38.587, lng: 27.418 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 38.588, lng: 27.414 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 38.589, lng: 27.410 }
        ],
        'Bozdağ Ormanları': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 38.263, lng: 28.113 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 38.264, lng: 28.109 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 38.265, lng: 28.105 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 38.266, lng: 28.101 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 38.267, lng: 28.097 }
        ],
        'Termessos Milli Parkı': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 36.992, lng: 30.502 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 36.993, lng: 30.488 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 36.984, lng: 30.484 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 36.995, lng: 30.480 }
        ],
        'Beydağları Milli Parkı': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 36.831, lng: 30.585 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 36.532, lng: 30.581 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 36.533, lng: 30.577 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 36.534, lng: 30.573 }
        ],
        'Toros Dağları Ormanları': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 37.029, lng: 32.400 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 37.030, lng: 32.336 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 37.031, lng: 32.332 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 37.032, lng: 32.328 },
            { name: 'Fıstık Çamı', kesilebilir: 'Hayır', yas: '80-150 yıl', lat: 37.033, lng: 32.324 }
        ],
        'Köprülü Kanyon Ormanları': [
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 37.225, lng: 31.236 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 37.226, lng: 31.232 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 37.227, lng: 31.228 },
            { name: 'Akasya', kesilebilir: 'Evet', yas: '30-50 yıl', lat: 37.228, lng: 31.224 },
            { name: 'Zeytin', kesilebilir: 'Hayır', yas: '200-500 yıl', lat: 37.229, lng: 31.220 }
        ],
        'Sündiken Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 39.785, lng: 31.136 },
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 39.786, lng: 31.132 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 39.787, lng: 31.128 },
            { name: 'Akasya', kesilebilir: 'Evet', yas: '30-50 yıl', lat: 39.788, lng: 31.124 },
            { name: 'Fıstık Çamı', kesilebilir: 'Hayır', yas: '80-150 yıl', lat: 39.789, lng: 31.120 }
        ],
        'Türkmen Dağı Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 38.707, lng: 31.923 },
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 38.708, lng: 31.919 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 38.709, lng: 31.915 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 38.710, lng: 31.914 }
        ],
        'Bolkar Dağları Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 37.281, lng: 34.522 },
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 37.282, lng: 34.518 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 37.283, lng: 34.514 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 37.284, lng: 34.510 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 37.285, lng: 34.506 }
        ],
        'Küre Dağları Milli Parkı': [
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 41.838, lng: 33.472 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 41.839, lng: 33.468 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 41.840, lng: 33.464 },
            { name: 'Ladin', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 41.841, lng: 33.460 },
            { name: 'Fıstık Çamı', kesilebilir: 'Hayır', yas: '80-150 yıl', lat: 41.842, lng: 33.456 }
        ],
        'Kaçkar Dağları Ormanları': [
            { name: 'Ladin', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 40.911, lng: 41.231 },
            { name: 'Sarıçam', kesilebilir: 'Evet', yas: '100-200 yıl', lat: 40.912, lng: 41.227 },
            { name: 'Göknar', kesilebilir: 'Hayır', yas: '200-400 yıl', lat: 40.913, lng: 41.223 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 40.914, lng: 41.219 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 40.915, lng: 41.215 },
            { name: 'Kayın', kesilebilir: 'Hayır', yas: '150-200 yıl', lat: 40.916, lng: 41.211 }
        ],
        'Yedigöller Milli Parkı': [
            { name: 'Kayın', kesilebilir: 'Hayır', yas: '150-200 yıl', lat: 40.938, lng: 31.731 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 40.939, lng: 31.727 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 40.940, lng: 31.723 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 40.941, lng: 31.719 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 40.942, lng: 31.715 }
        ],
        'Munzur Dağları Ormanları': [
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 39.085, lng: 39.533 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 39.086, lng: 39.529 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 39.087, lng: 39.525 },
            { name: 'Kayın', kesilebilir: 'Hayır', yas: '150-200 yıl', lat: 39.088, lng: 39.521 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 39.089, lng: 39.517 }
        ],
        'Bingöl Dağları Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 39.043, lng: 40.587 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 39.044, lng: 40.483 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 39.045, lng: 40.479 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 39.046, lng: 40.475 },
            { name: 'Fıstık Çamı', kesilebilir: 'Hayır', yas: '80-150 yıl', lat: 39.047, lng: 40.471 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 39.048, lng: 40.467 }
        ],
        'Palandöken Dağları Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 39.889, lng: 41.274},
            { name: 'Kızılçam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 39.890, lng: 41.270 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 39.891, lng: 41.266 },
            { name: 'Sedir', kesilebilir: 'Hayır', yas: '100-200 yıl', lat: 39.892, lng: 41.262 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 39.893, lng: 41.258 },
            { name: 'Gürgen', kesilebilir: 'Hayır', yas: '80-100 yıl', lat: 39.894, lng: 41.254 }
        ],
        'Dicle Ormanları': [
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 37.915, lng: 40.236 },
            { name: 'Zeytin', kesilebilir: 'Hayır', yas: '200-500 yıl', lat: 37.916, lng: 40.232 },
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 37.917, lng: 40.228 },
            { name: 'Akasya', kesilebilir: 'Evet', yas: '30-50 yıl', lat: 37.918, lng: 40.224 },
            { name: 'Çınar', kesilebilir: 'Hayır', yas: '200-300 yıl', lat: 37.919, lng: 40.220 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 37.920, lng: 40.216 }
        ],
        'Birecik Ormanları': [
            { name: 'Akasya', kesilebilir: 'Evet', yas: '30-50 yıl', lat: 37.035, lng: 37.974 },
            { name: 'Çam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 37.036, lng: 37.970 },
            { name: 'Zeytin', kesilebilir: 'Hayır', yas: '200-500 yıl', lat: 37.037, lng: 37.966 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 37.038, lng: 37.962 },
            { name: 'Meşe', kesilebilir: 'Evet', yas: '70-120 yıl', lat: 37.039, lng: 37.958 },
            { name: 'Kayın', kesilebilir: 'Hayır', yas: '150-200 yıl', lat: 37.040, lng: 37.954 }
        ],
        'Karacadağ Ormanları': [
            { name: 'Karaçam', kesilebilir: 'Evet', yas: '60-120 yıl', lat: 37.473, lng: 39.793 },
            { name: 'Zeytin', kesilebilir: 'Hayır', yas: '200-500 yıl', lat: 37.474, lng: 39.789 },
            { name: 'Akasya', kesilebilir: 'Evet', yas: '30-50 yıl', lat: 37.475, lng: 39.785 },
            { name: 'Çam', kesilebilir: 'Evet', yas: '50-100 yıl', lat: 37.476, lng: 39.781 },
            { name: 'Ardıç', kesilebilir: 'Hayır', yas: '150-300 yıl', lat: 37.477, lng: 39.777 }
        ]
        // Diğer ormanları buraya ekleyerek yaparsın
    };

    let forestMarkers = [];
    let treeMarkers = [];
    const infoContent = document.getElementById('info-content');

    regions.forEach(region => {
        const regionMarker = L.marker([region.lat, region.lng]).addTo(map);
        regionMarker.bindPopup(`<b>${region.name} Bölgesi</b>`);

        regionMarker.on('click', () => {
            updateForestsInfo(region.name);
            map.setView([region.lat, region.lng], 8);

            // Önceki markerları temizle
            forestMarkers.forEach(marker => map.removeLayer(marker));
            treeMarkers.forEach(marker => map.removeLayer(marker));
            forestMarkers = [];
            treeMarkers = [];

            // Orman markerlarını ekle
            forests[region.name]?.forEach(forest => {
                const forestMarker = L.marker([forest.lat, forest.lng]).addTo(map);
                forestMarker.bindPopup(`<b>${forest.name}</b>`);
                forestMarkers.push(forestMarker);

                forestMarker.on('click', () => {
                    updateTreesInfo(forest.name);
                    map.setView([forest.lat, forest.lng], 13);

                    // Önceki ağaç markerlarını temizle
                    treeMarkers.forEach(marker => map.removeLayer(marker));
                    treeMarkers = [];

                    // Ağaç markerlarını ekle
                    trees[forest.name]?.forEach(tree => {
                        const treeMarker = L.marker([tree.lat, tree.lng]).addTo(map);
                        treeMarker.bindPopup(`<b>${tree.name}</b>`);
                        treeMarkers.push(treeMarker);

                        treeMarker.on('click', () => {
                            updateTreeDetails(tree)
                        });
                    });
                });
            });
        });
    });
    function updateForestsInfo(regionName) {
        const infoContent = document.getElementById('info-content');

        if (forests[regionName]) {
            // Ormanları büyükten küçüğe sırala
            const sortedForests = forests[regionName].sort((a, b) => b.area - a.area);

            // Bilgi paneli içeriği
            let content = `<h4>${regionName} Bölgesi Ormanları</h4><ul>`;
            sortedForests.forEach(forest => {
                content += `
                <li>
                    <b>${forest.name}</b> - Alan: ${forest.area} km²
                </li>
            `;
            });
            content += '</ul>';
            infoContent.innerHTML = content;
        } else {
            infoContent.innerHTML = `<p>${regionName} bölgesi için orman bilgisi bulunamadı.</p>`;
        }
    }
    function updateTreesInfo(forestName) {
        const infoContent = document.getElementById('info-content');

        if (trees[forestName]) {
            // Bilgi paneli içeriği
            let content = `<h4>${forestName}</h4><ul>`;
            trees[forestName].forEach(tree => {
                content += `
                <li>
                    <b>${tree.name}</b><br>
                    Kesilebilir: ${tree.kesilebilir ? 'Evet' : 'Hayır'}<br>
                    Yaş: ${tree.yas || 'Bilinmiyor'}
                </li>
            `;
            });
            content += '</ul>';
            infoContent.innerHTML = content;
        } else {
            infoContent.innerHTML = `<p>${forestName} için ağaç bilgisi bulunamadı.</p>`;
        }
    }
    function updateTreeDetails(tree) {
        const infoContent = document.getElementById('info-content');
        infoContent.innerHTML = `
        <h4>${tree.name}</h4>
        <p><b>Kesilebilir:</b> ${tree.kesilebilir ? 'Evet' : 'Hayır'}</p>
        <p><b>Yaş:</b> ${tree.yas || 'Bilinmiyor'}</p>
    `;
    }
});
marker.on('click', () => {
    map.setView([region.lat, region.lng], 8);

    // Orman marker'larını temizle
    if (window.forestMarkers) {
        window.forestMarkers.forEach(forestMarker => map.removeLayer(forestMarker));
    }
    window.forestMarkers = [];

    // Bilgi panelini güncelle
    updateForestsInfo(region.name);

    // Orman marker'larını ekle
    if (forests[region.name]) {
        forests[region.name].forEach(forest => {
            const forestMarker = L.marker([forest.lat, forest.lng]).addTo(map);
            forestMarker.bindPopup(`<b>${forest.name}</b>`);

            // Orman marker'ına tıklama
            forestMarker.on('click', () => {
                map.setView([forest.lat, forest.lng], 10);

                // Ağaç marker'larını temizle
                if (window.treeMarkers) {
                    window.treeMarkers.forEach(treeMarker => map.removeLayer(treeMarker));
                }
                window.treeMarkers = [];

                // Bilgi panelini güncelle
                updateTreesInfo(forest.name);

                // Ağaç marker'larını ekle
                if (trees[forest.name]) {
                    trees[forest.name].forEach(tree => {
                        const treeMarker = L.marker([tree.lat, tree.lng], {
                            icon: L.AwesomeMarkers.icon({
                                icon: 'tree',
                                markerColor: 'green',
                                prefix: 'glyphicon'
                            })
                        }).addTo(map);
                        treeMarker.bindPopup(`<b>${tree.name}</b>`);

                        treeMarker.on('click', () => {
                            updateTreeDetails(tree);
                        });

                        window.treeMarkers.push(treeMarker);
                    });
                }
            });

            window.forestMarkers.push(forestMarker);
        });
    }
});