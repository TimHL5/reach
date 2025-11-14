import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useCollegeLikes = () => {
  const { user } = useAuth();
  const [likedColleges, setLikedColleges] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLikes();
    } else {
      setLikedColleges(new Set());
      setLoading(false);
    }
  }, [user]);

  const fetchLikes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_college_likes')
        .select('university_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const likes = new Set(data?.map(like => like.university_id) || []);
      setLikedColleges(likes);
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (universityId: string) => {
    if (!user) return false;

    const isLiked = likedColleges.has(universityId);

    // Optimistic update
    const newLikes = new Set(likedColleges);
    if (isLiked) {
      newLikes.delete(universityId);
    } else {
      newLikes.add(universityId);
    }
    setLikedColleges(newLikes);

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('user_college_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('university_id', universityId);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('user_college_likes')
          .insert({
            user_id: user.id,
            university_id: universityId,
          });

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setLikedColleges(likedColleges);
      return false;
    }
  };

  const isLiked = (universityId: string) => likedColleges.has(universityId);

  return {
    likedColleges,
    loading,
    toggleLike,
    isLiked,
    refetch: fetchLikes,
  };
};
