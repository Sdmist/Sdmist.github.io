// IDE Configuration
const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_KEY = ''; // Users will need to get their own free key

const LANGUAGE_IDS = {
    python: 71,   // Python 3
    cpp: 54,      // C++ 17
    c: 50,        // C
    java: 62,     // Java
    rust: 73      // Rust
};

const DEFAULT_CODE = {
    python: `# Python Code Editor
# Write your code here

def main():
    name = input("Enter your name: ")
    print(f"Hello, {name}!")
    print("Sum of 1 to 10:", sum(range(1, 11)))

if __name__ == "__main__":
    main()`,
    
    cpp: `// C++ Code Editor
// Write your code here

#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    
    int sum = 0;
    for(int i = 1; i <= 10; i++) {
        sum += i;
    }
    cout << "Sum of 1 to 10: " << sum << endl;
    return 0;
}`,
    
    c: `// C Code Editor
// Write your code here

#include <stdio.h>
#include <string.h>

int main() {
    char name[100];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\\n")] = 0;
    printf("Hello, %s!\\n", name);
    
    int sum = 0;
    for(int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("Sum of 1 to 10: %d\\n", sum);
    return 0;
}`,
    
    java: `// Java Code Editor
// Write your code here

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        
        int sum = 0;
        for(int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum of 1 to 10: " + sum);
        scanner.close();
    }
}`,
    
    rust: `// Rust Code Editor
// Write your code here

use std::io;

fn main() {
    println!("Enter your name: ");
    let mut name = String::new();
    io::stdin().read_line(&mut name).unwrap();
    let name = name.trim();
    println!("Hello, {}!", name);
    
    let sum: i32 = (1..=10).sum();
    println!("Sum of 1 to 10: {}", sum);
}`,
    
    iylira: `# Iylira Code Editor
# This is a custom language - editor only

#invite math

let name = read("Enter your name: ")
whisper("Hello, " + name + "!")

let sum = 0
drift i through range(1, 11):
    sum = sum + i

whisper("Sum of 1 to 10: ", sum)`
};

let editor;
let pyodide;
let currentLanguage = 'python';

// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: DEFAULT_CODE.python,
        language: 'python',
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on'
    });
    
    initializePyodide();
});

// Load Pyodide for Python execution
async function initializePyodide() {
    try {
        showOutput('Loading Python environment...', 'info');
        pyodide = await loadPyodide();
        showOutput('✅ Python ready! You can run Python code unlimited times.', 'success');
    } catch (error) {
        showOutput('⚠️ Python failed to load. Python execution will not work.\nError: ' + error.message, 'error');
    }
}

// Event Listeners
document.getElementById('languageSelect').addEventListener('change', function(e) {
    currentLanguage = e.target.value;
    changeLanguage(currentLanguage);
});

document.getElementById('themeSelect').addEventListener('change', function(e) {
    monaco.editor.setTheme(e.target.value);
});

document.getElementById('runBtn').addEventListener('click', runCode);

document.getElementById('clearOutput').addEventListener('click', function() {
    document.getElementById('output').innerHTML = `
        <div class="output-placeholder">
            <span class="output-icon">⚡</span>
            <p>Run your code to see output here</p>
        </div>
    `;
});

// Change Language
function changeLanguage(lang) {
    const langMap = {
        python: 'python',
        cpp: 'cpp',
        c: 'c',
        java: 'java',
        rust: 'rust',
        iylira: 'plaintext'
    };
    
    editor.setValue(DEFAULT_CODE[lang] || '');
    monaco.editor.setModelLanguage(editor.getModel(), langMap[lang]);
    
    // Update language info
    const langNames = {
        python: 'Python (Unlimited)',
        cpp: 'C++ 17',
        c: 'C (GCC)',
        java: 'Java',
        rust: 'Rust',
        iylira: 'Iylira (Editor Only)'
    };
    
    document.getElementById('langInfo').textContent = langNames[lang];
    
    // Show/hide API limit warning
    const apiLimit = document.getElementById('apiLimit');
    if (['cpp', 'c', 'java', 'rust'].includes(lang)) {
        apiLimit.style.display = 'inline';
    } else {
        apiLimit.style.display = 'none';
    }
    
    // Disable run button for Iylira
    const runBtn = document.getElementById('runBtn');
    if (lang === 'iylira') {
        runBtn.disabled = true;
        runBtn.textContent = 'No Compiler Available';
        showOutput('ℹ️ Iylira is a custom language without a compiler yet.\nEditor is available for writing code only.', 'info');
    } else {
        runBtn.disabled = false;
        runBtn.innerHTML = '<span class="run-icon">▶</span> Run Code';
    }
}

