class Vehicles {
    constructor(scene) {
        this.scene = scene;
        this.vehicles = [];
        this.availableCars = ['Lamborghini', 'Toyota', 'Nissan', 'Mitsubishi'];
        
        this.spawnVehicles();
    }
    
    spawnVehicles() {
        // Spawn some vehicles around the city
        const positions = [
            { x: 10, z: 10 },
            { x: -10, z: 10 },
            { x: 10, z: -10 },
            { x: -10, z: -10 }
        ];
        
        positions.forEach((pos, index) => {
            if (index < this.availableCars.length) {
                this.createVehicle(this.availableCars[index], pos.x, pos.z);
            }
        });
    }
    
    createVehicle(type, x, z) {
        // Create simple vehicle representation
        // In a real game, you'd load proper 3D models here
        let color;
        
        switch(type) {
            case 'Lamborghini': color = 0xff0000; break;
            case 'Toyota': color = 0x0000ff; break;
            case 'Nissan': color = 0xffff00; break;
            case 'Mitsubishi': color = 0x00ff00; break;
            default: color = 0xffffff;
        }
        
        const chassisGeometry = new THREE.BoxGeometry(3, 1, 1.5);
        const chassisMaterial = new THREE.MeshPhongMaterial({ color: color });
        const chassis = new THREE.Mesh(chassisGeometry, chassisMaterial);
        
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8);
        const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        
        // Create four wheels
        const wheels = [];
        for (let i = 0; i < 4; i++) {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.z = Math.PI / 2;
            wheels.push(wheel);
        }
        
        // Position wheels
        wheels[0].position.set(-1, -0.5, 0.8);  // front left
        wheels[1].position.set(1, -0.5, 0.8);   // front right
        wheels[2].position.set(-1, -0.5, -0.8); // rear left
        wheels[3].position.set(1, -0.5, -0.8);  // rear right
        
        const vehicle = new THREE.Group();
        vehicle.add(chassis);
        wheels.forEach(wheel => vehicle.add(wheel));
        
        vehicle.position.set(x, 1, z);
        vehicle.userData = { type: type, interactable: true };
        
        this.scene.add(vehicle);
        this.vehicles.push(vehicle);
    }
  }
