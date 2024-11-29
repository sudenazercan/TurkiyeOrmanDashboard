document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([36.92077, 33.85411], 5.4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '©️ OpenStreetMap contributors'
    }).addTo(map);

    const regions = [
        { name: 'Marmara', lat: 40.7769, lng: 29.9458 },
        { name: 'Ege', lat: 38.4192, lng: 27.1287 },
        { name: 'Akdeniz', lat: 37.1835, lng: 30.321 },
        { name: 'Ic Anadolu', lat: 39.9208, lng: 32.8541 },
        { name: 'Karadeniz', lat: 40.7685, lng: 37.4201 },
        { name: 'Dogu Anadolu', lat: 39.9208, lng: 41.2679 },
        { name: 'Guneydogu Anadolu', lat: 37.2153, lng: 38.2766 }
    ];

    // Orman verileri
    const forests = {
        'Marmara': [
            {
                name: 'Belgrad Ormani',
                lat: 41.184,
                lng: 28.914,
                totalTrees: 150000,
                markedTrees: 50000,
                toBeMarkedTrees: 30000,
                toBeCutTrees: 10000,
                nonCuttableTrees: 110000
            },
            {
                name: 'Kaz Daglari Ormani',
                lat: 39.678,
                lng: 26.747,
                totalTrees: 200000,
                markedTrees: 80000,
                toBeMarkedTrees: 40000,
                toBeCutTrees: 20000,
                nonCuttableTrees: 160000
            },
            {
                name: 'Igneada Longoz Ormanlari',
                lat: 41.883,
                lng: 27.986,
                totalTrees: 180000,
                markedTrees: 70000,
                toBeMarkedTrees: 35000,
                toBeCutTrees: 15000,
                nonCuttableTrees: 140000
            }
        ],
        'Ege': [
            {
                name: 'Spil Dagi Milli Parki',
                lat: 38.585,
                lng: 27.426,
                totalTrees: 100000,
                markedTrees: 30000,
                toBeMarkedTrees: 20000,
                toBeCutTrees: 5000,
                nonCuttableTrees: 85000
            },
            {
                name: 'Bozdag Ormanlari',
                lat: 38.262,
                lng: 28.117,
                totalTrees: 90000,
                markedTrees: 25000,
                toBeMarkedTrees: 15000,
                toBeCutTrees: 7000,
                nonCuttableTrees: 78000
            }
        ],
        'Akdeniz': [
            {
                name: 'Termessos Milli Parki',
                lat: 36.991,
                lng: 30.506,
                totalTrees: 120000,
                markedTrees: 40000,
                toBeMarkedTrees: 25000,
                toBeCutTrees: 8000,
                nonCuttableTrees: 104000
            },
            {
                name: 'Beydaglari Milli Parki',
                lat: 36.830,
                lng: 30.589,
                totalTrees: 150000,
                markedTrees: 50000,
                toBeMarkedTrees: 30000,
                toBeCutTrees: 10000,
                nonCuttableTrees: 120000
            },
            {
                name: 'Toros Daglari Ormanlari',
                lat: 37.028,
                lng: 32.404,
                totalTrees: 200000,
                markedTrees: 70000,
                toBeMarkedTrees: 40000,
                toBeCutTrees: 15000,
                nonCuttableTrees: 175000
            },
            {
                name: 'Koprulu Kanyon Ormanlari',
                lat: 37.224,
                lng: 31.240,
                totalTrees: 90000,
                markedTrees: 30000,
                toBeMarkedTrees: 20000,
                toBeCutTrees: 6000,
                nonCuttableTrees: 84000
            }
        ],
        'Ic Anadolu': [
            {
                name: 'Sundiken Ormanlari',
                lat: 39.784,
                lng: 31.140,
                totalTrees: 75000,
                markedTrees: 20000,
                toBeMarkedTrees: 15000,
                toBeCutTrees: 5000,
                nonCuttableTrees: 70000
            },
            {
                name: 'Turkmen Dagi Ormanlari',
                lat: 38.706,
                lng: 31.927,
                totalTrees: 85000,
                markedTrees: 30000,
                toBeMarkedTrees: 20000,
                toBeCutTrees: 7000,
                nonCuttableTrees: 78000
            },
            {
                name: 'Bolkar Daglari Ormanlari',
                lat: 37.280,
                lng: 34.526,
                totalTrees: 60000,
                markedTrees: 15000,
                toBeMarkedTrees: 10000,
                toBeCutTrees: 4000,
                nonCuttableTrees: 56000
            }
        ],
        'Karadeniz': [
            {
                name: 'Kure Daglari Milli Parki',
                lat: 41.837,
                lng: 33.476,
                totalTrees: 220000,
                markedTrees: 80000,
                toBeMarkedTrees: 40000,
                toBeCutTrees: 20000,
                nonCuttableTrees: 200000
            },
            {
                name: 'Kackar Daglari Ormanlari',
                lat: 40.910,
                lng: 41.235,
                totalTrees: 250000,
                markedTrees: 100000,
                toBeMarkedTrees: 50000,
                toBeCutTrees: 30000,
                nonCuttableTrees: 220000
            },
            {
                name: 'Yedigoller Milli Parki',
                lat: 40.937,
                lng: 31.735,
                totalTrees: 150000,
                markedTrees: 60000,
                toBeMarkedTrees: 30000,
                toBeCutTrees: 15000,
                nonCuttableTrees: 135000
            }
        ],
        'Dogu Anadolu': [
            {
                name: 'Munzur Daglari Ormanlari',
                lat: 39.084,
                lng: 39.537,
                totalTrees: 100000,
                markedTrees: 35000,
                toBeMarkedTrees: 20000,
                toBeCutTrees: 8000,
                nonCuttableTrees: 92000
            },
            {
                name: 'Bingol Daglari Ormanlari',
                lat: 39.042,
                lng: 40.591,
                totalTrees: 120000,
                markedTrees: 40000,
                toBeMarkedTrees: 25000,
                toBeCutTrees: 9000,
                nonCuttableTrees: 111000
            },
            {
                name: 'Palandoken Daglari Ormanlari',
                lat: 39.888,
                lng: 41.278,
                totalTrees: 80000,
                markedTrees: 30000,
                toBeMarkedTrees: 15000,
                toBeCutTrees: 7000,
                nonCuttableTrees: 73000
            }
        ],
        'Guneydogu Anadolu': [
            {
                name: 'Dicle Ormanlari',
                lat: 37.914,
                lng: 40.240,
                totalTrees: 50000,
                markedTrees: 15000,
                toBeMarkedTrees: 10000,
                toBeCutTrees: 4000,
                nonCuttableTrees: 46000
            },
            {
                name: 'Birecik Ormanlari',
                lat: 37.034,
                lng: 37.978,
                totalTrees: 70000,
                markedTrees: 20000,
                toBeMarkedTrees: 15000,
                toBeCutTrees: 5000,
                nonCuttableTrees: 65000
            },
            {
                name: 'Karacadag Ormanlari',
                lat: 37.472,
                lng: 39.797,
                totalTrees: 60000,
                markedTrees: 18000,
                toBeMarkedTrees: 12000,
                toBeCutTrees: 4000,
                nonCuttableTrees: 56000
            }
        ]
    };

    const trees = {
        'Belgrad Ormani': [
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.185, lng: 28.910 },
            { name: 'Kayin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.186, lng: 28.906 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.188, lng: 28.888 },
            { name: 'Cinar', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.187, lng: 28.902 },
            { name: 'Kestane', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.189, lng: 28.884 }
        ],
        'Kaz Daglari Ormani': [
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.679, lng: 26.743 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.680, lng: 26.739 },
            { name: 'KazdagiGoknari', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.681, lng: 26.735 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.682, lng: 26.731 },
            { name: 'Cinar', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.683, lng: 26.727 }
        ],
        'Igneada Longoz Ormanlari': [
            { name: 'Disbudak', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.884, lng: 27.982 },
            { name: 'Kizilagac', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.885, lng: 27.978 },
            { name: 'Sogut', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.886, lng: 27.974 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.887, lng: 27.970 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.888, lng: 27.966 }
        ],
        'Spil Dagi Milli Parki': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.586, lng: 27.422 },
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.587, lng: 27.418 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.588, lng: 27.414 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.589, lng: 27.410 }
        ],
        'Bozdag Ormanlari': [
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.263, lng: 28.113 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.264, lng: 28.109 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.265, lng: 28.105 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.266, lng: 28.101 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.267, lng: 28.097 }
        ],
        'Termessos Milli Parki': [
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.992, lng: 30.502 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.993, lng: 30.488 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.984, lng: 30.484 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.995, lng: 30.480 }
        ],
        'Beydaglari Milli Parki': [
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.831, lng: 30.585 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.532, lng: 30.581 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.533, lng: 30.577 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 36.534, lng: 30.573 }
        ],
        'Toros Daglari Ormanlari': [
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.029, lng: 32.400 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.030, lng: 32.336 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.031, lng: 32.332 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.032, lng: 32.328 },
            { name: 'FistikCami', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.033, lng: 32.324 }
        ],
        'Koprulu Kanyon Ormanlari': [
            { name: 'Kizilcam', totalTrees: 3000, kesilebilir: 'Evet', toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.225, lng: 31.236 },
            { name: 'Sedir', totalTrees: 3000, kesilebilir: 'Hayir', toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.226, lng: 31.232 },
            { name: 'Mese', totalTrees: 3000, kesilebilir: 'Evet', toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.227, lng: 31.228 },
            { name: 'Akasya', totalTrees: 3000, kesilebilir: 'Evet', toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.228, lng: 31.224 },
            { name: 'Zeytin', totalTrees: 3000, kesilebilir: 'Hayir', toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.229, lng: 31.220 }
        ],
        'Sundiken Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.785, lng: 31.136 },
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.786, lng: 31.132 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.787, lng: 31.128 },
            { name: 'Akasya', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.788, lng: 31.124 },
            { name: 'FistikCami', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.789, lng: 31.120 }
        ],
        'Turkmen Dagi Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.707, lng: 31.923 },
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.708, lng: 31.919 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.709, lng: 31.915 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 38.710, lng: 31.914 }
        ],
        'Bolkar Daglari Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.281, lng: 34.522 },
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.282, lng: 34.518 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.283, lng: 34.514 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.284, lng: 34.510 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.285, lng: 34.506 }
        ],
        'Kure Daglari Milli Parki': [
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.838, lng: 33.472 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.839, lng: 33.468 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.840, lng: 33.464 },
            { name: 'Ladin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.841, lng: 33.460 },
            { name: 'FistikCami', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 41.842, lng: 33.456 }
        ],
        'Kackar Daglari Ormanlari': [
            { name: 'Ladin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.911, lng: 41.231 },
            { name: 'Saricam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.912, lng: 41.227 },
            { name: 'Goknar', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.913, lng: 41.223 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.914, lng: 41.219 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.915, lng: 41.215 },
            { name: 'Kayin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.916, lng: 41.211 }
        ],
        'Yedigoller Milli Parki': [
            { name: 'Kayin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.938, lng: 31.731 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.939, lng: 31.727 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.940, lng: 31.723 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.941, lng: 31.719 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 40.942, lng: 31.715 }
        ],
        'Munzur Daglari Ormanlari': [
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.085, lng: 39.533 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.086, lng: 39.529 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.087, lng: 39.525 },
            { name: 'Kayin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.088, lng: 39.521 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.089, lng: 39.517 }
        ],
        'Bingol Daglari Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.043, lng: 40.587 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.044, lng: 40.483 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.045, lng: 40.479 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.046, lng: 40.475 },
            { name: 'FistikCami', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.047, lng: 40.471 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.048, lng: 40.467 }
        ],
        'Palandoken Daglari Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.889, lng: 41.274 },
            { name: 'Kizilcam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.890, lng: 41.270 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.891, lng: 41.266 },
            { name: 'Sedir', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.892, lng: 41.262 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.893, lng: 41.258 },
            { name: 'Gurgen', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 39.894, lng: 41.254 }
        ],
        'Dicle Ormanlari': [
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.915, lng: 40.236 },
            { name: 'Zeytin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.916, lng: 40.232 },
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.917, lng: 40.228 },
            { name: 'Akasya', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.918, lng: 40.224 },
            { name: 'Cinar', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.919, lng: 40.220 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.920, lng: 40.216 }
        ],
        'Birecik Ormanlari': [
            { name: 'Akasya', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.035, lng: 37.974 },
            { name: 'Cam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.036, lng: 37.970 },
            { name: 'Zeytin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.037, lng: 37.966 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.038, lng: 37.962 },
            { name: 'Mese', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.039, lng: 37.958 },
            { name: 'Kayin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.040, lng: 37.954 }
        ],
        'Karacadag Ormanlari': [
            { name: 'Karacam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.473, lng: 39.793 },
            { name: 'Zeytin', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.474, lng: 39.789 },
            { name: 'Akasya', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.475, lng: 39.785 },
            { name: 'Cam', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.476, lng: 39.781 },
            { name: 'Ardic', totalTrees: 3000, markedTrees: 1500, toBeMarkedTrees: 1200, toBeCutTrees: 400, nonCuttableTrees: 560, lat: 37.477, lng: 39.777 }
        ],
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
            const sortedForests = forests[regionName].sort((a, b) => b.totalTrees - a.totalTrees);

            // Bilgi paneli içeriği
            let content = `<h4>${regionName} Bölgesi Ormanları</h4><ul>`;
            sortedForests.forEach(forest => {
                content += `
                <li>
                <b>${forest.name}</b><br>
                Toplam Ağaç Sayısı: ${forest.totalTrees}<br>
                Damgalı Ağaç Sayısı: ${forest.markedTrees}<br>
                Damgalanacak Ağaç Sayısı: ${forest.toBeMarkedTrees}<br>
                Kesilecek Ağaç Sayısı: ${forest.toBeCutTrees}<br>
                Kesilemez Ağaç Sayısı: ${forest.nonCuttableTrees}
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

        let forestFound = null;

        for (const region in forests) {
            const forest = forests[region].find(forest => forest.name === forestName);
            if (forest) {
                forestFound = forest;
                break;
            }
        }

        if (trees[forestName] && forestFound) {
            let content = `
        <h4>${forestName}</h4>
        <p><b>Toplam Ağaç Sayısı:</b> ${forestFound.totalTrees}</p>
        <p><b>Damgalı Ağaç Sayısı:</b> ${forestFound.markedTrees}</p>
        <p><b>Damgalanacak Ağaç Sayısı:</b> ${forestFound.toBeMarkedTrees}</p>
        <p><b>Kesilecek Ağaç Sayısı:</b> ${forestFound.toBeCutTrees}</p>
        <p><b>Kesilemez Ağaç Sayısı:</b> ${forestFound.nonCuttableTrees}</p>
        <p><b>Koordinatlar:</b> (${forestFound.lat}, ${forestFound.lng})</p>
        <hr>
        <h4>${forestName} Ağaçları</h4>
        <ul>`;

            trees[forestName].forEach(tree => {
                const iconPath = `./icons/${tree.name}.png`;
                content += `
            <li>
                <img src="${iconPath}" alt="${tree.name} Icon" 
                     style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;">
                <b>${tree.name}</b><br>
                Toplam Ağaç Sayısı: ${tree.totalTrees}<br>
                Damgalı Ağaç Sayısı: ${tree.markedTrees}<br>
                Damgalanacak Ağaç Sayısı: ${tree.toBeMarkedTrees}<br>
                Kesilecek Ağaç Sayısı: ${tree.toBeCutTrees}<br>
                Kesilemez Ağaç Sayısı: ${tree.nonCuttableTrees}
            </li>`;
            });
            content += '</ul>';
            infoContent.innerHTML = content;
        }else {
            infoContent.innerHTML = `<p>${forestName} için ağaç bilgisi bulunamadı.</p>`;
        }
    }
    function updateTreeDetails(tree) {
        const infoContent = document.getElementById('info-content');
        infoContent.innerHTML = `
        <h4>${tree.name}</h4>
        <p><b>Toplam Ağaç Sayısı:</b> ${tree.totalTrees}</p>
        <p><b>Damgalı Ağaç Sayısı:</b> ${tree.markedTrees}</p>
        <p><b>Damgalanacak Ağaç Sayısı:</b> ${tree.toBeMarkedTrees}</p>
        <p><b>Kesilecek Ağaç Sayısı:</b> ${tree.toBeCutTrees}</p>
        <p><b>Kesilemez Ağaç Sayısı:</b> ${tree.nonCuttableTrees}</p>
        <p><b>Koordinatlar:</b> (${tree.lat}, ${tree.lng})</p>
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
    document.getElementById('region-select').addEventListener('change', function () {
        const selectedRegion = this.value;

        if (selectedRegion) {
            // Focus map on selected region
            const region = forests[selectedRegion];
            if (region) {
                const { lat, lng } = region[0]; // Take the first forest in the region for example
                map.setView([lat, lng], 8); // Adjust zoom level as needed

                // Clear existing markers
                if (window.forestMarkers) {
                    window.forestMarkers.forEach(marker => map.removeLayer(marker));
                }

                // Add forest markers for the selected region
                window.forestMarkers = [];
                region.forEach(forest => {
                    const marker = L.marker([forest.lat, forest.lng]).addTo(map);
                    marker.bindPopup(`<b>${forest.name}</b>`);

                    marker.on('click', () => {
                        // Display tree info for the forest
                        updateTreesInfo(forest.name);
                    });

                    window.forestMarkers.push(marker);
                });

                // Update forest details in the panel
                updateForestsInfo(selectedRegion);
            } else {
                alert('Seçilen bölgede veri bulunamadı.');
            }
        }
    });
});
