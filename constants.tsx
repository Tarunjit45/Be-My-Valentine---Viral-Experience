
import React from 'react';
import { Compliment, QuizOption } from './types';

export const COMPLIMENTS: Compliment[] = [
  { text: "You’re cuter than 1000 kittens 🐱", emoji: "💖" },
  { text: "My heart skips when you smile 💓", emoji: "✨" },
  { text: "You + Me = Forever ✨", emoji: "💍" },
  { text: "You're the marshmallows to my hot cocoa ☕", emoji: "☁️" },
  { text: "My favorite place is inside your hug 🤗", emoji: "🧸" },
  { text: "You make every day feel like Valentine's 🎀", emoji: "🌹" },
  { text: "You're the main character in my love story 📖", emoji: "📽️" }
];

export const QUIZ_OPTIONS: QuizOption[] = [
  { label: "Infinity ♾️", value: "infinity" },
  { label: "More than pizza 🍕", value: "pizza" },
  { label: "Till the stars fade 🌌", value: "stars" },
  { label: "To the moon and back 🌙", value: "moon" }
];

export const NO_MESSAGES = [
  "Wait, what? 😳",
  "Are you sure? 💔",
  "Think again... 🥺",
  "Nope, not allowed! 🚫",
  "Error: Button broken, try Yes 😜",
  "Is that your final answer? 😰",
  "Stop teasing me! 😤"
];
