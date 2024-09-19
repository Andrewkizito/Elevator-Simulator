class Elevator {
  // UI Elements
  private elevatorEl: HTMLDivElement = document.getElementById(
    "elevator"
  ) as HTMLDivElement;

  // State
  private currentFloor: number = 1;
  private isMoving: boolean = false;
  private logs: Array<{
    time: Date;
    from: number;
    to: number
  }> = [];
  private queue: Set<number> = new Set();

  async moveToFloor(nextFloor: number) {
    if (this.isMoving) {
      this.addQueue(nextFloor);
      return;
    }

    if (this.currentFloor === nextFloor) return;

    // Move Elevator
    this.updateMovingState();

    const height = (nextFloor - 1) * 100;
    const tripDuration = Math.abs(this.currentFloor - nextFloor) * 2000;

    this.elevatorEl.style.transition = `transform ${tripDuration}ms linear`;
    this.elevatorEl.style.transform = `translateY(-${height}%)`;

    // Update Floor
    setTimeout(() => {
      this.updateLogs(nextFloor);
      this.currentFloor = nextFloor;
      this.updateMovingState();

      if (this.queue.size) {
        const nextFloor = this.getClosestFloor()
        if (nextFloor.floor) {
          this.queue.delete(nextFloor.floor)
          this.moveToFloor(nextFloor.floor)
        }
      }
    }, tripDuration + 1000);
  }

  private updateMovingState() {
    const movingIndicatorEl: HTMLDivElement = document.getElementById(
      "moving-indicator"
    ) as HTMLDivElement;

    this.isMoving = !this.isMoving;
    if (!this.isMoving) {
      movingIndicatorEl.style.backgroundColor = "gray";
    } else {
      movingIndicatorEl.style.backgroundColor = "green";
    }
  }

  private updateLogs(nextFloor: number) {
    this.logs.push({ time: new Date(), from: this.currentFloor, to: nextFloor });

    const logsDiv: HTMLDivElement = document.getElementById(
      "logs"
    ) as HTMLDivElement;

    logsDiv.innerHTML = this.logs.map(log => `
      <p class="text-white text-xs">
        <span class="font-semibold">${log.time.toLocaleTimeString()}</span> Moved from floor #${log.from} to floor #${log.to}
      </p>`).join('');
  }

  private addQueue(floor: number) {
    if (this.queue.has(floor) || this.queue.size === 4) return;

    this.queue.add(floor);
  }

  private getClosestFloor() {
    const closestFloor: {
      floor: number | null,
      diff: number
    } = {
      floor: null,
      diff: Infinity
    }

    Array.from(this.queue).forEach(floor => {
      const distanceDifference = Math.abs(floor - this.currentFloor)
      if (distanceDifference < closestFloor.diff) {
        closestFloor.diff = distanceDifference
        closestFloor.floor = floor
      }
    })

    return closestFloor
  }
}

// Create Elevator
const elevator = new Elevator();

// Floor Control
const floor1Button = document.getElementById("floor-1") as HTMLButtonElement;
const floor2Button = document.getElementById("floor-2") as HTMLButtonElement;
const floor3Button = document.getElementById("floor-3") as HTMLButtonElement;
const floor4Button = document.getElementById("floor-4") as HTMLButtonElement;

// Listen for floor buttons
floor1Button.addEventListener("click", () => elevator.moveToFloor(1));
floor2Button.addEventListener("click", () => elevator.moveToFloor(2));
floor3Button.addEventListener("click", () => elevator.moveToFloor(3));
floor4Button.addEventListener("click", () => elevator.moveToFloor(4));




