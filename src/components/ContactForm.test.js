import React, { useEffect } from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    //select first name input
    const firstNameInput = screen.getByLabelText(/first name/i);
    //type into first name input
    userEvent.type(firstNameInput, 'aus');
    // expect typed input to be displayed in document
    expect(firstNameInput).toBeInTheDocument();

    // select the error message
    const errorMessage = await screen.findByText(/firstName must have at least 5 characters/i);
    // is the error message displayed in the document
    expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorFirst = await screen.findByText(/firstName must have at least 5 characters/i);
    const errorLast = await screen.findByText(/lastName is a required field/i);
    const errorEmail = await screen.findByText(/email must be a valid email address/i);
    
    expect(errorFirst).toBeInTheDocument();
    expect(errorEmail).toBeInTheDocument();
    expect(errorLast).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(firstNameInput, 'austin');
    userEvent.type(lastNameInput, 'carman');

    expect(firstNameInput).toHaveValue('austin');
    expect(lastNameInput).toHaveValue('carman');
    expect(emailInput).toHaveValue('');

    const button = screen.getByRole('button');
    userEvent.click(button);

    // const errorFirst = await screen.findByText(/firstName must have at least 5 characters/i);
    const errorEmail = await screen.findByText(/email must be a valid email address/i);

    expect(errorEmail).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, 'a');
    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
    
    userEvent.type(emailInput, '@');
    expect(error).toBeInTheDocument();
    
    userEvent.type(emailInput, 'b');
    expect(error).toBeInTheDocument();
    
    userEvent.type(emailInput, '.');
    expect(error).toBeInTheDocument();
    
    userEvent.type(emailInput, 'c');
    expect(error).not.toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const lastNameInput = screen.getByLabelText(/last name/i);
    expect(lastNameInput).toHaveValue('');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorEmail = await screen.findByText(/email must be a valid email address/i);

    expect(errorEmail).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)
    const message = screen.getByLabelText(/message/i)

    userEvent.type(firstName, 'austin');
    userEvent.type(lastName, 'carman');
    userEvent.type(email, 'a@a.com');

    expect(firstName).toHaveValue('austin');
    expect(lastName).toHaveValue('carman');
    expect(email).toHaveValue('a@a.com');
    expect(message).toHaveValue('');


    // const button = screen.getByRole('button');
    // userEvent.click(button);

});

test('renders all fields text when all fields are submitted.', async () => {
    
});