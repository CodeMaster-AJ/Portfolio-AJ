/**
 * Terminal Popup Functionality for AJ's Portfolio
 * Interactive terminal that responds to commands
 */

// Terminal state
let terminalOpen = false;
let commandHistory = [];
let historyIndex = -1;
let currentInput = '';

// Terminal commands and responses
const commands = {
    help: {
        description: 'Show available commands',
        action: () => `
Available commands:
  <span class="text-cyan-400">help</span>        - Show this help message
  <span class="text-cyan-400">about</span>       - About AJ
  <span class="text-cyan-400">skills</span>      - List technical skills
  <span class="text-cyan-400">projects</span>    - Show recent projects
  <span class="text-cyan-400">contact</span>     - Get contact information
  <span class="text-cyan-400">social</span>      - Social media links
  <span class="text-cyan-400">resume</span>      - Download resume
  <span class="text-cyan-400">clear</span>       - Clear terminal
  <span class="text-cyan-400">exit</span>        - Close terminal
  <span class="text-cyan-400">whoami</span>      - Display current user
  <span class="text-cyan-400">pwd</span>         - Print working directory
  <span class="text-cyan-400">ls</span>          - List directory contents
  <span class="text-cyan-400">cat</span>         - Display file contents
  <span class="text-cyan-400">joke</span>        - Random programming joke
  <span class="text-cyan-400">quote</span>       - Inspirational quote
  <span class="text-cyan-400">time</span>        - Current date and time
        `
    },
    about: {
        description: 'About AJ',
        action: () => `
<span class="text-green-400">Amandeep Singh Jadhav (AJ) - Digital Alchemist</span>

Think Deadpool meets a Developer — funny, flashy, and slightly unstable (in a genius way).

<span class="text-cyan-400">The Origin Story:</span>
• Former YouTuber (650K+ subs) who pressed "reset"
• BTech CSE with AIML @ Akal University, Punjab
• Building cool stuff that makes people go "Damn, who built this?"

<span class="text-yellow-400">Current Roles:</span>
🎨 Canva Pro Designer
✍️ SEO Writer & Content Creator
🎬 Video Editor & Scriptwriter
🚀 Startup Co-Founder (Buyzzle, UniBuddy)
👨‍💻 Future Full Stack Dev

<span class="text-purple-400">Mission:</span> Make this portfolio unforgettable!
        `
    },
    skills: {
        description: 'List technical skills',
        action: () => `
<span class="text-blue-400">Technical Skills:</span>

<span class="text-yellow-400">Frontend:</span>
• React, Vue.js, Angular
• JavaScript (ES6+), TypeScript
• HTML5, CSS3, Sass/SCSS
• Tailwind CSS, Bootstrap
• Responsive Design

<span class="text-yellow-400">Backend:</span>
• Node.js, Express.js
• Python, FastAPI, Django
• RESTful APIs, GraphQL
• Microservices Architecture

<span class="text-yellow-400">Database:</span>
• MongoDB, PostgreSQL
• MySQL, Redis
• Database Design & Optimization

<span class="text-yellow-400">Tools & Others:</span>
• Git, GitHub, GitLab
• AWS, Docker, Kubernetes
• CI/CD Pipelines
• Agile Development
        `
    },
    projects: {
        description: 'Show recent projects',
        action: () => `
<span class="text-purple-400">My Digital Arsenal:</span>

<span class="text-cyan-400">1. Buyzzle</span>
   AI + shopping = chaos and genius combined
   Smart shopping platform that learns your preferences
   Tech: AI/ML, Flutter, Smart Algorithms
   Status: In Progress 🚀
   
<span class="text-cyan-400">2. UniBuddy</span>
   A utility app that helps students survive college
   Because we've all been there!
   Tech: Flutter, Student Life, Utility App
   Status: Active 📱
   
<span class="text-cyan-400">3. Content Creation Journey</span>
   650K+ YouTube subscribers, scriptwriting, video editing
   The journey that shaped my creative mind
   Tech: Video Editing, Content Strategy, Storytelling
   
<span class="text-cyan-400">4. Design & Brand Building</span>
   Canva Pro designs, visual storytelling, brand magic
   Making things look impossibly good
   Tech: Canva Pro, Design Thinking, Brand Strategy
   
<span class="text-cyan-400">5. Future Full Stack Projects</span>
   C++, Flutter, AI/ML explorations
   Building the next generation of applications
   Tech: C++, Flutter, AI/ML, Modern Web Technologies

Want to see them live? Check out the projects page!
        `
    },
    contact: {
        description: 'Get contact information',
        action: () => `
<span class="text-green-400">Contact Information:</span>

<span class="text-cyan-400">Email:</span>     contact@example.com
<span class="text-cyan-400">Phone:</span>     +1 (555) 123-4567
<span class="text-cyan-400">Location:</span>  Available Worldwide
<span class="text-cyan-400">Response:</span>  Usually within 24 hours

<span class="text-yellow-400">Professional Links:</span>
• GitHub: https://github.com/CodeMaster-AJ
• LinkedIn: https://linkedin.com/in/aj
• Portfolio: https://aj-portfolio.dev

Ready to collaborate on your next project! 🚀
        `
    },
    social: {
        description: 'Social media links',
        action: () => `
<span class="text-pink-400">Social Media:</span>

<span class="text-blue-400">🐙 GitHub:</span>     https://github.com/CodeMaster-AJ
<span class="text-blue-600">💼 LinkedIn:</span>   https://linkedin.com/in/aj
<span class="text-blue-400">🐦 Twitter:</span>    https://twitter.com/aj
<span class="text-red-500">📧 Email:</span>      contact@example.com

Let's connect and build something amazing together! ✨
        `
    },
    resume: {
        description: 'Download resume',
        action: () => {
            // In a real application, this would trigger a download
            return `
<span class="text-green-400">Resume Download:</span>

📄 Preparing resume download...
   └── <span class="text-yellow-400">AJ_Resume_2025.pdf</span>

<span class="text-red-400">Note:</span> In a live environment, this would automatically download the PDF.
For now, please visit the contact page to request the latest resume.

<span class="text-cyan-400">Quick Stats:</span>
• 3+ years experience
• 20+ projects completed
• Full-stack expertise
• Open to opportunities
            `;
        }
    },
    clear: {
        description: 'Clear terminal',
        action: 'clear'
    },
    exit: {
        description: 'Close terminal',
        action: 'exit'
    },
    whoami: {
        description: 'Display current user',
        action: () => 'visitor'
    },
    pwd: {
        description: 'Print working directory',
        action: () => '/home/visitor/aj-portfolio'
    },
    ls: {
        description: 'List directory contents',
        action: () => `
<span class="text-blue-400">drwxr-xr-x</span> 3 visitor visitor 4096 Jun 21 2025 <span class="text-blue-400">about/</span>
<span class="text-blue-400">drwxr-xr-x</span> 3 visitor visitor 4096 Jun 21 2025 <span class="text-blue-400">projects/</span>
<span class="text-blue-400">drwxr-xr-x</span> 3 visitor visitor 4096 Jun 21 2025 <span class="text-blue-400">contact/</span>
<span class="text-green-400">-rw-r--r--</span> 1 visitor visitor 2048 Jun 21 2025 <span class="text-green-400">README.md</span>
<span class="text-green-400">-rw-r--r--</span> 1 visitor visitor 1024 Jun 21 2025 <span class="text-green-400">skills.txt</span>
<span class="text-yellow-400">-rwxr-xr-x</span> 1 visitor visitor 512  Jun 21 2025 <span class="text-yellow-400">deploy.sh</span>
        `
    },
    cat: {
        description: 'Display file contents',
        action: (args) => {
            const file = args[0];
            const files = {
                'README.md': `
<span class="text-cyan-400"># AJ's Portfolio</span>

Welcome to my personal portfolio website! 🚀

This site showcases my projects, skills, and experience as a full-stack developer.
Built with modern web technologies and featuring a futuristic glassmorphism design.

<span class="text-yellow-400">## Tech Stack</span>
- HTML5 & CSS3
- Tailwind CSS
- Vanilla JavaScript
- Responsive Design

<span class="text-yellow-400">## Features</span>
- Interactive terminal (you're using it now!)
- Smooth animations
- Project filtering
- Contact form with validation
- Mobile-first responsive design

Type 'help' for available commands.
                `,
                'skills.txt': `
JavaScript     ████████████████████ 95%
React          ████████████████████ 90%
Node.js        ██████████████████   88%
Python         █████████████████    85%
MongoDB        █████████████████    85%
PostgreSQL     ████████████████     80%
Vue.js         ███████████████      75%
AWS            █████████████        65%
                `,
                'deploy.sh': `
#!/bin/bash
echo "🚀 Deploying AJ's Portfolio..."
npm run build
echo "✅ Build complete!"
aws s3 sync ./dist s3://aj-portfolio-bucket
echo "🌐 Deployed to production!"
                `
            };
            
            if (!file) {
                return '<span class="text-red-400">cat: missing file operand</span>\nUsage: cat [filename]';
            }
            
            if (files[file]) {
                return files[file];
            } else {
                return `<span class="text-red-400">cat: ${file}: No such file or directory</span>`;
            }
        }
    },
    joke: {
        description: 'Random programming joke',
        action: () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                "Why do Java programmers wear glasses? Because they can't C# ! 👓",
                "What's a programmer's favorite hangout place? Foo Bar! 🍺",
                "Why did the programmer quit his job? He didn't get arrays! 📊",
                "What do you call a programmer from Finland? Nerdic! 🇫🇮",
                "Why do programmers hate nature? It has too many bugs! 🌿",
                "What's the object-oriented way to become wealthy? Inheritance! 💰"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
    },
    quote: {
        description: 'Inspirational quote',
        action: () => {
            const quotes = [
                '"The best way to predict the future is to invent it." - Alan Kay',
                '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                '"First, solve the problem. Then, write the code." - John Johnson',
                '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
                '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
                '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
                '"Make it work, make it right, make it fast." - Kent Beck',
                '"Clean code always looks like it was written by someone who cares." - Robert C. Martin'
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
    },
    time: {
        description: 'Current date and time',
        action: () => {
            const now = new Date();
            return `
<span class="text-green-400">Current Date & Time:</span>

📅 Date: ${now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})}

🕐 Time: ${now.toLocaleTimeString('en-US', { 
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})}

🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
            `;
        }
    }
};

// Initialize terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    initTerminal();
});

