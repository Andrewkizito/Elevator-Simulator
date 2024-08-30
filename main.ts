
class Elevator {
    private currentFloor: number
    private elevatorEl: HTMLDivElement

    constructor() {
        this.currentFloor = 1
        this.elevatorEl = document.getElementById('elevator') as HTMLDivElement
    }

    moveToFloor (nextFloor: number) {
        if (this.currentFloor === nextFloor) return
    
        
        // Move Elevator
        const height = (nextFloor - 1) * 100
        const tripDuration = (Math.abs(this.currentFloor - nextFloor)) * 1000

        this.elevatorEl.style.transition = `transform ${tripDuration}ms linear`
        this.elevatorEl.style.transform = `translateY(-${height}%)`

        // Update Floor
        this.currentFloor = nextFloor
    }
}

// Create Elevator
const elevator = new Elevator()

// Floor Control
const floor1Button = document.getElementById('floor-1') as HTMLButtonElement
const floor2Button = document.getElementById('floor-2') as HTMLButtonElement
const floor3Button = document.getElementById('floor-3') as HTMLButtonElement
const floor4Button = document.getElementById('floor-4') as HTMLButtonElement

// Listen for floor buttons
floor1Button.addEventListener('click', () => elevator.moveToFloor(1))
floor2Button.addEventListener('click', () => elevator.moveToFloor(2))
floor3Button.addEventListener('click', () => elevator.moveToFloor(3))
floor4Button.addEventListener('click', () => elevator.moveToFloor(4))