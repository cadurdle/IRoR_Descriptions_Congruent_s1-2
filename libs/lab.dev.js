// lab.dev.js - Enhanced Script for Lab.js

window.lab = (function () {
    class Component {
        constructor(options = {}) {
            Object.assign(this, options);
        }

        async run() {
            console.log(`Running component: ${this.title}`);
            if (this.content && typeof this.content.run === 'function') {
                await this.content.run();
            }
        }
    }

    class Sequence extends Component {
        constructor(options = {}) {
            super(options);
            this.content = this.content || [];
        }

        async run() {
            console.log("Running sequence");
            for (let component of this.content) {
                await component.run();
            }
        }
    }

    class Screen extends Component {
        constructor(options = {}) {
            super(options);
            this.content = this.content || '';
        }

        async run() {
            console.log(`Showing screen: ${this.title}`);
            const body = document.body;
            body.innerHTML = this.content;
            await new Promise(resolve => setTimeout(resolve, this.duration || 1000));
        }
    }

    return {
        flow: {
            Sequence: Sequence,
            Screen: Screen
        }
    };
})();

// Example usage (if needed):
const intro = new lab.flow.Screen({
    title: 'Introduction',
    content: '<h1>Welcome to the experiment!</h1>',
    duration: 2000
});

const instructions = new lab.flow.Screen({
    title: 'Instructions',
    content: '<p>Here are your instructions...</p>',
    duration: 3000
});

const sequence = new lab.flow.Sequence({
    content: [intro, instructions]
});

sequence.run();
