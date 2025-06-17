import React from 'react';
import { IdentityKit } from '@nfid/identitykit';
import '@nfid/identitykit/react/styles.css';
import { motion } from 'framer-motion';

const Auth = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-white">Login to FitnFrame</h2>
        <p className="text-gray-400 text-center mb-4">
          Use your Internet Identity or NFID to login securely.
        </p>

        <IdentityKit
          providers={['nfid', 'ii']}
          onSuccess={(identity) => {
            console.log('User Identity:', identity);
            alert('Login successful!');
            // Store identity in global context here (optional)
          }}
          onError={(err) => {
            console.error('Login failed:', err);
            alert('Login failed. Please try again.');
          }}
        />
      </motion.div>
    </div>
  );
};

export default Auth;
