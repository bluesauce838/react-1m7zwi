import React from 'react';
import './style.css';

export default function App() {
  console.clear();

  class Stack {
    constructor() {
      this.items = [];
      this.length = 0;
      this.push = function (element) {
        this.items.push(element);
        this.length++;
      };
      this.pop = function () {
        if (this.length == 0) return -1;
        this.length--;
        return this.items.pop();
      };
      this.peek = function () {
        if (this.length == 0) return -1;
        return this.items[this.length - 1];
      };
    }
  }

  // Algorithm to convert infix expression to postfix expression

  // 1. If we encounter an operand, print/store in result variable
  // 2. If we encouter an operator (+, -, *, /, ^), check the precedance of the operator (^ > * / > + -) encountered, with the topmost operator present in the stack
  // 3. If the precedance of the operator encountered > the operator present on the top, push the operator in the stack
  // 4. If the precedance of the opeartor encountered < the operator present in the top, pop and print until precedance of top is >= precedance of encountered operator and then push the operator
  // 5. If '(' is encountered push it in the stack
  // 6. If ')' is encountered pop and print all the elements until '(' is encountered. Pop '(' also.
  // 7. When the expression iteration completes, Pop and print all remaining elements of the stack.

  // A + (B * C + D) / (E / F + G)

  // point 2
  function prec(op) {
    if (op == '^') return 3;
    else if (op == '*' || op == '/') return 2;
    else if (op == '+' || op == '-') return 1;
    return -1;
  }

  function infixToPostfix(exp) {
    var stack = new Stack();
    var res = '';
    // Point 1
    for (var i = 0; i < exp.length; i++) {
      if (
        (exp[i] >= 'a' && exp[i] <= 'z') ||
        (exp[i] >= 'A' && exp[i] <= 'Z') ||
        (exp[i] >= '0' && exp[i] <= '9')
      ) {
        res += exp[i];
      }
      // point 5
      else if (exp[i] == '(') {
        stack.push(exp[i]);
      }
      // point 6
      else if (exp[i] == ')') {
        while (stack.peek() !== '(') {
          res += stack.pop();
        }
        stack.pop();
      } else {
        // Point 3 and 4
        while (stack.length > 0 && prec(exp[i]) <= prec(stack.peek())) {
          res += stack.pop();
        }
        stack.push(exp[i]);
      }
    }
    // point 7
    while (stack.length) {
      res += stack.pop();
    }
    return res;
  }

  console.log(infixToPostfix('a+b*(c^d-e)^(f+g*h)-i'));

  // Prefix to Postfix

  // 1. Reverse the entire expression
  // 2. Whenever an operand is encountered, push in the stack
  // 3. Whenever an operator is encountered, pop 2 elements from the stack
  // 4. Push Operand1 + Operand2 + Operator in the stack again
  // 5. Repeat this, until we have iterated the entire expression
  // 6. The stack will have only 1 element remaining, which is our desired result.

  // /*A+BCD

  function prefixToPostfix(exp) {
    // Point 1
    var newExp = exp.split('').reverse().join('');
    var stack = new Stack();
    // Point 3 and 4
    for (var i = 0; i < newExp.length; i++) {
      if (
        newExp[i] == '+' ||
        newExp[i] == '-' ||
        newExp[i] == '*' ||
        newExp[i] == '/' ||
        newExp[i] == '^'
      ) {
        var op1 = stack.pop();
        var op2 = stack.pop();
        var res = op1 + op2 + newExp[i];
        stack.push(res);
      } else {
        // Point 2
        stack.push(newExp[i]);
      }
    }
    // Point 6
    return stack.pop();
  }

  console.log(prefixToPostfix('*-A/BC-/AKL'));

  return (
    <div>
      <h1>roll fuck</h1>
    </div>
  );
}
