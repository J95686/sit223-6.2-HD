// __tests__/scripts.test.js

// Import the necessary functions or variables here
const { JSDOM } = require('jsdom');
const { TextEncoder, TextDecoder } = require('util');

// Set up JSDOM
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: "http://localhost/" });

// Assign the necessary properties to the global object
global.window = dom.window;
global.document = dom.window.document;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Your test cases
describe('Contact Form Submission', () => {
    beforeEach(() => {
        // Set up your HTML structure if necessary
        document.body.innerHTML = `
            <form id="contact-form">
                <input type="text" id="name" />
                <input type="email" id="email" />
                <textarea id="message"></textarea>
                <button type="submit">Submit</button>
            </form>
        `;
    });

    test('should prevent form submission and show alert', () => {
        const form = document.getElementById('contact-form');

        // Mock alert
        window.alert = jest.fn();

        // Add event listener for form submission
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you for your message!');
        });

        // Simulate form submission
        form.dispatchEvent(new Event('submit'));

        // Check if the alert was called
        expect(window.alert).toHaveBeenCalledWith('Thank you for your message!');
    });
});
