import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { UserCollegeNote } from '../types/supabase';

export const useCollegeNotes = (universityId?: string) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Record<string, UserCollegeNote>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes({});
      setLoading(false);
    }
  }, [user, universityId]);

  const fetchNotes = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('user_college_notes')
        .select('*')
        .eq('user_id', user.id);

      if (universityId) {
        query = query.eq('university_id', universityId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const notesMap: Record<string, UserCollegeNote> = {};
      data?.forEach(note => {
        notesMap[note.university_id] = note;
      });

      setNotes(notesMap);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async (universityId: string, noteText: string) => {
    if (!user) return false;

    try {
      const existingNote = notes[universityId];

      if (existingNote) {
        // Update existing note
        const { data, error } = await supabase
          .from('user_college_notes')
          .update({ note: noteText })
          .eq('id', existingNote.id)
          .select()
          .single();

        if (error) throw error;

        setNotes(prev => ({
          ...prev,
          [universityId]: data,
        }));
      } else {
        // Create new note
        const { data, error } = await supabase
          .from('user_college_notes')
          .insert({
            user_id: user.id,
            university_id: universityId,
            note: noteText,
          })
          .select()
          .single();

        if (error) throw error;

        setNotes(prev => ({
          ...prev,
          [universityId]: data,
        }));
      }

      return true;
    } catch (error) {
      console.error('Error saving note:', error);
      return false;
    }
  };

  const deleteNote = async (universityId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_college_notes')
        .delete()
        .eq('user_id', user.id)
        .eq('university_id', universityId);

      if (error) throw error;

      setNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[universityId];
        return newNotes;
      });

      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  };

  const getNote = (universityId: string) => notes[universityId];

  return {
    notes,
    loading,
    saveNote,
    deleteNote,
    getNote,
    refetch: fetchNotes,
  };
};
