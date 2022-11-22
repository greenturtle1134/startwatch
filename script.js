/*
0 = paused
1 = good
2 = partial
3 = bad
*/

class Mark {
	constructor(cat) {
		this.time = Date.now();
		this.cat = cat;
	}
}

const { createApp } = Vue

createApp({
	data() {
		return {
			marks: [new Mark(0)]
		}
	},
	methods: {
		mark(x) {
			this.marks.push(new Mark(x));
		},
		resetMarks() {
			this.marks = [new Mark(0)];
		},
		undo() {
			if (this.marks.length > 1) {
				this.marks.pop();
			}
		},
		fTime(ms) {
			let s = Math.floor(ms/1000) % 60;
			let m = Math.floor(ms/(1000*60)) % 60;
			let h = Math.floor(ms/(1000*60*60));
			
			// return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
			return `${h.toString()}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
		},
		fPercent(p) {
			if (Number.isNaN(p)) {
				return "N/A";
			}
			else {
				return (100*p).toString().substring(0, 4)+"%";
			}
		}
	},
	computed: {
		totalTime() {
			let total = 0;
			for (let i = 1; i<this.marks.length; i++) {
				if (this.marks[i].cat != 0) {
					total += this.marks[i].time - this.marks[i-1].time;
				}
			}
			return total;
		},
		totalTime() {
			let total = 0;
			for (let i = 1; i<this.marks.length; i++) {
				if (this.marks[i].cat != 0) {
					total += this.marks[i].time - this.marks[i-1].time;
				}
			}
			return total;
		},
		lastInterval() {
			if (this.marks.length > 1) {
				return this.marks[this.marks.length-1].time - this.marks[this.marks.length-2].time;
			}
			else {
				return 0;
			}
		},
		minGood() {
			let total = 0;
			for (let i = 1; i<this.marks.length; i++) {
				if (this.marks[i].cat == 1) {
					total += this.marks[i].time - this.marks[i-1].time;
				}
			}
			return total;
		},
		maxGood() {
			let total = 0;
			for (let i = 1; i<this.marks.length; i++) {
				if (this.marks[i].cat == 1 || this.marks[i].cat == 2) {
					total += this.marks[i].time - this.marks[i-1].time;
				}
			}
			return total;
		}
	}
}).mount('#app')