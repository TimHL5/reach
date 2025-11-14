import { useState, useEffect } from 'react';
import { Edit2, Save, X, Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCollegeNotes } from '../../hooks/useCollegeNotes';
import { useCollegeLikes } from '../../hooks/useCollegeLikes';

interface CollegeNotesProps {
  universityId: string;
  universityName: string;
  onAuthRequired: () => void;
}

export const CollegeNotes = ({ universityId, universityName, onAuthRequired }: CollegeNotesProps) => {
  const { user } = useAuth();
  const { getNote, saveNote, deleteNote } = useCollegeNotes(universityId);
  const { isLiked, toggleLike } = useCollegeLikes();
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const currentNote = getNote(universityId);
  const liked = isLiked(universityId);

  useEffect(() => {
    if (currentNote) {
      setNoteText(currentNote.note);
    }
  }, [currentNote]);

  const handleSave = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!noteText.trim()) return;

    setSaving(true);
    const success = await saveNote(universityId, noteText.trim());
    if (success) {
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;

    setSaving(true);
    const success = await deleteNote(universityId);
    if (success) {
      setNoteText('');
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleLikeClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    await toggleLike(universityId);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Save & Take Notes</h3>
        <p className="text-gray-600 mb-4">Sign in to save colleges to your shortlist and add personal notes.</p>
        <button
          onClick={onAuthRequired}
          className="w-full px-4 py-2 bg-reach-blue text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In to Save
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">My Notes</h3>
        <button
          onClick={handleLikeClick}
          className={`p-2 rounded-full transition-colors ${
            liked
              ? 'bg-red-50 text-red-500'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          aria-label={liked ? 'Unlike college' : 'Like college'}
        >
          <Heart
            size={20}
            className={liked ? 'fill-current' : ''}
          />
        </button>
      </div>

      {isEditing || currentNote ? (
        <div>
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reach-blue resize-none"
                rows={6}
                placeholder={`Add your thoughts about ${universityName}...`}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!noteText.trim() || saving}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-reach-blue text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} className="mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNoteText(currentNote?.note || '');
                  }}
                  disabled={saving}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{currentNote?.note}</p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 text-sm text-reach-blue hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-reach-blue hover:text-reach-blue transition-colors"
        >
          + Add Notes
        </button>
      )}
    </div>
  );
};