function initTerminal() {
    // Listen for 'J' key to open terminal
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'j' && !terminalOpen && !isInputFocused()) {
            e.preventDefault();
            openTerminal();
        }
        
        if (e.key === 'Escape' && terminalOpen) {
            closeTerminal();
        }
    });
    
    // Close terminal when clicking the close button
    const closeBtn = document.getElementById('terminal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTerminal);
    }
    
    // Close terminal when clicking outside
    const terminalPopup = document.getElementById('terminal-popup');
    if (terminalPopup) {
        terminalPopup.addEventListener('click', function(e) {
            if (e.target === terminalPopup) {
                closeTerminal();
            }
        });
    }
}

function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
    );
}

function openTerminal() {
    const terminalPopup = document.getElementById('terminal-popup');
    const terminalBody = document.getElementById('terminal-body');
    
    if (terminalPopup && terminalBody) {
        terminalOpen = true;
        terminalPopup.classList.remove('hidden');
        
        // Clear previous content and show welcome message
        terminalBody.innerHTML = '';
        addTerminalLine('> Accessing AJ\'s Digital Matrix...', 'success');
        addTerminalLine('> Connection established 🔗', 'success');
        addTerminalLine('Welcome to the chaos! Type "help" for available commands.', 'output');
        addTerminalLine('This is where the magic happens ✨', 'output');
        addTerminalLine('', 'output');
        
        createInputLine();
        
        // Focus the terminal
        const inputElement = terminalBody.querySelector('.terminal-input');
        if (inputElement) {
            setTimeout(() => inputElement.focus(), 100);
        }
    }
}