// Run Code
async function runCode() {
    const code = editor.getValue();
    const input = document.getElementById('input').value;
    
    if (!code.trim()) {
        showOutput('⚠️ Please write some code first!', 'error');
        return;
    }
    
    const runBtn = document.getElementById('runBtn');
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
    
    try {
        if (currentLanguage === 'python') {
            await runPython(code, input);
        } else if (['cpp', 'c', 'java', 'rust'].includes(currentLanguage)) {
            await runWithJudge0(code, input);
        }
    } catch (error) {
        showOutput('❌ Error: ' + error.message, 'error');
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '<span class="run-icon">▶</span> Run Code';
    }
}

// Run Python with Pyodide
async function runPython(code, input) {
    if (!pyodide) {
        showOutput('❌ Python is not loaded. Please refresh the page.', 'error');
        return;
    }
    
    try {
        showOutput('Running Python code...', 'info');
        
        // Set up stdin
        if (input) {
            pyodide.runPython(`
import sys
from io import StringIO
sys.stdin = StringIO("""${input.replace(/"/g, '\\"')}""")
            `);
        }
        
        // Capture stdout
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        
        // Run user code
        pyodide.runPython(code);
        
        // Get output
        const output = pyodide.runPython('sys.stdout.getvalue()');
        
        if (output) {
            showOutput('✅ Output:\n\n' + output, 'success');
        } else {
            showOutput('✅ Program executed successfully (no output)', 'success');
        }
    } catch (error) {
        showOutput('❌ Python Error:\n\n' + error.message, 'error');
    }
}

// Run with Judge0 API
async function runWithJudge0(code, input) {
    if (!JUDGE0_KEY) {
        showOutput(`⚠️ Judge0 API key not configured!

To run ${currentLanguage.toUpperCase()} code, you need a free Judge0 API key:

1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up for free (50 requests/day)
3. Get your API key
4. Add it to ide.js (line 3)

For now, you can:
- Use Python (unlimited, runs in browser)
- Use this editor to write/view code`, 'error');
        return;
    }
    
    showOutput('Submitting to Judge0... (this may take a few seconds)', 'info');
    
    try {
        const languageId = LANGUAGE_IDS[currentLanguage];
        
        // Create submission
        const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': JUDGE0_KEY,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: code,
                stdin: input || ''
            })
        });
        
        const result = await response.json();
        
        if (result.stdout) {
            showOutput('✅ Output:\n\n' + result.stdout, 'success');
        } else if (result.stderr) {
            showOutput('❌ Error:\n\n' + result.stderr, 'error');
        } else if (result.compile_output) {
            showOutput('❌ Compilation Error:\n\n' + result.compile_output, 'error');
        } else if (result.message) {
            showOutput('⚠️ ' + result.message, 'error');
        } else {
            showOutput('✅ Program executed successfully (no output)', 'success');
        }
    } catch (error) {
        showOutput('❌ Failed to execute code:\n\n' + error.message + '\n\nPlease check your internet connection.', 'error');
    }
}

// Show Output
function showOutput(text, type = 'info') {
    const outputDiv = document.getElementById('output');
    const className = type === 'error' ? 'output-error' : type === 'success' ? 'output-success' : '';
    outputDiv.innerHTML = `<div class="${className}">${text}</div>`;
    outputDiv.scrollTop = 0;
}
