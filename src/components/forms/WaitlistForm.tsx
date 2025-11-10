import { useState } from 'react';
import { motion } from 'framer-motion';
import { EmailInput } from './EmailInput';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Save to Supabase waitlist table
      const { error } = await supabase
        .from('waitlist')
        // @ts-expect-error - Waitlist table type not properly inferred
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) {
        // If email already exists, that's okay - still show success
        if (error.code !== '23505') { // 23505 = unique constraint violation
          throw error;
        }
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving to waitlist:', error);
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4"
        >
          <Check size={32} className="text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-midnight mb-2">You're in!</h3>
        <p className="text-gray-600 mb-4">Check your email for confirmation.</p>
        <p className="text-sm text-gray-500">
          Share Reach with friends applying to college
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EmailInput
        value={email}
        onChange={setEmail}
        onValidation={setIsValid}
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
      </Button>
      <p className="text-sm text-gray-500 text-center">
        ✓ Early access starting March 2026 <br />
        ✓ Lifetime 50% discount for waitlist members <br />
        ✓ No spam, just product updates
      </p>
    </form>
  );
};
