class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = true;
        
        this.init();
        this.setupControls();
    }
    
    init() {
        // Create a simple player character
        const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.y = 2;
        this.scene.add(this.mesh);
        
        // Camera setup
        this.camera.position.set(0, 3, 5);
        this.camera.lookAt(this.mesh.position);
    }
    
    setupControls() {
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }
    
    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                this.moveForward = true;
                break;
            case 'KeyA':
                this.moveLeft = true;
                break;
            case 'KeyS':
                this.moveBackward = true;
                break;
            case 'KeyD':
                this.moveRight = true;
                break;
            case 'Space':
                if (this.canJump) {
                    this.velocity.y = 15;
                    this.canJump = false;
                }
                break;
        }
    }
    
    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
                this.moveForward = false;
                break;
            case 'KeyA':
                this.moveLeft = false;
                break;
            case 'KeyS':
                this.moveBackward = false;
                break;
            case 'KeyD':
                this.moveRight = false;
                break;
        }
    }
    
    update() {
        // Basic movement logic
        const speed = 0.2;
        
        if (this.moveForward) this.mesh.position.z -= speed;
        if (this.moveBackward) this.mesh.position.z += speed;
        if (this.moveLeft) this.mesh.position.x -= speed;
        if (this.moveRight) this.mesh.position.x += speed;
        
        // Simple gravity
        this.velocity.y -= 0.5; // gravity
        this.mesh.position.y += this.velocity.y * 0.01;
        
        // Ground collision
        if (this.mesh.position.y < 2) {
            this.mesh.position.y = 2;
            this.velocity.y = 0;
            this.canJump = true;
        }
        
        // Update camera to follow player
        this.camera.position.x = this.mesh.position.x;
        this.camera.position.z = this.mesh.position.z + 5;
        this.camera.position.y = this.mesh.position.y + 3;
        this.camera.lookAt(this.mesh.position);
    }
  }