function closeTerminal() {
    const terminalPopup = document.getElementById('terminal-popup');
    if (terminalPopup) {
        terminalOpen = false;
        terminalPopup.classList.add('hidden');
    }
}

function createInputLine() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;
    
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line flex items-center';
    inputLine.innerHTML = `
        <span class="terminal-prompt">visitor@aj-portfolio:~$</span>
        <input type="text" class="terminal-input bg-transparent border-none outline-none text-green-400 ml-2 flex-1" autocomplete="off" spellcheck="false">
        <span class="terminal-cursor"></span>
    `;
    
    terminalBody.appendChild(inputLine);
    
    const inputElement = inputLine.querySelector('.terminal-input');
    if (inputElement) {
        inputElement.addEventListener('keydown', handleTerminalInput);
        inputElement.focus();
    }
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function handleTerminalInput(e) {
    const input = e.target;
    const command = input.value.trim();
    
    if (e.key === 'Enter') {
        if (command) {
            // Add command to history
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            // Show the command in terminal
            addTerminalLine(`visitor@aj-portfolio:~$ ${command}`, 'input');
            
            // Execute command
            executeCommand(command);
        } else {
            addTerminalLine('visitor@aj-portfolio:~$', 'input');
        }
        
        // Create new input line
        createInputLine();
        
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        // Auto-complete command
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(command.toLowerCase()));
        if (matches.length === 1) {
            input.value = matches[0];
        }
    }
}

