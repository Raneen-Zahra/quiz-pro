// lib/quizData.ts

export interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

export interface Quiz {
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    timeLimit: number;
    totalPoints: number;
    questions: Question[];
}

export const beginnerQuiz: Quiz = {
    title: "Mathematics Quiz",
    difficulty: "beginner",
    timeLimit: 900,
    totalPoints: 100,
    questions: [
        { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correct: 2, explanation: "5 + 3 equals 8." },
        { question: "What is 10 - 4?", options: ["5", "6", "7", "8"], correct: 1, explanation: "10 - 4 equals 6." },
        { question: "What is 2 × 5?", options: ["8", "10", "12", "15"], correct: 1, explanation: "2 × 5 equals 10." },
        { question: "What is 20 ÷ 4?", options: ["4", "5", "6", "7"], correct: 1, explanation: "20 ÷ 4 equals 5." },
        { question: "What is the value of π (pi) approximately?", options: ["2.14", "3.14", "4.14", "5.14"], correct: 1, explanation: "π is approximately 3.14." },
        { question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correct: 1, explanation: "A triangle has 3 sides." },
        { question: "What is 15 + 25?", options: ["35", "40", "45", "50"], correct: 1, explanation: "15 + 25 equals 40." },
        { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], correct: 2, explanation: "The square root of 16 is 4." },
        { question: "What is 100 - 55?", options: ["40", "45", "50", "55"], correct: 1, explanation: "100 - 55 equals 45." },
        { question: "What is 7 × 3?", options: ["18", "21", "24", "27"], correct: 1, explanation: "7 × 3 equals 21." }
    ]
};

export const intermediateQuiz: Quiz = {
    title: "Science Quiz",
    difficulty: "intermediate",
    timeLimit: 1200,
    totalPoints: 150,
    questions: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], correct: 0, explanation: "Water is H2O – two hydrogen atoms and one oxygen atom." },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1, explanation: "Mars appears reddish due to iron oxide on its surface." },
        { question: "What is the speed of light in vacuum?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"], correct: 0, explanation: "Speed of light ≈ 3 × 10⁸ m/s." },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], correct: 2, explanation: "Mitochondria generate most of the cell's energy." },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2, explanation: "Plants absorb CO2 for photosynthesis." },
        { question: "Which element has the chemical symbol 'Au'?", options: ["Silver", "Gold", "Aluminum", "Argon"], correct: 1, explanation: "'Au' stands for Gold." },
        { question: "What is the largest organ in the human body?", options: ["Heart", "Brain", "Liver", "Skin"], correct: 3, explanation: "The skin is the largest organ." },
        { question: "How many bones are in the adult human body?", options: ["196", "206", "216", "226"], correct: 1, explanation: "Adults have 206 bones." },
        { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 2, explanation: "Nitrogen makes up about 78% of the atmosphere." },
        { question: "What is the freezing point of water in Celsius?", options: ["-10°C", "0°C", "10°C", "32°C"], correct: 1, explanation: "Water freezes at 0°C." },
        { question: "Which blood type is known as the universal donor?", options: ["A+", "B+", "AB+", "O-"], correct: 3, explanation: "O- can be given to all blood types." },
        { question: "What is the smallest unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correct: 2, explanation: "The cell is the smallest independent unit of life." },
        { question: "Which planet is the largest in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], correct: 1, explanation: "Jupiter is the largest planet." },
        { question: "What is the pH value of pure water?", options: ["5", "6", "7", "8"], correct: 2, explanation: "Pure water has a pH of 7 (neutral)." },
        { question: "What type of energy does the sun primarily emit?", options: ["Nuclear", "Chemical", "Thermal and Light", "Mechanical"], correct: 2, explanation: "The sun emits thermal and light energy." }
    ]
};

export const advancedQuiz: Quiz = {
    title: "Programming Quiz",
    difficulty: "advanced",
    timeLimit: 1800,
    totalPoints: 200,
    questions: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 0, explanation: "CSS = Cascading Style Sheets, used to style web pages." },
        { question: "Which programming language is known as the 'language of the web'?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2, explanation: "JavaScript is the language of the web." },
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0, explanation: "HTML = Hyper Text Markup Language." },
        { question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Tree"], correct: 1, explanation: "Stack uses LIFO principle." },
        { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, explanation: "Binary search has O(log n) time complexity." },
        { question: "Which of these is NOT a JavaScript framework?", options: ["React", "Angular", "Vue", "Django"], correct: 3, explanation: "Django is a Python framework." },
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "System Quality Language", "Standard Query Logic"], correct: 0, explanation: "SQL = Structured Query Language." },
        { question: "In OOP, what is encapsulation?", options: ["Hiding implementation details", "Creating multiple instances", "Inheriting from parent class", "Executing code repeatedly"], correct: 0, explanation: "Encapsulation hides internal state, exposing only a public interface." },
        { question: "What is the purpose of a constructor in a class?", options: ["To destroy objects", "To initialize objects", "To copy objects", "To compare objects"], correct: 1, explanation: "A constructor initializes objects when created." },
        { question: "Which HTTP method is used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], correct: 2, explanation: "PUT updates an existing resource." },
        { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Process Integration", "Application Process Interface"], correct: 0, explanation: "API = Application Programming Interface." },
        { question: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], correct: 1, explanation: "Merge Sort has O(n log n) average time complexity." },
        { question: "What is a callback function in JavaScript?", options: ["A function that calls itself", "A function passed as an argument", "A function that returns nothing", "A built-in JavaScript function"], correct: 1, explanation: "A callback is a function passed as an argument to another function." },
        { question: "What does MVC stand for in software architecture?", options: ["Model View Controller", "Main Value Component", "Multiple View Container", "Module Vector Control"], correct: 0, explanation: "MVC = Model View Controller design pattern." },
        { question: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2, explanation: "MongoDB is a NoSQL database." },
        { question: "What is the difference between '==' and '===' in JavaScript?", options: ["No difference", "=== checks type and value, == checks only value", "== is faster than ===", "=== is deprecated"], correct: 1, explanation: "'===' checks both type and value; '==' performs type coercion." },
        { question: "What is Git used for?", options: ["Database management", "Version control", "Web hosting", "Code compilation"], correct: 1, explanation: "Git is a version control system." },
        { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Management", "Digital Operation Method", "Document Orientation Mode"], correct: 0, explanation: "DOM = Document Object Model." },
        { question: "Which principle suggests a class should have only one reason to change?", options: ["Open/Closed Principle", "Single Responsibility Principle", "Liskov Substitution Principle", "Dependency Inversion Principle"], correct: 1, explanation: "Single Responsibility Principle – one class, one job." },
        { question: "What is the purpose of async/await in JavaScript?", options: ["To make code run faster", "To handle asynchronous operations", "To create animations", "To debug code"], correct: 1, explanation: "async/await handles asynchronous operations cleanly." }
    ]
};

export function getQuizByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Quiz | null {
    switch (difficulty) {
        case 'beginner':
            return beginnerQuiz;
        case 'intermediate':
            return intermediateQuiz;
        case 'advanced':
            return advancedQuiz;
        default:
            return null;
    }
}