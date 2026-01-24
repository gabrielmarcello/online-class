import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Settings {
  infiniteMode: boolean;
  roundCount: number;
}

interface Question {
  num1: number;
  num2: number;
  answer: number;
}

@Component({
  selector: 'app-multiplication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiplication.component.html',
  styleUrl: './multiplication.component.scss'
})
export class MultiplicationComponent implements OnInit {
  currentQuestion: Question | null = null;
  userAnswer: number | string = '';
  feedback: string = '';
  feedbackType: 'correct' | 'incorrect' | '' = '';
  showNextButton = false;
  
  correctCount = 0;
  incorrectCount = 0;
  currentRound = 0;
  totalRounds = 10;
  infiniteMode = false;
  
  sessionEnded = false;

  ngOnInit() {
    this.loadSettings();
    this.startNewSession();
    
    // Listen for settings changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'mathSettings') {
        this.loadSettings();
        this.startNewSession();
      }
    });
  }

  loadSettings() {
    const saved = localStorage.getItem('mathSettings');
    if (saved) {
      const settings: Settings = JSON.parse(saved);
      this.infiniteMode = settings.infiniteMode;
      this.totalRounds = settings.roundCount;
    }
  }

  generateQuestion() {
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 2;
    this.currentQuestion = {
      num1,
      num2,
      answer: num1 * num2
    };
  }

  submitAnswer() {
    if (!this.currentQuestion || this.userAnswer === '' || this.userAnswer === null || this.userAnswer === undefined || this.showNextButton) {
      return;
    }

    const userNum = typeof this.userAnswer === 'number' ? this.userAnswer : parseInt(this.userAnswer);
    
    if (userNum === this.currentQuestion.answer) {
      this.feedback = 'Correct!';
      this.feedbackType = 'correct';
      this.correctCount++;
    } else {
      this.feedback = `Ohh that's wrong, the correct answer is ${this.currentQuestion.answer}`;
      this.feedbackType = 'incorrect';
      this.incorrectCount++;
    }

    this.currentRound++;
    this.showNextButton = true;

    // Check if session should end
    if (!this.infiniteMode && this.currentRound >= this.totalRounds) {
      this.sessionEnded = true;
    }
  }

  nextQuestion() {
    this.userAnswer = '';
    this.feedback = '';
    this.feedbackType = '';
    this.showNextButton = false;
    this.generateQuestion();
  }

  startNewSession() {
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentRound = 0;
    this.sessionEnded = false;
    this.userAnswer = '';
    this.feedback = '';
    this.feedbackType = '';
    this.showNextButton = false;
    this.generateQuestion();
  }

  stopSession() {
    this.sessionEnded = true;
  }
}