function executeCommand(commandLine) {
    const args = commandLine.trim().split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);
    
    if (commands[command]) {
        const result = commands[command].action;
        
        if (result === 'clear') {
            clearTerminal();
        } else if (result === 'exit') {
            closeTerminal();
        } else if (typeof result === 'function') {
            const output = result(commandArgs);
            addTerminalLine(output, 'output');
        } else {
            addTerminalLine(result, 'output');
        }
    } else if (command === 'visit') {
        handleVisitCommand(commandArgs);
    } else if (command === 'open') {
        handleOpenCommand(commandArgs);
    } else if (command === '') {
        // Empty command, do nothing
    } else {
        addTerminalLine(`Command not found: ${command}`, 'error');
        addTerminalLine('Type "help" for available commands.', 'output');
    }
}

function handleVisitCommand(args) {
    const page = args[0];
    const pages = {
        'home': 'index.html',
        'about': 'about.html',
        'projects': 'projects.html',
        'contact': 'contact.html'
    };
    
    if (page && pages[page]) {
        addTerminalLine(`Navigating to ${page} page...`, 'success');
        setTimeout(() => {
            window.location.href = pages[page];
        }, 1000);
    } else {
        addTerminalLine('Available pages: home, about, projects, contact', 'output');
    }
}

function handleOpenCommand(args) {
    const link = args[0];
    const links = {
        'github': 'https://github.com/CodeMaster-AJ',
        'linkedin': 'https://linkedin.com/in/aj',
        'twitter': 'https://twitter.com/aj',
        'email': 'mailto:contact@example.com'
    };
    
    if (link && links[link]) {
        addTerminalLine(`Opening ${link}...`, 'success');
        setTimeout(() => {
            window.open(links[link], '_blank');
        }, 500);
    } else {
        addTerminalLine('Available links: github, linkedin, twitter, email', 'output');
    }
}

function addTerminalLine(content, type = 'output') {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;
    
    // Remove the current input line
    const currentInput = terminalBody.querySelector('.terminal-input');
    if (currentInput) {
        currentInput.parentElement.remove();
    }
    
    const line = document.createElement('div');
    line.className = `terminal-line terminal-${type}`;
    
    if (type === 'input') {
        line.innerHTML = content;
    } else {
        line.innerHTML = content;
    }
    
    terminalBody.appendChild(line);
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function clearTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        terminalBody.innerHTML = '';
        addTerminalLine('Terminal cleared.', 'success');
        createInputLine();
    }
}

// Easter eggs and hidden commands
const hiddenCommands = {
    'sudo': () => 'Nice try! But you\'re not root here. 😄',
    'rm -rf /': () => 'Are you trying to break my portfolio? Not happening! 😅',
    'hack': () => 'Access denied! This is a legitimate portfolio site. 🔒',
    'matrix': () => `
<span style="color: #00ff00; font-family: monospace;">
Wake up, Neo... 
The Matrix has you...
Follow the white rabbit...
</span>
    `,
    'konami': () => 'Up, Up, Down, Down, Left, Right, Left, Right, B, A... Code unlocked! 🎮',
    'hello': () => 'Hello there! Thanks for checking out my terminal. 👋',
    'coffee': () => '☕ Virtual coffee served! Perfect for coding sessions.',
    'pizza': () => '🍕 Pizza is the fuel of programmers! Bon appétit!',
    'github': () => {
        window.open('https://github.com/CodeMaster-AJ', '_blank');
        return 'Opening GitHub profile...';
    }
};

// Add hidden commands to main commands object
Object.assign(commands, Object.fromEntries(
    Object.entries(hiddenCommands).map(([key, value]) => [
        key, 
        { description: 'Hidden command', action: value }
    ])
));

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        executeCommand,
        commands,
        openTerminal,
        closeTerminal
    };
}
