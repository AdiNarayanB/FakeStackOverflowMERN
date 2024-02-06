// ValidationFactory.js

class ValidationFactory {
  createValidation(type, ...args) {
    if (type === 'question') {
      return new QuestionValidation(...args);
    } else if (type === 'answer') {
      return new AnswerValidation(...args);
    } else {
      throw new Error('Invalid validation type');
    }
  }
}

export { ValidationFactory };

// QuestionValidation.js

class QuestionValidation {
  constructor(title, text, tags) {
    this.title = title;
    this.text = text;
    this.tags = tags;
  }

  validate() {
    if (this.title.trim() === '') {
      return 'Title cannot be empty';
    }
    if (this.title.length > 100) {
      return 'Title cannot be more than 100 characters';
    }
    if (this.text.trim() === '') {
      return 'Question text cannot be empty';
    }
    if (this.tags.length >= 5) {
      return 'Cannot have more than 5 tags';
    }
    for (const tag of this.tags) {
      if (tag.length > 20) {
        return 'New tag length cannot be more than 20';
      }
    }
    if (!this.text.includes('https://') && this.text.includes('http')) {
      return 'Invalid hyperlink';
    }
    return '';
  }
}

export { QuestionValidation };

// AnswerValidation.js

class AnswerValidation {
  constructor(answerText, username) {
    this.answerText = answerText;
    this.username = username;
  }

  validate() {
    if (!this.username) {
      return 'Username cannot be empty';
    }
    if (!this.answerText) {
      return 'Answer text cannot be empty';
    }
    if (!this.answerText.includes('https://') && this.answerText.includes('http')) {
      return 'Invalid hyperlink';
    }
    return '';
  }
}

export { AnswerValidation };

