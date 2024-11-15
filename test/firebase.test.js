// // firebase.test.js
// import { expect } from 'chai';
// import sinon from 'sinon';
// import * as firebase from 'firebase/app';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { auth, resetPassword } from './firebase.test'; // Import the function you want to test

// describe('Firebase Tests', () => {
//   let authStub;

//   beforeEach(() => {
//     // Mocking Firebase Authentication's sendPasswordResetEmail method
//     authStub = sinon.stub(firebase.auth, 'sendPasswordResetEmail');
//   });

//   afterEach(() => {
//     // Restore the original Firebase function
//     sinon.restore();
//   });

//   it('should send a password reset email', async () => {
//     const email = 'test@example.com';
//     const mockResponse = 'Password reset email sent successfully.';

//     // Mocking the behavior of sendPasswordResetEmail to resolve successfully
//     authStub.resolves(mockResponse);

//     // Calling the resetPassword function
//     const result = await resetPassword(email);

//     // Assertions
//     expect(result).to.equal(mockResponse);
//     expect(authStub.calledOnce).to.be.true;
//     expect(authStub.calledWithExactly(auth, email)).to.be.true;
//   });

//   it('should throw an error if sending password reset email fails', async () => {
//     const email = 'test@example.com';
//     const mockError = new Error('Something went wrong');

//     // Mocking the behavior of sendPasswordResetEmail to reject with an error
//     authStub.rejects(mockError);

//     try {
//       await resetPassword(email);
//       // If the function doesn't throw an error, the test fails
//       expect.fail('Expected error to be thrown');
//     } catch (error) {
//       // Assertions
//       expect(error).to.equal(mockError);
//       expect(authStub.calledOnce).to.be.true;
//       expect(authStub.calledWithExactly(auth, email)).to.be.true;
//     }
//   });
// });
