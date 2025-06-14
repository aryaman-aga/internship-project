// Main application controller
class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 80;
        this.speed = 3;
        this.isAnimating = false;
        this.animationSpeed = 50;
        this.algorithmComplexities = {
            bubble: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n)',
                spaceWorst: 'O(1)'
            },
            selection: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n²)',
                spaceWorst: 'O(1)'
            },
            insertion: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n)',
                spaceWorst: 'O(1)'
            },
            merge: {
                timeWorst: 'O(n log n)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(n)'
            },
            quick: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(log n)'
            },
            heap: {
                timeWorst: 'O(n log n)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(1)'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateArray();
        this.updateSpeedDisplay();
    }

    setupEventListeners() {
        // Array size slider
        const arraySizeSlider = document.getElementById('arraySize');
        arraySizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('arraySizeValue').textContent = this.arraySize;
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        // Speed slider
        const speedSlider = document.getElementById('speed');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.updateSpeedDisplay();
        });

        // Generate array button
        const generateBtn = document.getElementById('generateArray');
        generateBtn.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        // Algorithm buttons
        const algoButtons = document.querySelectorAll('.algo-btn');
        algoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isAnimating) {
                    const algorithm = e.target.dataset.algo;
                    this.startSorting(algorithm);
                }
            });
        });
    }

    generateArray() {
        this.array = [];
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';

        // Generate random array
        for (let i = 0; i < this.arraySize; i++) {
            const value = Math.floor(Math.random() * 350) + 10;
            this.array.push(value);
        }

        // Create visual bars
        this.renderArray();
        this.clearComplexityInfo();
        this.updateStatus('Array generated. Select an algorithm to start sorting.');
    }

    renderArray() {
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';

        const containerWidth = container.offsetWidth - 40; // Account for padding
        const barWidth = Math.max(2, (containerWidth / this.arraySize) - 2);

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${value}px`;
            bar.style.width = `${barWidth}px`;
            bar.dataset.index = index;
            bar.dataset.value = value;
            container.appendChild(bar);
        });
    }

    updateSpeedDisplay() {
        document.getElementById('speedValue').textContent = this.speed;
        // Much faster animation speed - minimal delays
        this.animationSpeed = Math.max(1, 20 - (this.speed * 3));
    }

    async startSorting(algorithm) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.disableControls();
        this.highlightSelectedAlgorithm(algorithm);
        this.displayComplexity(algorithm);
        this.updateStatus(`Sorting with ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort...`);

        // Reset array visualization
        this.resetBarStyles();

        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'heap':
                    await this.heapSort();
                    break;
            }

            // Mark all bars as sorted
            await this.markAllSorted();
            this.updateStatus('Sorting completed!');
        } catch (error) {
            console.error('Sorting error:', error);
            this.updateStatus('Sorting interrupted.');
        }

        this.isAnimating = false;
        this.enableControls();
        this.clearAlgorithmSelection();
    }

    disableControls() {
        document.getElementById('arraySize').disabled = true;
        document.getElementById('generateArray').disabled = true;
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.add('disabled');
        });
    }

    enableControls() {
        document.getElementById('arraySize').disabled = false;
        document.getElementById('generateArray').disabled = false;
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('disabled');
        });
    }

    highlightSelectedAlgorithm(algorithm) {
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-algo="${algorithm}"]`).classList.add('selected');
    }

    clearAlgorithmSelection() {
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    displayComplexity(algorithm) {
        const complexity = this.algorithmComplexities[algorithm];
        document.getElementById('timeWorst').textContent = complexity.timeWorst;
        document.getElementById('timeAverage').textContent = complexity.timeAverage;
        document.getElementById('timeBest').textContent = complexity.timeBest;
        document.getElementById('spaceWorst').textContent = complexity.spaceWorst;
    }

    clearComplexityInfo() {
        document.getElementById('timeWorst').textContent = '-';
        document.getElementById('timeAverage').textContent = '-';
        document.getElementById('timeBest').textContent = '-';
        document.getElementById('spaceWorst').textContent = '-';
    }

    updateStatus(message) {
        document.getElementById('statusText').textContent = message;
    }

    resetBarStyles() {
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.className = 'array-bar';
        });
    }

    async markAllSorted() {
        const bars = document.querySelectorAll('.array-bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.add('sorted');
            await this.sleep(1); // Very fast completion
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility method to swap array elements and update visualization
    async swap(i, j) {
        if (i === j) return;

        // Swap in array
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];

        // Update visualization instantly
        const bars = document.querySelectorAll('.array-bar');
        const bar1 = bars[i];
        const bar2 = bars[j];

        // Add swapping color
        bar1.classList.add('swapping');
        bar2.classList.add('swapping');

        // Update heights
        bar1.style.height = `${this.array[i]}px`;
        bar2.style.height = `${this.array[j]}px`;

        await this.sleep(this.animationSpeed);

        // Remove swapping color
        bar1.classList.remove('swapping');
        bar2.classList.remove('swapping');
    }

    // Utility method to highlight bars being compared
    async compare(i, j) {
        const bars = document.querySelectorAll('.array-bar');
        
        // Clear previous comparisons
        bars.forEach(bar => bar.classList.remove('comparing'));
        
        // Highlight current comparison
        if (i < bars.length) bars[i].classList.add('comparing');
        if (j < bars.length) bars[j].classList.add('comparing');

        await this.sleep(this.animationSpeed);
    }

    // Utility method to mark a bar as pivot
    markPivot(index) {
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => bar.classList.remove('pivot'));
        if (index < bars.length) {
            bars[index].classList.add('pivot');
        }
    }

    // Utility method to clear all highlighting
    clearHighlighting() {
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'pivot');
        });
    }
}

// Initialize the application
let visualizer;
document.addEventListener('DOMContentLoaded', () => {
    visualizer = new SortingVisualizer();
});
