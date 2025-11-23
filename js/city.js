class City {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
        this.roads = [];
        
        this.generateCity();
    }
    
    generateCity() {
        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
        const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
        
        // Generate simple buildings (in a real game, you'd use proper 3D models)
        this.generateBuildings();
        this.generateRoads();
    }
    
    generateBuildings() {
        const buildingColors = [0x888888, 0x999999, 0xaaaaaa, 0x777777];
        
        for (let i = -20; i <= 20; i += 5) {
            for (let j = -20; j <= 20; j += 5) {
                if (Math.abs(i) < 10 && Math.abs(j) < 10) continue; // Leave central area open
                
                const height = Math.random() * 20 + 10;
                const geometry = new THREE.BoxGeometry(4, height, 4);
                const material = new THREE.MeshPhongMaterial({ 
                    color: buildingColors[Math.floor(Math.random() * buildingColors.length)] 
                });
                const building = new THREE.Mesh(geometry, material);
                
                building.position.set(i, height / 2, j);
                this.scene.add(building);
                this.buildings.push(building);
            }
        }
    }
    
    generateRoads() {
        // Create simple road grid
        for (let i = -25; i <= 25; i += 5) {
            const roadGeometry = new THREE.PlaneGeometry(200, 2);
            const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
            const road = new THREE.Mesh(roadGeometry, roadMaterial);
            road.rotation.x = -Math.PI / 2;
            road.position.set(0, 0.01, i);
            this.scene.add(road);
            
            const road2 = new THREE.Mesh(roadGeometry, roadMaterial);
            road2.rotation.x = -Math.PI / 2;
            road2.rotation.z = Math.PI / 2;
            road2.position.set(i, 0.01, 0);
            this.scene.add(road2);
        }
    }
            }
